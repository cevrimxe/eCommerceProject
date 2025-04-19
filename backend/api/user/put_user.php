<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT"); 
header("Content-Type: application/json");


// Veritabanı bağlantısı
include_once "../../config/database.php";
$database = new Database();
$conn = $database->getConnection();

// User ID by URL
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(array("message" => "User ID is required."));
    exit;
}

// Oturumdaki kullanıcı ID'si
$loggedInUserId = $_SESSION['user_id'] ?? null;
$userRole = $_SESSION['usercode'] ?? '1'; // usercode 1 normal kullanıcı, 2 admin

// URL'den gelen id (örneğin: PUT /users.php?id=3)
$urlUserId = $_GET['id'] ?? null;

//echo json_encode($urlUserId);
//echo json_encode($loggedInUserId);
//echo json_encode($userRole);

// Admin kontrolü yap
if ($loggedInUserId != $urlUserId && $userRole != 2) { // admin usercode 2 kabul edilmiş
    http_response_code(403); // Forbidden
    echo json_encode(["message" => "Unauthorized - Only admins can update users."]);
    exit;
}


// Get the request body
$data = json_decode(file_get_contents("php://input"),true);

// Check if the request body is empty
if (empty($data)) {
    http_response_code(400);
    echo json_encode(array("message" => "Request body is empty."));
    exit;
}
$fields=[];
$params=["id"=>$urlUserId];
try {
    if(isset($data['email'])) {
        $fields[] = "email = :email";
        $params['email'] = $data['email'];
    }

    if(isset($data['pass_word'])) {
        $fields[] = "pass_word = :pass_word";
        $passwordHash = password_hash($data['pass_word'], PASSWORD_BCRYPT);
        $params['pass_word'] = $passwordHash;
        
    }

    if(isset($data['phone'])) {
        $fields[] = "phone = :phone";
        $params['phone'] = $data['phone'];
    }

    if(isset($data['first_name'])) {
        $fields[] = "first_name = :first_name";
        $params['first_name'] = $data['first_name'];
    }

    if(isset($data['last_name'])) {
        $fields[] = "last_name = :last_name";
        $params['last_name'] = $data['last_name'];
    }

    if(isset($data['usercode'])) {
        $fields[] = "usercode = :usercode";
        $params['usercode'] = $data['usercode'];
    }

    if(empty($fields)) {
        http_response_code(400);
        echo json_encode(array("message" => "No fields to update."));
        exit;
    }
    
    $query = "UPDATE user_tbl SET " . implode(", ", $fields) . " WHERE user_id = :id";
    $stmt = $conn->prepare($query);

    // Execute the statement
    if ($stmt->execute($params)) {
        http_response_code(200);
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to update user."));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Database error: " . $e->getMessage()));
}

?>