<?php
header("Content-Type: application/json");

$response = [
    "message" => "ecommerce api workinggg!",
    "status" => 200
];

echo json_encode($response);
?>
