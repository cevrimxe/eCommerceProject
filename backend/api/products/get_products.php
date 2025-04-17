<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Ürünleri çek
$query = "SELECT product_id, product_name, description, price, category_id, stock FROM product";
$stmt = $conn->prepare($query);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($products) {
    // Kategori bilgisi eklemek isteyebilirsiniz (opsiyonel)
    foreach ($products as &$product) {
        $category_query = "SELECT category_name FROM category_table WHERE category_id = :category_id";
        $category_stmt = $conn->prepare($category_query);
        $category_stmt->bindParam(":category_id", $product['category_id']);
        $category_stmt->execute();
        $category = $category_stmt->fetch(PDO::FETCH_ASSOC);

        // Kategori adını ürüne ekle
        $product['category_name'] = $category ? $category['category_name'] : 'Unknown';
    }

    // Ürünleri JSON olarak döndür
    echo json_encode($products);
} else {
    echo json_encode(["message" => "No products found!"]);
}
?>
