<?php
header('Content-Type: application/json');

// 捕捉所有 PHP 錯誤
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['userId'];

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

$sql = "UPDATE users SET user_score = 100 WHERE id = $userId";
if ($conn->query($sql) === TRUE) {
    $sql = "SELECT user_score FROM users WHERE id = $userId";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode(['success' => true, 'newScore' => $row['user_score']]);
} else {
    error_log("Error executing query: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . ' - ' . $conn->error]);
}

$conn->close();
?>