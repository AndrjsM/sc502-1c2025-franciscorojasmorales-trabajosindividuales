// Este archivo maneja la lógica del dashboard, incluyendo la carga, edición, eliminación de tareas y comentarios.

document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "backend/tasks.php"; // URL del backend para gestionar tareas
    let isEditMode = false; // Indica si estamos en modo edición
    let edittingId; // ID de la tarea que se está editando
    let tasks = []; // Lista de tareas cargadas

    // Modificar la función loadTasks para cargar tareas con comentarios
    async function loadTasks() {
        try {
            const response = await fetch("backend/tasks.php", { method: 'GET', credentials: 'include' });
            if (response.ok) {
                tasks = await response.json(); // Parseamos las tareas con sus comentarios
                renderTasks(tasks); // Renderizamos las tareas en el DOM
            } else {
                if (response.status == 401) {
                    // Redirige al login si no hay sesión activa
                    window.location.href = "index.html";
                }
                console.error("Error al obtener tareas");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Renderiza las tareas en el DOM con sus comentarios
    function renderTasks(tasks) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Limpia la lista de tareas

        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Fecha límite: ${task.due_date}</small></p>
                    <button class="btn btn-sm btn-link" data-bs-toggle="collapse" data-bs-target="#comments-${task.id}" aria-expanded="false" aria-controls="comments-${task.id}">Ver comentarios</button>
                    <div class="collapse" id="comments-${task.id}">
                        <div class="card card-body mt-2">
                            <ul class="list-group" id="comment-list-${task.id}">
                                ${task.comments.length > 0 ? task.comments.map(comment => `
                                    <li class="list-group-item">
                                        <strong>${comment.email}</strong> (${new Date(comment.created_at).toLocaleString()}):
                                        <p>${comment.description}</p>
                                    </li>
                                `).join('') : '<li class="list-group-item">No hay comentarios</li>'}
                            </ul>
                        </div>
                    </div>
                    <button type="button" class="btn btn-sm btn-link add-comment" data-id="${task.id}">Añadir comentario</button>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Eliminar</button>
                </div>
            </div>`;
            taskList.appendChild(taskCard);
        });

        // Asigna eventos a los botones de editar, eliminar y añadir comentarios
        document.querySelectorAll('.edit-task').forEach(button => button.addEventListener('click', handleEditTask));
        document.querySelectorAll('.delete-task').forEach(button => button.addEventListener('click', handleDeleteTask));
        document.querySelectorAll('.add-comment').forEach(button => button.addEventListener('click', showCommentModal));
    }

    // Función para cargar comentarios de una tarea específica
    async function loadComments(taskId) {
        try {
            const response = await fetch(`backend/comments.php?task_id=${taskId}`, { method: 'GET', credentials: 'include' });
            if (response.ok) {
                const comments = await response.json();
                const commentList = document.getElementById(`comment-list-${taskId}`);
                commentList.innerHTML = comments.map(comment => `
                    <li class="list-group-item">
                        <strong>${comment.email}</strong> (${new Date(comment.created_at).toLocaleString()}):
                        <p>${comment.description}</p>
                    </li>
                `).join('') || '<li class="list-group-item">No hay comentarios</li>';
            } else {
                console.error("Error al cargar los comentarios");
            }
        } catch (err) {
            console.error("Error al obtener los comentarios:", err);
        }
    }

    // Muestra el modal para añadir un comentario
    function showCommentModal(e) {
        document.getElementById("comment-task-id").value = e.target.dataset.id;
        const modal = new bootstrap.Modal(document.getElementById("commentModal"));
        modal.show();
    }

    // Maneja la edición de una tarea
    function handleEditTask(event) {
        try {
            const taskId = parseInt(event.target.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('due-date').value = task.due_date;
            isEditMode = true;
            edittingId = taskId;
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();
        } catch (error) {
            alert("Error al intentar editar la tarea");
            console.error(error);
        }
    }

    // Maneja la eliminación de una tarea
    async function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        try {
            const response = await fetch(`${API_URL}?id=${id}`, { credentials: 'include', method: 'DELETE' });
            if (response.ok) {
                loadTasks();
            } else {
                console.error("Problema al eliminar la tarea");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Maneja la eliminación de un comentario
    function handleRemoveComment(e) {
        const taskId = parseInt(e.target.dataset.visitid);
        const commentId = parseInt(e.target.dataset.commentid);
        const selectedTask = tasks.find(t => t.id === taskId);
        const commentIndex = selectedTask.comments.findIndex(c => c.id === commentId);
        selectedTask.comments.splice(commentIndex, 1);
        loadTasks();
    }

    // Maneja el envío del formulario de comentarios
    document.getElementById('comment-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const comment = document.getElementById('task-comment').value; // Obtiene el comentario ingresado
        const selectedTaskId = parseInt(document.getElementById('comment-task-id').value); // ID de la tarea seleccionada

        try {
            // Envía el comentario al backend
            const response = await fetch('backend/comments.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task_id: selectedTaskId, description: comment }),
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Comentario guardado exitosamente:", result);
                const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
                modal.hide();
                loadTasks(); // Recarga las tareas para reflejar el nuevo comentario
            } else {
                console.error("Error al guardar el comentario");
            }
        } catch (err) {
            console.error("Error al enviar el comentario:", err);
        }
    });

    // Maneja el envío del formulario de tareas
    document.getElementById('task-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const response = await fetch(`${API_URL}?id=${edittingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, due_date: dueDate })
            });
            if (!response.ok) console.error("No se pudo actualizar la tarea");
        } else {
            const newTask = { title, description, due_date: dueDate };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
                credentials: 'include'
            });
            if (!response.ok) console.error("No se pudo agregar la tarea");
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    // Resetea el formulario de comentarios al mostrar el modal
    document.getElementById('commentModal').addEventListener('show.bs.modal', function () {
        document.getElementById('comment-form').reset();
    });

    // Resetea el formulario de tareas al mostrar el modal
    document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
        if (!isEditMode) document.getElementById('task-form').reset();
    });

    // Resetea el estado de edición al cerrar el modal
    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function () {
        edittingId = null;
        isEditMode = false;
    });

    loadTasks(); // Carga inicial de tareas
});