<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Include database connection
include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401); // Unauthorized
    echo json_encode(array("message" => "User not logged in."));
    exit();
}

$sql = "SELECT * FROM user_address WHERE user_id = :user_id";
$stmt = $conn->prepare($sql);
$stmt->execute([':user_id' => $_SESSION['user_id']]);
$addresses = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($addresses);
?>
