<?php
session_start();
header("Access-Control-Allow-Origin: *");  
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Veritabanı bağlantısı
include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

// Admin kontrolü yap
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can view users."]);
    exit;
}

// Kullanıcıları çekme sorgusu
$query = "SELECT user_id, first_name, last_name, email, phone, usercode FROM user_tbl";
$stmt = $conn->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Kullanıcıları JSON formatında döndür
if ($users) {
    echo json_encode($users);
} else {
    echo json_encode(["message" => "No users found."]);
}



?>