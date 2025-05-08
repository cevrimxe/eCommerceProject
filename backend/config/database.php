<?php
class Database {
    // private $dsn = "pgsql:host=us-east-1.sql.xata.sh;port=5432;dbname=postgres:main";
    // private $username = "2llanj";  // Xata'dan aldığın kullanıcı adı
    // private $password = "xau_ZlNmCquzJnkhQMgomV9ULd4O4hAXvqL11";  // API key'in
    // public $conn;
    private $dsn = "pgsql:host=localhost;port=5432;dbname=postgres";
    private $username = "postgres";  // Xata'dan aldığın kullanıcı adı
    private $password = "12345";  // API key'in
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            // Bağlantı dizesini oluşturuyoruz
            $this->conn = new PDO($this->dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "❌ Bağlantı hatası: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
