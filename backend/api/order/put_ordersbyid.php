<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");


// Admin kontrolü yap
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can update product status."]);
    exit;
}

include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();


$orderId = $_GET['id'] ?? null;
if ($orderId === null) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Order ID is required."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"),true);

if (!isset($data['status'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Status is required."]);
    exit;
}

$status = $data['status'];

try{
    $orderQuery = "SELECT order_id, user_id, status FROM order_tbl WHERE order_id = :order_id";
    $orderStmt = $conn->prepare($orderQuery);
    $orderStmt->execute([ ':order_id' => $orderId ]);
    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        http_response_code(404); // Not Found
        echo json_encode(["message" => "Order not found."]);
        exit;
    }

    // Siparişin status'ünü güncelle
    $updateQuery = "UPDATE order_tbl SET status = :status WHERE order_id = :order_id";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bindParam(':status', $status);
    $updateStmt->bindParam(':order_id', $orderId);
    $updateStmt->execute();

    http_response_code(200); // OK
    echo json_encode(["message" => "Order status updated successfully."]);

} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Error updating order status: " . $e->getMessage()]);
} finally {
    $conn = null; // Connection kapatılıyor
}










?>