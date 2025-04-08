<?php
include_once "../config/database.php";

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    // Bağlantı başarılı
    echo json_encode(["message" => "Db connection ok!"]);

    // Veritabanı bağlantısında karakter setini UTF-8 olarak ayarlayalım
    $conn->exec("SET NAMES 'utf8'");

    // Veri çekmek için sorgu yazalım
    try {
        // SQL sorgusunu yaz
        $sql = "SELECT user_id, username, email FROM user_tbl"; // Yeni DB'deki kullanıcıları çekiyoruz
        
        // Sorguyu çalıştır
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // Verileri al
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($users) {
            // Kullanıcıları JSON formatında döndür
            echo json_encode(["status" => "success", "data" => $users]);
        } else {
            // Hiç veri yoksa
            echo json_encode(["status" => "success", "message" => "No data found"]);
        }
    } catch (PDOException $e) {
        // Hata durumunda
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
} else {
    // Bağlantı hatası
    echo json_encode(["message" => "Db connection error!"]);
}
?>
