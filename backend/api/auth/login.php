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
    // Kullanıcıyı email'e göre bul
    $query = "SELECT user_id, first_name, last_name, email, pass_word, usercode FROM user_tbl WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Şifreyi kontrol et
        if (password_verify($data->password, $user['pass_word'])) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            $_SESSION['usercode'] = $user['usercode'];


            echo json_encode([
                "message" => "Giriş başarılı!",
                "user" => [
                    "id" => $user['user_id'],
                    "name" => $user['first_name'] . " " . $user['last_name'],
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
