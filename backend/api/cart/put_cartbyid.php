<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();     


if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "Cart  item ID is required."]);
    exit;
}

$cartId = $_GET['id'];
$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401);
    echo json_encode(["message" => "User not logged in."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['quantity'])) {
    http_response_code(400);
    echo json_encode(["message" => "Quantity is required."]);
    exit;
}

try {
    // Önce mevcut item'ı çekiyoruz
    $stmt = $conn->prepare("SELECT unit_price FROM cart_tbl WHERE cartt_id = :cartt_id AND user_id = :user_id");
    $stmt->execute([
        ':cartt_id' => $cartId,
        ':user_id' => $loggedInUserId
    ]);

    $cartItem = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cartItem) {
        http_response_code(404);
        echo json_encode(["message" => "Cart item not found."]);
        exit;
    }

    $unitPrice = $cartItem['unit_price'];
    $quantity = $data['quantity'];
    $total = $unitPrice * $quantity;

    // Güncelleme işlemi
    $updateStmt = $conn->prepare("
        UPDATE cart_tbl 
        SET quantity = :quantity, total = :total 
        WHERE cartt_id = :cartt_id AND user_id = :user_id
    ");

    if ($updateStmt->execute([
        ':quantity' => $quantity,
        ':total' => $total,
        ':cartt_id' => $cartId,
        ':user_id' => $loggedInUserId
    ])) {
        echo json_encode(["message" => "Cart item updated successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update cart item."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
