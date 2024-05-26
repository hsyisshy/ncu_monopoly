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

$user_name = $data['username'];
$pass_word = $data['password'];
$isSignup = $data['isSignup'];

$servername = "localhost";
$dbusername = "root";
$dbpassword = "5253";
$dbname = "mydatabase";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

if($isSignup==1){
    $username_sql = $conn->prepare("SELECT * FROM users WHERE user_name=?");
    $username_sql->bind_param("s",$user_name);
    $username_sql->execute();
    $username_sql->store_result();
    
    if($username_sql->num_rows>0){
        echo json_encode(['success' => false, 'message' => '你已註冊過帳號']);
        exit;
    }
    
    $pass_word = password_hash($pass_word, PASSWORD_DEFAULT);
    //沒有重複 存資料
    $sql = $conn->prepare("INSERT INTO users(user_name, user_password, user_score) VALUES (?, ?, 100)");
    $sql->bind_param("ss", $user_name, $pass_word);
    
    if ($sql->execute()) {
        $userId = $conn->insert_id;
        echo json_encode(['success' => true, 'message' => '註冊成功' , 'userId' => $userId]);
    } 
    else {
        error_log("Error executing query: " . $conn->error);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . ' - ' . $conn->error]);
    }
    
    $conn->close();
    exit;
    }


else{
    $username_sql = $conn->prepare("SELECT user_password FROM users WHERE user_name=?");
    $username_sql->bind_param("s",$user_name);
    $username_sql->execute();
    $username_sql->store_result();

    if($username_sql->num_rows>0){
        $username_sql->bind_result($temp);
        $username_sql->fetch();
        $hash = (string) $temp;
        
        if(password_verify($pass_word, $hash)){

            $smt =$conn->prepare("UPDATE users SET user_score = 100 WHERE user_name =?");
            $smt->bind_param("s",$user_name);
            $smt->execute();

            $smt =$conn->prepare("SELECT id FROM users WHERE user_name =?");
            $smt->bind_param("s",$user_name);
            $smt->execute();
            $smt->bind_result($userId);
            if ($smt->fetch()) {
                echo json_encode(['success' => true, 'message' => '登入成功', 'userId' => $userId]);
            }
            
        }
        else{
            echo json_encode(['success' => false, 'message' => '輸入的密碼錯誤！']);
            exit;
        }
    }
    //cannot find the identical username
    else{
        echo json_encode(['success' => false, 'message' => '並未註冊帳號！']);
        exit;
    }
}

?>
