<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Admin kontrolü yap
if (!isset($_SESSION['user_id']) || $_SESSION['usercode'] != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can add products."]);
    exit;
}

// Veritabanı bağlantısı
include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

// Gelen JSON verisini al
$data = json_decode(file_get_contents("php://input"));

// Veriyi kontrol et
if (!empty($data->product_name) && !empty($data->price) && !empty($data->category_id) && isset($data->stock)) {
    // Ürün ekleme sorgusu
    $query = "INSERT INTO product (product_name, description, price, category_id, stock) 
              VALUES (:product_name, :description, :price, :category_id, :stock)";
    $stmt = $conn->prepare($query);

    // Parametreleri bağla
    $stmt->bindParam(":product_name", $data->product_name);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":price", $data->price);
    $stmt->bindParam(":category_id", $data->category_id);
    $stmt->bindParam(":stock", $data->stock);

    // Sorguyu çalıştır ve yanıtı dön
    if ($stmt->execute()) {
        $product_id = $conn->lastInsertId(); // ID'yi al
    
        // JSON olarak başarılı yanıt döndür
        echo json_encode([
            "message" => "Product successfully added.",
            "product_id" => $product_id, // product_id'yi dön
        ]);
    } else {
        // Eğer ekleme başarısızsa
        http_response_code(500);
        echo json_encode([
            "message" => "Failed to add product.",
            "error" => $stmt->errorInfo(), // SQL hatasını da döndür
        ]);
    }
} else {
    echo json_encode(["message" => "Please provide product name, price, category id, and stock."]);
}
?>
