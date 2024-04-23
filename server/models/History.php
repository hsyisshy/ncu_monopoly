<?php
class History {
    private $conn;
    private $table_name = "history";

    public $history_id;
    public $user_id;
    public $user_score;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>
