<?php
// Gelen dosya ve ürün ID kontrolü
if (!isset($_FILES['image']) || !isset($_POST['product_id'])) {
    http_response_code(400);
    echo json_encode(["message" => "Image or Product ID missing."]);
    exit;
}

$product_id = intval($_POST['product_id']);
$imageTmpPath = $_FILES['image']['tmp_name'];
$imageError = $_FILES['image']['error'];

if ($imageError !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(["message" => "Image upload failed."]);
    exit;
}

// .webp formatına dönüştür ve belirli klasöre kaydet
$imageContent = file_get_contents($imageTmpPath);
$imageResource = imagecreatefromstring($imageContent);

if (!$imageResource) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to create image from uploaded file."]);
    exit;
}

// Kaydedilecek klasör ve isim
$uploadDir = "../../../frontend/assets/images/$product_id/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$webpPath = $uploadDir . $product_id . " cover.png";

if (imagewebp($imageResource, $webpPath)) {
    imagedestroy($imageResource);
    echo json_encode(["message" => "Image uploaded successfully."]);
} else {
    imagedestroy($imageResource);
    http_response_code(500);
    echo json_encode(["message" => "Failed to save image as .webp"]);
}
?>
