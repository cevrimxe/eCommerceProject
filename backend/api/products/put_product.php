<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü: Eğer giriş yapılmamışsa ya da admin değilse, erişim reddedilir
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(["message" => "Access denied. Admins only."]);
    exit;
}

// Gelen JSON verisini al
$data = json_decode(file_get_contents("php://input"));

// Ürün ID'sini al
$product_id = isset($data->id) ? intval($data->id) : 0;

if ($product_id > 0 && !empty($data->name) && !empty($data->description) && !empty($data->price) && !empty($data->stock)) {
    // Ürün bilgilerini güncelle
    $query = "UPDATE products SET name = :name, description = :description, price = :price, stock = :stock WHERE product_id = :id";
    $stmt = $conn->prepare($query);

    // Parametreleri bağla
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":price", $data->price);
    $stmt->bindParam(":stock", $data->stock);
    $stmt->bindParam(":id", $product_id);

    // Sorguyu çalıştır ve yanıtı dön
    if ($stmt->execute()) {
        echo json_encode(["message" => "Product updated successfully."]);
    } else {
        echo json_encode(["message" => "Failed to update product."]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID or incomplete data."]);
}
?>
