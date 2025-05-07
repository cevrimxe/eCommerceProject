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

// Get `id` from URL and validate
$product_id = isset($_GET['id']) ? filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) : null;

// Check if ID is provided and is a valid positive integer
if ($product_id === null || $product_id === false || $product_id <= 0) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid or missing product ID."]);
    exit();
}

try {
    // Prepare the optimized query with LEFT JOIN
    // Use LEFT JOIN in case the product has an invalid or missing category_id
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
            COALESCE(c.category_name, 'Unknown') AS category_name
        FROM
            product p
        LEFT JOIN
            category_table c ON p.category_id = c.category_id
        WHERE
            p.product_id = :id
        LIMIT 1 -- Good practice when fetching by a unique ID
    ";

    $stmt = $conn->prepare($query);

    // Bind the product ID parameter
    // Use bindValue for integer type hint if desired, or bindParam works fine too
    $stmt->bindValue(":id", $product_id, PDO::PARAM_INT);

    // Execute query
    if ($stmt->execute()) {
        // Fetch the single product (or false if not found)
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            http_response_code(200); // OK
            echo json_encode($product);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["message" => "Product not found."]);
        }
    } else {
        // Execution failed (rare with prepare/bind unless connection drops, etc.)
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Unable to retrieve product data."]);
    }

} catch (PDOException $exception) {
    http_response_code(500); // Internal Server Error
    // Log the error instead of echoing it directly in production
    error_log("Database Error: " . $exception->getMessage());
    echo json_encode([
        "message" => "An error occurred while retrieving the product.",
        // Optionally include more detail during development, remove for production
        // "error" => $exception->getMessage()
    ]);
}
?>
