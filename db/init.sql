-- Initialization script for MySQL database

-- Select the database to use
USE mydatabase;

-- Drop tables if they already exist
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       user_name VARCHAR(255) NOT NULL,
                       user_password VARCHAR(255) NOT NULL
);

-- Create the 'history' table
CREATE TABLE history (
                         history_id INT AUTO_INCREMENT PRIMARY KEY,
                         user_id INT NOT NULL,
                         user_score INT,
                         FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert sample data into 'users'
INSERT INTO users (user_name, user_password) VALUES
('Alice', 'alicepass'),
('Bob', 'bobpass');

-- Insert sample data into 'history'
INSERT INTO history (user_id, user_score) VALUES
(1, 100),
(2, 150);
