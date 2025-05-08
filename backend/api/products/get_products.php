<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Include database configuration
include_once "../../config/database.php"; // Make sure the path is correct

// Instantiate database and get connection
$database = new Database();
$conn = $database->getConnection();

// Check connection
if (!$conn) {
    http_response_code(503); // Service Unavailable
    echo json_encode(["message" => "Unable to connect to database."]);
    exit(); // Stop script execution
}

try {
    // Prepare the optimized query with LEFT JOIN
    // Use LEFT JOIN in case a product has an invalid or missing category_id
    // Use COALESCE to provide a default 'Unknown' if category_name is NULL
    $query = "
        SELECT
            p.product_id,
            p.product_name,
            p.description,
            p.price,
            p.category_id,
            p.stock,
            p.discount,
            p.is_best_deal,
            COALESCE(c.category_name, 'Unknown') AS category_name
        FROM
            product p
        LEFT JOIN
            category_table c ON p.category_id = c.category_id
    ";

    $stmt = $conn->prepare($query);

    // Execute query
    if ($stmt->execute()) {
        // Fetch all products with category names included
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($products) {
            http_response_code(200); // OK
            echo json_encode($products);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["message" => "No products found."]);
        }
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Unable to retrieve products."]);
    }

} catch (PDOException $exception) {
    http_response_code(500); // Internal Server Error
    // Log the error instead of echoing it directly in production
    error_log("Database Error: " . $exception->getMessage());
    echo json_encode([
        "message" => "An error occurred while retrieving products.",
        // Optionally include more detail during development, remove for production
        // "error" => $exception->getMessage()
    ]);
}

?>
