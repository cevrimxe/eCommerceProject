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
    $query = "SELECT product_id, product_name, description, price, category_id, stock FROM product WHERE product_id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $product_id);
    $stmt->execute();

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        // Kategori bilgisi eklemek isteyebilirsiniz (opsiyonel)
        $category_query = "SELECT category_name FROM category_table WHERE category_id = :category_id";
        $category_stmt = $conn->prepare($category_query);
        $category_stmt->bindParam(":category_id", $product['category_id']);
        $category_stmt->execute();
        $category = $category_stmt->fetch(PDO::FETCH_ASSOC);

        // Kategori adını ürüne ekle
        $product['category_name'] = $category ? $category['category_name'] : 'Unknown';

        // Ürün bilgilerini JSON olarak döndür
        echo json_encode($product);
    } else {
        echo json_encode(["message" => "Product not found!"]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID!"]);
}
?>
