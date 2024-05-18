USE mydatabase;

-- Drop tables if they already exist
DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_score` INT NOT NULL DEFAULT 100,
    PRIMARY KEY (`id`)
);


-- Insert sample data into 'users'
INSERT INTO users (user_name, user_password, user_score) VALUES
('Alice', 'alicepass', 100),
('Bob', 'bobpass', 150);





