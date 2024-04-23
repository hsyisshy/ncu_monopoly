<?php
class UsersController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function handleRequest($method, $uri) {
        switch ($method) {
            case 'GET':
                if (isset($uri[2])) {
                    $this->show($uri[2]);
                } else {
                    $this->index();
                }
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                $this->update($uri[2]);
                break;
            case 'DELETE':
                $this->delete($uri[2]);
                break;
            default:
                header("HTTP/1.1 405 Method Not Allowed");
                break;
        }
    }
}

