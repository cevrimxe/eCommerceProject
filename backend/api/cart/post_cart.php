<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Veritabanı bağlantısı
include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

// Kullanıcı kontrolü
$loggedInUserId = $_SESSION['user_id'] ?? null;
if (!$loggedInUserId) {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "User not logged in."]);
    exit();
}

// Gelen veriyi oku
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id']) || !isset($data['quantity'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Product ID and quantity are required."]);
    exit();
}

$productId = $data['product_id'];
$quantity = $data['quantity'];

try {
    // Eğer sepette aynı ürün zaten varsa, miktarı arttır
    $checkQuery = "SELECT * FROM cart_tbl WHERE user_id = :user_id AND product_id = :product_id";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bindParam(':user_id', $loggedInUserId);
    $checkStmt->bindParam(':product_id', $productId);
    $checkStmt->execute();
    $existingItem = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingItem) {
        // Update existing quantity
        $updateQuery = "UPDATE cart_tbl SET quantity = quantity + :quantity 
                        WHERE user_id = :user_id AND product_id = :product_id";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bindParam(':quantity', $quantity);
        $updateStmt->bindParam(':user_id', $loggedInUserId);
        $updateStmt->bindParam(':product_id', $productId);
        $updateStmt->execute();
        http_response_code(200);
        echo json_encode(["message" => "Cart updated successfully."]);
    } else {
        // Insert new cart item
        $insertQuery = "INSERT INTO cart_tbl (user_id, product_id, quantity) 
                        VALUES (:user_id, :product_id, :quantity)";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bindParam(':user_id', $loggedInUserId);
        $insertStmt->bindParam(':product_id', $productId);
        $insertStmt->bindParam(':quantity', $quantity);
        $insertStmt->execute();
        http_response_code(201);
        echo json_encode(["message" => "Item added to cart."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
