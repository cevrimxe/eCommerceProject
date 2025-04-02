<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Get `id` from URL
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($product_id > 0) {
    $query = "SELECT id, name, description, price FROM products WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $product_id);
    $stmt->execute();

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(["message" => "Product not found!"]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID!"]);
}
?>
