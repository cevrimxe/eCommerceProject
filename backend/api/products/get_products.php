<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Ürünleri çek
$query = "SELECT id, name, description, price FROM products";
$stmt = $conn->prepare($query);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($products) {
    echo json_encode($products);
} else {
    echo json_encode(["message" => "Product couldnt find!"]);
}
?>
