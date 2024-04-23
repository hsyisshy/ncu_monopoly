<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './Database.php';
include_once './models/User.php';
include_once './models/History.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$history = new History($db);

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Simple router
switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get a single user or history
        } else {
            // Get all users or histories
        }
        break;
    case 'POST':
        // Create a user or history
        break;
    case 'PUT':
        // Update a user or history
        break;
    case 'DELETE':
        // Delete a user or history
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Define methods for handling all routes and requests

