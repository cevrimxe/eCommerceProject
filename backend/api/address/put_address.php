<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401);
    echo json_encode(["message" => "User not logged in."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$add_id = $data['add_id'] ?? null;

if (!$add_id) {
    http_response_code(400);
    echo json_encode(["message" => "Adres ID gerekli."]);
    exit();
}

// Adres gerçekten bu kullanıcıya mı ait?
$check = $conn->prepare("SELECT 1 FROM user_address WHERE add_id = :add_id AND user_id = :user_id");
$check->execute([':add_id' => $add_id, ':user_id' => $loggedInUserId]);

if (!$check->fetch()) {
    http_response_code(403);
    echo json_encode(["message" => "Bu adrese erişiminiz yok."]);
    exit();
}

// Güncellenecek alanları hazırla
$fields = [];
$params = [':add_id' => $add_id, ':user_id' => $loggedInUserId];

if (isset($data['address'])) {
    $fields[] = "address = :address";
    $params[':address'] = $data['address'];
}
if (isset($data['city'])) {
    $fields[] = "city = :city";
    $params[':city'] = $data['city'];
}
if (isset($data['postal_code'])) {
    $fields[] = "postal_code = :postal_code";
    $params[':postal_code'] = $data['postal_code'];
}
if (isset($data['country'])) {
    $fields[] = "country = :country";
    $params[':country'] = $data['country'];
}

if (count($fields) === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Güncellenecek alan verilmedi."]);
    exit();
}

$sql = "UPDATE user_address SET " . implode(", ", $fields) . " WHERE add_id = :add_id AND user_id = :user_id";
$stmt = $conn->prepare($sql);
$stmt->execute($params);

echo json_encode(["message" => "Adres güncellendi."]);
?>
