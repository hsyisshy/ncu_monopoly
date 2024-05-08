<?php
	/*$servername = "localhost:8080";
	$mysql_username = "root";
	$mysql_password = "5253";
	$dbname = "user";*/
    $servername = 'localhost';
    $username ='root';
    $password = '5253';
    
    
    /*$conn = mysqli_connect($servername, $username, $password);
    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
    
    $sql = "CREATE DATABASE user";
    if (mysqli_query($conn, $sql)) {
      echo "Database created successfully";
    } else {
      echo "Error creating database: " . mysqli_error($conn);
    }*/
    
    /*$sql = "CREATE TABLE userdata (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(30) NOT NULL,
        pass_word VARCHAR(100) NOT NULL,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";*/
    
    $dbname = "user";
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if(!$conn){
        die("connection failed :".mysqli_connect_error());
    }
    /*if(mysqli_query($conn, $sql)){
        echo "Table My quests Requested Successfully";
    }else{
        echo "Error creating table :".mysqli_error($conn);
    }*/




?>