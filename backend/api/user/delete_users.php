<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");


include_once "../../config/database.php";

// id'yi kontrol et
if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "User ID is required."]);
    exit;
}

// Admin kontrolü: Eğer giriş yapılmamışsa ya da admin değilse, erişim reddedilir
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can delete users."]);
    exit;
}

// Database bağlantısını oluştur
$database = new Database();
$conn = $database->getConnection();

// Kullanıcı ID'sini al
$user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($user_id > 0) {
    // Kullanıcıyı sil
    $query = "DELETE FROM user_tbl WHERE user_id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $user_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User deleted successfully."]);
    } else {
        echo json_encode(["message" => "User deletion failed."]);
    }
} else {
    echo json_encode(["message" => "Invalid user ID."]);
}



?>