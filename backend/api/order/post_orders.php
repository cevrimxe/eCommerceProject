<?php 
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;
if (!$loggedInUserId) {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Unauthorized - Please log in."]);
    exit;
}

try {
    // kullanıcının sepetindeki ürünleri al
    $cartQuery = "SELECT * FROM cart_tbl WHERE user_id = :user_id";
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->bindParam(':user_id', $loggedInUserId);
    $cartStmt->execute();
    $cartItems = $cartStmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($cartItems) == 0) {
        echo json_encode(["message" => "Cart is empty."]);
        exit;
    }

    // Toplam tutarı hesapla
    $totalAmount = array_sum(array_column($cartItems, 'total'));

    // Sipariş ekleme sorgusu
    $orderQuery = "INSERT INTO order_tbl (user_id, total, order_date) VALUES (:user_id, :total, NOW())";
    $orderStmt = $conn->prepare($orderQuery);
    $orderStmt->bindParam(':user_id', $loggedInUserId);
    $orderStmt->bindParam(':total', $totalAmount);
    $orderStmt->execute();

    $orderId = $conn->lastInsertId(); // Yeni siparişin ID'sini al

    // Sipariş detaylarını ekle
    $orderItemQuery = "INSERT INTO order_detail (order_id, product_id, quantity, unit_price, total) 
                       VALUES (:order_id, :product_id, :quantity, :unit_price, :total)";
    $orderItemStmt = $conn->prepare($orderItemQuery);

    foreach ($cartItems as $item) {
        $orderItemStmt->execute([
            ':order_id' => $orderId,
            ':product_id' => $item['product_id'],
            ':quantity' => $item['quantity'],
            ':unit_price' => $item['unit_price'],
            ':total' => $item['total']
        ]);
    }

    // kullanıcının sepetini temizle
    $clearCartQuery = "DELETE FROM cart_tbl WHERE user_id = :user_id";
    $clearCartStmt = $conn->prepare($clearCartQuery);
    $clearCartStmt->bindParam(':user_id', $loggedInUserId);
    $clearCartStmt->execute();

    echo json_encode(["message" => "Order placed successfully.", "order_id" => $orderId]);
}catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Error placing order: " . $e->getMessage()]);
}finally {
    $conn = null; // Veritabanı bağlantısını kapat
}





?>