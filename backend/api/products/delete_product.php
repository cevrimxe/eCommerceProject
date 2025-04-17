<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü: Eğer giriş yapılmamışsa ya da admin değilse, erişim reddedilir
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(["message" => "Access denied. Admins only."]);
    exit;
}

// Ürün ID'sini al
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($product_id > 0) {
    // Ürünü sil
    $query = "DELETE FROM products WHERE product_id = :id";
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
