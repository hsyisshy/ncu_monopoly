<?php
// Start the session in a consistent way
if(!isset($_SESSION)) {
    session_set_cookie_params(3600,'/');
    session_start();
}

// Redirects the user to login page if not logged in
function ForceLogin() {
    if(!isset($_SESSION['user_name'])) {
        header("Location: login.php");
        exit;
    }
}

// Redirects the user to the dashboard if already logged in
function ForceDashboard() {
    if(isset($_SESSION['user_name'])) {
        header("Location: index.php");
        exit;
    }
}

// Cleans up the session and logs the user out
function CleanSession() {
    session_unset(); // Remove all session variables
    session_destroy(); // Destroy the session
}

?>