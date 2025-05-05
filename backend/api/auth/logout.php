<?php
session_start();

session_unset();
session_destroy();

// PHPSESSID çerezini tarayıcıdan sil
setcookie("PHPSESSID", "", time() - 3600, "/");

http_response_code(200);
echo json_encode(["message" => "Logout successful."]);
?>
