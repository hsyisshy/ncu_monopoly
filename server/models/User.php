<?php
class User {
    private $conn;
    private $table_name = "users";

    public $user_id;
    public $user_name;
    public $user_password;

    public function __construct($db) {
        $this->conn = $db;
    }
    // Example: Read users
    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}

