<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü: Eğer giriş yapılmamışsa ya da admin değilse, erişim reddedilir
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can add products."]);
    exit;
}

// Ürün ID'sini al
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($product_id > 0) {
    // Ürünü sil
    $query = "DELETE FROM product WHERE product_id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $product_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product deleted successfully."]);
    } else {
        echo json_encode(["message" => "Product deletion failed."]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID."]);
}
?>
