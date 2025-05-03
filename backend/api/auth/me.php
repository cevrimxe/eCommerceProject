<?php 
session_start();

// Güvenli CORS ayarları
header("Access-Control-Allow-Origin: http://localhost"); // frontend nerede çalışıyorsa onu yaz
header("Access-Control-Allow-Credentials: true"); // session için gerekli
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Eğer kullanıcı giriş yapmamışsa
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Unauthorized access. Please log in."]);
    exit;
}

// Giriş yapan kullanıcının bilgilerini dön
echo json_encode([
    "id" => $_SESSION['user_id'],
    "email" => $_SESSION['email'],
    "first_name" => $_SESSION['first_name'],
    "last_name" => $_SESSION['last_name'],
    "usercode" => $_SESSION['usercode']
]);
?>
