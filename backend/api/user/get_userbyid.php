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

// Kullanıcı ID'sini al
$user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Kullanıcı ID'si geçerli mi kontrol et
if ($user_id <= 0) {
    echo json_encode(["message" => "Invalid user ID."]);
    exit;
}

// Kullanıcı bilgilerini çekme sorgusu
$query = "SELECT user_id, first_name, last_name, email, phone, usercode FROM user_tbl WHERE user_id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(":id", $user_id);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Kullanıcı bilgilerini JSON formatında döndür
if ($user) {
    echo json_encode($user);
} else {
    echo json_encode(["message" => "User not found."]);
}
// Veritabanı bağlantısını kapat (isteğe bağlı)
$conn = null;






?>