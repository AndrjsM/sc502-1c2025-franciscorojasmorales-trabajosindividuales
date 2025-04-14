<?php
$host = "localhost";
$dbname = "app-tareas"; // Nombre de la base de datos
$user = "tarea1"; // Usuario de la base de datos
$password = "tarea1"; // Contraseña del usuario

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Conexión exitosa
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

