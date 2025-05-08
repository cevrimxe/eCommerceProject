<?php
// put_best_deal.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');

include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents('php://input'));
$productId = $data->product_id;
$bestDeal = $data->is_best_deal ? 1 : 0; // best_deal true ise 1, false ise 0

if ($productId) {
    $query = "UPDATE product SET is_best_deal = :is_best_deal WHERE product_id = :product_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':is_best_deal', $bestDeal, PDO::PARAM_INT);
    $stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Best Deal updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating Best Deal."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid product ID."]);
}
?>
