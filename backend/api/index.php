<?php
header("Content-Type: application/json");

$response = [
    "message" => "ecommerce api working!",
    "status" => 200
];

echo json_encode($response);
?>
