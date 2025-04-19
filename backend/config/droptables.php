

<?php
/* * drop_tables.php
 * Bu dosya, veritabanındaki tüm tabloları silmek için kullanılır.
 * Kullanıcıdan gelen isteğe bağlı olarak çalıştırılabilir.
 */


/*

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "database.php";

// Veritabanı bağlantısını başlat
$database = new Database();
$conn = $database->getConnection();

// Tabloları silmek için SQL komutları
$sql = "
    DROP TABLE IF EXISTS rate_tbl, 
                        cart_tbl, 
                        order_detail, 
                        order_tbl, 
                        product, 
                        category_table, 
                        user_address, 
                        user_tbl, 
                        accsess_tbl;
";

// Sorguyu çalıştır
$stmt = $conn->prepare($sql);

if ($stmt->execute()) {
    echo json_encode(["message" => "Tüm tablolar başarıyla silindi."]);
} else {
    echo json_encode(["message" => "Tablo silme hatası."]);
}

*/
?>