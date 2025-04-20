<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Include database connection
include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

// Veritabanı bağlantısı başarılıysa
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "Cart item ID is required."]);
    exit;
}

$cartId = $_GET['id'];
$loggedInUserId = $_SESSION['user_id'] ?? null;

// Kullanıcı oturumu kontrolü
if (!$loggedInUserId) {
    http_response_code(401);
    echo json_encode(["message" => "User not logged in."]);
    exit;
}

try {
    // Sepetteki ürünü kontrol et
    $stmt = $conn->prepare("SELECT * FROM cart_tbl WHERE cartt_id = :cartt_id AND user_id = :user_id");
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

    // Sepet öğesini sil
    $deleteStmt = $conn->prepare("DELETE FROM cart_tbl WHERE cartt_id = :cartt_id AND user_id = :user_id");

    if ($deleteStmt->execute([
        ':cartt_id' => $cartId,
        ':user_id' => $loggedInUserId
    ])) {
        echo json_encode(["message" => "Cart item deleted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to delete cart item."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
