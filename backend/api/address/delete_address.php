<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");

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

$data = json_decode(file_get_contents("php://input"), true);
$add_id = $data['add_id'];

$check = $conn->prepare("SELECT * FROM user_address WHERE add_id = :add_id AND user_id = :user_id");
$check->execute([':add_id' => $add_id, ':user_id' => $_SESSION['user_id']]);

if (!$check->fetch()) {
    http_response_code(403);
    exit("Bu adrese erişiminiz yok.");
}

$sql = "DELETE FROM user_address WHERE add_id = :add_id AND user_id = :user_id";
$stmt = $conn->prepare($sql);
$stmt->execute([':add_id' => $add_id, ':user_id' => $_SESSION['user_id']]);

echo json_encode(["message" => "Adres silindi"]);
?>
