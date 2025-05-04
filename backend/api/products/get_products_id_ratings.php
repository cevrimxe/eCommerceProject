<?php

include_once "../../config/database.php";
$db = new Database();
$pdo = $db->connect();

$productId = $_GET['id'];

$stmt = $pdo->prepare("SELECT rate FROM rate_tbl WHERE product_id = ?");
$stmt->execute([$productId]);
$rates = $stmt->fetchAll(PDO::FETCH_COLUMN);

if ($rates) {
    $average = array_sum($rates) / count($rates);
    echo json_encode([
        'product_id' => $productId,
        'average_rating' => round($average, 2),
        'total_ratings' => count($rates)
    ]);
} else {
    echo json_encode([
        'product_id' => $productId,
        'average_rating' => null,
        'total_ratings' => 0
    ]);
}
$db->disconnect();
// Close the database connection
?>