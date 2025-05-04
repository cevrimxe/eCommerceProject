<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Veritabanı bağlantısı
include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

// Sorgu
$query = "SELECT category_id, category_name FROM category_table";
$stmt = $conn->prepare($query);
$stmt->execute();

// Verileri oku
$categories = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $categories[] = $row;
}

// JSON olarak döndür
echo json_encode($categories);
