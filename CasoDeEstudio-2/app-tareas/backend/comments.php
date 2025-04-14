<?php
require('db.php');

// Función para crear un comentario
function createComment($taskId, $email, $description)
{
    global $pdo;
    try {
        $sql = "INSERT INTO comments (task_id, email, description, created_at) VALUES (:task_id, :email, :description, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'task_id' => $taskId,
            'email' => $email,
            'description' => $description
        ]);
        return $pdo->lastInsertId();
    } catch (Exception $e) {
        error_log($e->getMessage()); // Registrar el error en el log
        return 0;
    }
}

// Función para obtener comentarios por tarea
function getCommentsByTask($taskId)
{
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT id, description, created_at, email FROM comments WHERE task_id = :task_id ORDER BY created_at DESC");
        $stmt->execute(['task_id' => $taskId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        error_log("Error al obtener los comentarios: " . $ex->getMessage()); // Registrar el error en el log
        return [];
    }
}

// Función para obtener comentarios por ID de tarea
function getCommentsByTaskId($taskId)
{
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT id, description, created_at, email FROM comments WHERE task_id = :task_id ORDER BY created_at DESC");
        $stmt->execute(['task_id' => $taskId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        error_log("Error al obtener los comentarios: " . $ex->getMessage());
        return [];
    }
}

// Validar entrada de datos
function validateCommentInput($input)
{
    return isset($input['task_id'], $input['description']);
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

function getJsonInput()
{
    return json_decode(file_get_contents("php://input"), true);
}

session_start();

if (isset($_SESSION["user_id"])) {
    try {
        $userId = $_SESSION["user_id"];
        switch ($method) {
            case 'GET':
                if (isset($_GET['task_id'])) {
                    $comments = getCommentsByTask($_GET['task_id']);
                    echo json_encode($comments);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Falta el ID de la tarea"]);
                }
                break;
            case 'POST':
                $input = getJsonInput();
                if (validateCommentInput($input)) {
                    $commentId = createComment($input['task_id'], $userId, $input['description']);
                    if ($commentId > 0) {
                        http_response_code(201);
                        echo json_encode(["message" => "Comentario creado exitosamente", "id" => $commentId]);
                    } else {
                        http_response_code(500);
                        echo json_encode(["error" => "Error al crear el comentario"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Datos insuficientes"]);
                }
                break;
            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
        }
    } catch (Exception $exp) {
        http_response_code(500);
        echo json_encode(["error" => "Error al procesar la solicitud"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "Sesión no activa"]);
}

// Lógica para manejar solicitudes GET específicas para comentarios
if ($method == 'GET' && isset($_GET['task_id'])) {
    $taskId = $_GET['task_id'];
    $comments = getCommentsByTaskId($taskId);
    echo json_encode($comments);
    exit;
}