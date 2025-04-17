<?php
session_start(); // Oturumu başlat

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Gelen JSON verisini oku
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    // Kullanıcıyı bul
    $query = "SELECT id, name, email, password FROM users WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Şifreyi kontrol et
        if (password_verify($data->password, $user['password'])) {
            $_SESSION['user_id'] = $user['id']; // Kullanıcı ID'sini oturumda sakla
            $_SESSION['user_name'] = $user['name']; // Kullanıcı adını oturumda sakla
            $_SESSION['user_email'] = $user['email']; // Kullanıcı e-posta adresini oturumda sakla
            echo json_encode([
                "message" => "Giriş başarılı!",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            echo json_encode(["message" => "Incorrect Password!"]);
        }
    } else {
        echo json_encode(["message" => "There is no user existing!"]);
    }
} else {
    echo json_encode(["message" => "Please enter your email and password!"]);
}
?>
