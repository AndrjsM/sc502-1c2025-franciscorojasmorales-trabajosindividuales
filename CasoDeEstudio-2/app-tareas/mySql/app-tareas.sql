-- Crear la base de datos
CREATE DATABASE `app-tareas`;

-- Crear el usuario con todos los privilegios para la base de datos
CREATE USER 'tarea1'@'localhost' IDENTIFIED BY 'tarea1';
GRANT ALL PRIVILEGES ON `app-tareas`.* TO 'tarea1'@'localhost';
FLUSH PRIVILEGES;

-- Usar la base de datos
USE `app-tareas`;

-- Tabla de usuarios
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas
CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `due_date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabla de comentarios
CREATE TABLE `comments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `task_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE CASCADE
);

-- Actualizar la tabla de comentarios para incluir el ID del usuario que creó el comentario
ALTER TABLE `comments`
ADD COLUMN `user_id` INT NOT NULL AFTER `task_id`,
ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;