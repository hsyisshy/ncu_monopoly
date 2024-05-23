<?php
header('Content-Type: application/json');

// 捕捉所有 PHP 錯誤
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    error_log("Invalid JSON input");
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit();
}

$username = $data['username'];
$password = $data['password'];

$servername = "localhost";
$dbusername = "root";
$dbpassword = "5253";
$dbname = "mydatabase";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$sql = "INSERT INTO users (user_name, user_password, user_score) VALUES ('$username', '$password', 100)";
if ($conn->query($sql) === TRUE) {
    $userId = $conn->insert_id;
    echo json_encode(['success' => true, 'userId' => $userId]);
} else {
    error_log("Error executing query: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . ' - ' . $conn->error]);
}

$conn->close();
?>
