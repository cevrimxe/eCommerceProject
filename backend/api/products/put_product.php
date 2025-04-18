<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü: Eğer giriş yapılmamışsa ya da admin değilse, erişim reddedilir

// Admin kontrolü yap
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can add products."]);
    exit;
}

// Gelen JSON verisini al
$data = json_decode(file_get_contents("php://input"));
error_log(print_r($data, true)); // JSON verisini loglara yazdır

// Ürün ID'sini al
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;


if ($product_id > 0 && !empty($data->product_name) && !empty($data->description) && !empty($data->price) && !empty($data->stock)) {
    // Ürün bilgilerini güncelle
    $query = "UPDATE product SET product_name = :product_name, description = :description, price = :price, stock = :stock WHERE product_id = :id";
    $stmt = $conn->prepare($query);

    // Parametreleri bağla
    $stmt->bindParam(":product_name", $data->product_name);
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