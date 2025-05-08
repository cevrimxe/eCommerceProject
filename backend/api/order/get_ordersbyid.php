<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized - Please log in."]);
    exit;
}

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "Order ID is required."]);
    exit;
}

$orderId = $_GET['id'];

try {
    // 1. Önce siparişi kontrol et
    $orderQuery = "SELECT order_id, order_date, total, status FROM order_tbl WHERE order_id = :order_id AND user_id = :user_id";
    $orderStmt = $conn->prepare($orderQuery);
    $orderStmt->execute([
        ':order_id' => $orderId,
        ':user_id' => $loggedInUserId
    ]);

    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        http_response_code(404);
        echo json_encode(["message" => "Order not found or access denied."]);
        exit;
    }

    // 2. Siparişin ürünlerini al
    $itemsQuery = "SELECT product_id, quantity, unit_price, total
                   FROM order_detail
                   WHERE order_id = :order_id";
    $itemsStmt = $conn->prepare($itemsQuery);
    $itemsStmt->execute([':order_id' => $orderId]);
    $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Kullanıcı adresini al (user_address tablosundan)
    $addressQuery = "SELECT address, city, postal_code, country
                     FROM user_address
                     WHERE user_id = :user_id";
    $addressStmt = $conn->prepare($addressQuery);
    $addressStmt->execute([':user_id' => $loggedInUserId]);
    $address = $addressStmt->fetch(PDO::FETCH_ASSOC);

    // 4. Yanıtı hazırla
    $order['items'] = $items;
    $order['user_address'] = $address;  // Kullanıcı adres bilgilerini ekle


    echo json_encode($order);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error fetching order: " . $e->getMessage()]);
} finally {
    $conn = null;
}
?>
