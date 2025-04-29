<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Include database connection
include_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

$loggedInUserId = $_SESSION['user_id'] ?? null;

if (!$loggedInUserId) {
    http_response_code(401); // Unauthorized
    echo json_encode(array("message" => "User not logged in."));
    exit();
}

try {
    $query = "SELECT c.cartt_id, p.product_name, p.price, c.quantity, p.product_id
              FROM cart_tbl c
              JOIN product p ON c.product_id = p.product_id
              WHERE c.user_id = :user_id";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $loggedInUserId);
    $stmt->execute();
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($cartItems) > 0) {
        echo json_encode(array("message" => "Cart items retrieved successfully.", "cart_items" => $cartItems));
    } else {
        http_response_code(200);
    echo json_encode([
        "message" => "Cart is empty.",
        "cart_items" => []
    ]);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Error retrieving cart items: " . $e->getMessage()));
} finally {
    $conn = null; // Close the database connection
}


?>