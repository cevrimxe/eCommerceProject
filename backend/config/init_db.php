<?php
include_once "database.php";

$database = new Database();
$conn = $database->getConnection();

// schema.sql dosyasını oku ve çalıştır
$sqlSchema = file_get_contents('../../database/schema.sql');
$sqlSeeds = file_get_contents('../../database/seeds.sql');

try {
    // Veritabanı yapısını oluştur
    $conn->exec($sqlSchema);

    // Verileri ekle
    $conn->exec($sqlSeeds);

    echo json_encode(["message" => "Veritabanı ve veriler başarıyla yüklendi!"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Hata: " . $e->getMessage()]);
}
?>
