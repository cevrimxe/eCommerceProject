<?php 
session_start(); // Oturumu başlat

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

if(!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Unauthorized access. Please log in."]);
    exit;
}

echo json_encode([
    "id" => $_SESSION['user_id'],
    "email" => $_SESSION['email'],
    "first_name" => $_SESSION['first_name'],
    "last_name" => $_SESSION['last_name'],
    "usercode" => $_SESSION['usercode']
]);







?>