<?php
require_once "../config/database.php"; // Eğer başka klasördeyse yolu düzelt

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "🎉 Veritabanı bağlantısı başarılı!";
} else {
    echo "💥 Veritabanı bağlantısı başarısız!";
}
?>
