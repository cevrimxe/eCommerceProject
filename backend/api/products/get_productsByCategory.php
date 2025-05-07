<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

$category_id = isset($_GET['category_id']) ? $_GET['category_id'] : 'all';
$min_price = isset($_GET['min_price']) ? floatval($_GET['min_price']) : 0;
$max_price = isset($_GET['max_price']) ? floatval($_GET['max_price']) : PHP_INT_MAX;

if ($category_id === 'all') {
    $sql = "SELECT product_id, product_name, price FROM product WHERE price BETWEEN ? AND ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$min_price, $max_price]);
} else {
    $sql = "SELECT product_id, product_name, price FROM product WHERE category_id = ? AND price BETWEEN ? AND ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$category_id, $min_price, $max_price]);
}

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($products);

$conn = null;
?>