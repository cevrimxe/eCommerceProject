<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Gelen JSON verisini oku
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    // Şifreyi hashle
    $passwordHash = password_hash($data->password, PASSWORD_BCRYPT);

    // Kullanıcıyı ekle
    $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", $passwordHash);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User save 200"]);
    } else {
        echo json_encode(["message" => "User save error"]);
    }
} else {
    echo json_encode(["message" => "Please fill all places!"]);
}
?>
