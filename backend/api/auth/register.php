<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once "../../config/database.php";

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password) && !empty($data->first_name) && !empty($data->last_name) && !empty($data->phone)) {

    // E-posta veya telefon daha önce kayıtlı mı kontrol et
    $checkQuery = "SELECT * FROM user_tbl WHERE email = :email OR phone = :phone";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bindParam(":email", $data->email);
    $checkStmt->bindParam(":phone", $data->phone);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Bu e-posta veya telefon numarası zaten kayıtlı."
        ]);
        exit;
    }

    $passwordHash = password_hash($data->password, PASSWORD_BCRYPT);
    $usercode = isset($data->usercode) ? $data->usercode : 1;

    $query = "INSERT INTO user_tbl (pass_word, email, phone, usercode, first_name, last_name) 
              VALUES (:password, :email, :phone, :usercode, :first_name, :last_name)";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":password", $passwordHash);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":phone", $data->phone);
    $stmt->bindParam(":usercode", $usercode);
    $stmt->bindParam(":first_name", $data->first_name);
    $stmt->bindParam(":last_name", $data->last_name);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Kullanıcı başarıyla kaydedildi."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen tüm gerekli alanları doldurun."
    ]);
}
?>
