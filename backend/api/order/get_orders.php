<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Unauthorized - Please log in."]);
    exit;
}

try {

    $query = "SELECT order_id, order_date, total, status FROM order_tbl WHERE user_id = :user_id ORDER BY order_date DESC";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id',$loggedInUserId);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(count($orders) > 0) {
        echo json_encode(["orders" => $orders]);
    }else {
        echo json_encode(["message" => "No orders found."]);
    }
}catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Error fetching orders: " . $e->getMessage()]);
}finally {
    $conn = null; // Veritabanı bağlantısını kapat
}





?>