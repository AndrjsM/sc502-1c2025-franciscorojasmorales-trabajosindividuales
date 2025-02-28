document.addEventListener('DOMContentLoaded', function () {

    // Datos ficticios para tareas
    const tasks = [
        {
            id: 1,
            title: "Complete Project Report",
            description: "Prepare and submit the final project report by the end of the week.",
            due_date: "2024-08-25",
            comments: []
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Schedule a team meeting to discuss the next sprint.",
            due_date: "2024-08-26",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Review the codebase and ensure all pull requests are merged.",
            due_date: "2024-08-27",
            comments: []
        }
    ];

    // Cargar tareas en el DOM
    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text text-muted">${task.due_date}</p>
                    <div class="accordion" id="accordion-${task.id}">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading-${task.id}">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${task.id}" aria-expanded="true" aria-controls="collapse-${task.id}">
                                    Comments
                                </button>
                            </h2>
                            <div id="collapse-${task.id}" class="accordion-collapse collapse" aria-labelledby="heading-${task.id}" data-bs-parent="#accordion-${task.id}">
                                <div class="accordion-body my-2">
                                    ${task.comments.length > 0 ? `
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="fs-6">Name</th>
                                                <th scope="col" class="fs-6">Date</th>
                                                <th scope="col" class="fs-6">Comment</th>
                                                <th scope="col" class="fs-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${task.comments.map(comment => `
                                            <tr>
                                                <td>${comment.author}</td>
                                                <td>${comment.date}</td>
                                                <td>${comment.text}</td>
                                                <td><button class="btn btn-danger btn-sm delete-comment" data-task-id="${task.id}" data-comment-text="${comment.text}"><i class="bi bi-trash-fill"></i></button></td>
                                            </tr>`).join('')}
                                        </tbody>
                                    </table>` : `<p>No comments</p>`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="me-2 btn btn-secondary add-comment" data-task-id="${task.id}" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
                    <button class="me-2 btn btn-secondary btn-sm edit-task" data-id="${task.id}" data-bs-toggle="modal" data-bs-target="#taskModal">Edit</button>
                    <button class="me-2 btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(function (btnEdit) {
            btnEdit.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function (btnDelete) {
            btnDelete.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.add-comment').forEach(function (btnAddComment) {
            btnAddComment.addEventListener('click', handleAddComment);
        });

        document.querySelectorAll('.delete-comment').forEach(function (btnDeleteComment) {
            btnDeleteComment.addEventListener('click', handleDeleteComment);
        });
    }

    function handleEditTask(event) {
        const taskId = event.target.dataset.id;
        const task = tasks.find(task => task.id == taskId);
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.due_date;
    }

    function handleDeleteTask(event) {
        const taskId = event.target.dataset.id;
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        tasks.splice(taskIndex, 1);
        loadTasks();
    }

    function handleAddComment(event) {
        const taskId = event.target.dataset.taskId;
        document.getElementById('comment-task-id').value = taskId;
    }

    function handleSaveComment() {
        const taskId = document.getElementById('comment-task-id').value;
        const author = document.getElementById('comment-author').value.trim();
        const text = document.getElementById('comment-text').value.trim();
        const date = new Date().toISOString().split('T')[0];
        if (author && text) {
            const task = tasks.find(task => task.id == taskId);
            task.comments.push({ author, text, date });
            loadTasks();
            document.getElementById('comment-author').value = '';
            document.getElementById('comment-text').value = '';
            const commentModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
            commentModal.hide();
        }
    }

    function handleDeleteComment(event) {
        const taskId = event.target.dataset.taskId;
        const commentText = event.target.dataset.commentText;
        const task = tasks.find(task => task.id == taskId);
        task.comments = task.comments.filter(comment => comment.text !== commentText);
        loadTasks();
    }

    loadTasks();

    document.getElementById('save-comment').addEventListener('click', handleSaveComment);
});