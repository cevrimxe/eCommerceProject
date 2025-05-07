<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Include database configuration
include_once "../../config/database.php"; // Make sure the path is correct

$database = new Database();
$conn = $database->getConnection();

// Check connection
if (!$conn) {
    http_response_code(503); // Service Unavailable
    echo json_encode(["message" => "Unable to connect to database."]);
    exit(); // Stop script execution
}

try {
    // Get featured products
    $stmt = $conn->prepare("SELECT product_id FROM product WHERE is_featured = TRUE");
    $stmt->execute();
    $featured_ids = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $stmt = $conn->prepare("SELECT product_id FROM product WHERE is_best_deal = TRUE");
    $stmt->execute();
    $bestdeal_ids = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Return results as JSON
    echo json_encode([
        "featured_ids" => $featured_ids,
        "bestdeal_ids" => $bestdeal_ids
    ]);
} catch (PDOException $e) {
    // Handle database query errors
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Database query error: " . $e->getMessage()]);
}
?>
