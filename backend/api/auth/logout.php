<?php
// Bu dosya, kullanıcı oturumunu kapatmak için kullanılır. Oturum değişkenlerini temizler ve yok eder.
// Ayrıca, başarılı bir yanıt kodu ve mesaj döndürür.

session_start(); // Oturumu başlat

session_unset(); // Tüm oturum değişkenlerini temizle
session_destroy(); // Oturumu yok et

http_response_code(200); // Başarılı yanıt kodu
echo json_encode(["message" => "Logout successful."]); // Başarı mesajı döndür





?>