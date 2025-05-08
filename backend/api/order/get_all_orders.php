<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

try {
    $query = "SELECT o.order_id, o.order_date, o.total, o.status, 
                     u.first_name || ' ' || u.last_name AS user 
              FROM order_tbl o
              JOIN user_tbl u ON o.user_id = u.user_id
              ORDER BY o.order_date DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($orders) > 0) {
        echo json_encode($orders);
    } else {
        echo json_encode(["message" => "No orders found."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error fetching orders: " . $e->getMessage()]);
} finally {
    $conn = null;
}
?>
