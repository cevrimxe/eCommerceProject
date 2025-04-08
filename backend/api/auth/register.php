<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Veritabanı bağlantısını include et
include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

// Gelen JSON verisini al
$data = json_decode(file_get_contents("php://input"));

// Verilerin boş olup olmadığını kontrol et
if (!empty($data->email) && !empty($data->password) && !empty($data->first_name) && !empty($data->last_name)) {

    // Şifreyi hashle
    $passwordHash = password_hash($data->password, PASSWORD_BCRYPT);

    // Kullanıcı türü, eğer belirli bir tür yoksa normal olarak ayarla
    $usercode = isset($data->usercode) ? $data->usercode : 1; // Varsayılan olarak 'normal' kullanıcı

    // Yeni kullanıcıyı ekle
    $query = "INSERT INTO user_tbl (pass_word, email, phone, usercode, first_name, last_name) 
              VALUES (:password, :email, :phone, :usercode, :first_name, :last_name)";
    $stmt = $conn->prepare($query);

    // Parametreleri bağla
    $stmt->bindParam(":password", $passwordHash);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":phone", $data->phone);
    $stmt->bindParam(":usercode", $usercode);
    $stmt->bindParam(":first_name", $data->first_name);
    $stmt->bindParam(":last_name", $data->last_name);

    // Sorguyu çalıştır ve yanıtı dön
    if ($stmt->execute()) {
        // Başarıyla ekleme yapılmışsa, kullanıcıyı eklediğimizi bildiren bir mesaj döndür
        echo json_encode(["message" => "User successfully registered."]);
    } else {
        // Hata oluşursa, hata mesajı döndür
        echo json_encode(["message" => "User registration failed. Please try again."]);
    }
} else {
    // Veriler eksikse, eksik olduğunu belirten bir mesaj döndür
    echo json_encode(["message" => "Please fill all required fields."]);
}
?>
