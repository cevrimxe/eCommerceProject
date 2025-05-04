<?php
include_once "../../config/database.php";
$db = new Database();
$pdo = $db->connect();

$productId = $_GET['id'];
$input = json_decode(file_get_contents("php://input"), true);

$userId = $input['user_id'] ?? null;
$rate = $input['rate'] ?? null;

// Giriş doğrulaması
if (!$userId || $rate === null || $rate < 0 || $rate > 5) {
    http_response_code(400);
    echo json_encode(['error' => 'Geçerli user_id ve 0-5 arasında bir rate değeri gerekli.']);
    exit;
}

// Daha önce puan verildi mi kontrol et
$check = $pdo->prepare("SELECT rate_id FROM rate_tbl WHERE user_id = ? AND product_id = ?");
$check->execute([$userId, $productId]);

if ($check->rowCount() > 0) {
    // Güncelleme
    $update = $pdo->prepare("UPDATE rate_tbl SET rate = ? WHERE user_id = ? AND product_id = ?");
    $update->execute([$rate, $userId, $productId]);
    echo json_encode(['message' => 'Puan güncellendi.']);
} else {
    // Yeni kayıt
    $insert = $pdo->prepare("INSERT INTO rate_tbl (user_id, product_id, rate) VALUES (?, ?, ?)");
    $insert->execute([$userId, $productId, $rate]);
    echo json_encode(['message' => 'Puan başarıyla eklendi.']);
}
?>
