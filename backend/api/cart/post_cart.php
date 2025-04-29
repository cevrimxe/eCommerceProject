<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;
if (!$loggedInUserId) {
    http_response_code(401);
    echo json_encode(["message" => "User not logged in."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id']) || !isset($data['quantity'])) {
    http_response_code(400);
    echo json_encode(["message" => "Product ID and quantity are required."]);
    exit();
}

$productId = $data['product_id'];
$quantity = $data['quantity'];

try {
    // Ürün fiyatını al
    $priceQuery = "SELECT price FROM product WHERE product_id = :product_id";
    $priceStmt = $conn->prepare($priceQuery);
    $priceStmt->bindParam(':product_id', $productId);
    $priceStmt->execute();
    $product = $priceStmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        http_response_code(404);
        echo json_encode(["message" => "Product not found."]);
        exit();
    }

    $unitPrice = floatval($product['price']);
    $totalPrice = $unitPrice * $quantity;

    // Sepette ürün varsa güncelle
    $checkQuery = "SELECT quantity FROM cart_tbl WHERE user_id = :user_id AND product_id = :product_id";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bindParam(':user_id', $loggedInUserId);
    $checkStmt->bindParam(':product_id', $productId);
    $checkStmt->execute();
    $existingItem = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingItem) {
        $newQuantity = $existingItem['quantity'] + $quantity;
        $newTotal = $newQuantity * $unitPrice;

        $updateQuery = "UPDATE cart_tbl 
                        SET quantity = :quantity, unit_price = :unit_price, total = :total 
                        WHERE user_id = :user_id AND product_id = :product_id";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bindParam(':quantity', $newQuantity);
        $updateStmt->bindParam(':unit_price', $unitPrice);
        $updateStmt->bindParam(':total', $newTotal);
        $updateStmt->bindParam(':user_id', $loggedInUserId);
        $updateStmt->bindParam(':product_id', $productId);
        $updateStmt->execute();

        http_response_code(200);
        echo json_encode(["message" => "Cart updated successfully."]);
    } else {
        $insertQuery = "INSERT INTO cart_tbl (user_id, product_id, quantity, unit_price, total) 
                        VALUES (:user_id, :product_id, :quantity, :unit_price, :total)";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bindParam(':user_id', $loggedInUserId);
        $insertStmt->bindParam(':product_id', $productId);
        $insertStmt->bindParam(':quantity', $quantity);
        $insertStmt->bindParam(':unit_price', $unitPrice);
        $insertStmt->bindParam(':total', $totalPrice);
        $insertStmt->execute();

        http_response_code(201);
        echo json_encode(["message" => "Item added to cart."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
