<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) {
    http_response_code(403);
    echo json_encode(["message" => "Unauthorized - Only admins can update products."]);
    exit;
}

// JSON verisini al
$data = json_decode(file_get_contents("php://input"));

// Doğrudan JSON içinden al
$product_id = isset($data->product_id) ? intval($data->product_id) : 0;

if ($product_id > 0 && !empty($data->product_name) && !empty($data->description) && !empty($data->price) && !empty($data->stock)) {
    $query = "UPDATE product 
              SET product_name = :product_name, 
                  description = :description, 
                  price = :price, 
                  stock = :stock, 
                  cover_image_url = :cover_image_url 
              WHERE product_id = :id";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(":product_name", $data->product_name);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":price", $data->price);
    $stmt->bindParam(":stock", $data->stock);
    $stmt->bindParam(":id", $product_id);

    $cover_image = empty($data->cover_image_url) ? null : $data->cover_image_url;
    $stmt->bindParam(":cover_image_url", $cover_image);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product updated successfully."]);
    } else {
        echo json_encode(["message" => "Failed to update product."]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID or incomplete data."]);
}
?>
