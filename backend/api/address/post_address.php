<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

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

$sql = "INSERT INTO user_address (user_id, address, city, postal_code, country)
        VALUES (:user_id, :address, :city, :postal_code, :country)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    ':user_id' => $_SESSION['user_id'],
    ':address' => $data['address'],
    ':city' => $data['city'],
    ':postal_code' => $data['postal_code'],
    ':country' => $data['country']
]);

$last_id = $conn->lastInsertId();

if ($last_id) {
    echo json_encode(["message" => "Adres eklendi", "add_id" => $last_id]);
} else {
    http_response_code(500); // Or appropriate error
    echo json_encode(["message" => "Adres eklendi ama ID alınamadı."]); // Address added but ID couldn't be retrieved
}
?>
