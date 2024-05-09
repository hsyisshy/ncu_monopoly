<?php
$servername = 'localhost';
$username = 'root';
$password = '5253';
$dbname = "user";

// Enable error reporting for development
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Establish database connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>