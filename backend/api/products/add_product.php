<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->description) && !empty($data->price) && isset($data->stock)) {
    $query = "INSERT INTO products (name, description, price, stock) VALUES (:name, :description, :price, :stock)";
    $stmt = $conn->prepare($query);

    // Bind values
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":price", $data->price);
    $stmt->bindParam(":stock", $data->stock);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product added successfully!"]);
    } else {
        echo json_encode(["message" => "Failed to add product!"]);
    }
} else {
    echo json_encode(["message" => "Please provide all required fields including stock!"]);
}
?>
