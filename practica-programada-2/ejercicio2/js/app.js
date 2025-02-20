document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');
    let users = [];
    let currentUserId = null;

    // Maneja el evento de envío del formulario para agregar o actualizar un usuario
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('nombre').value;
        const userEmail = document.getElementById('email').value;
        const userRole = document.getElementById('rol').value;

        if (currentUserId === null) {
            const newUser = { id: Date.now(), name: userName, email: userEmail, role: userRole };
            users.push(newUser);
            console.log('Usuario agregado:', newUser);
        } else {
            const user = users.find(user => user.id === currentUserId);
            user.name = userName;
            user.email = userEmail;
            user.role = userRole;
            console.log('Usuario actualizado:', user);
        }

        currentUserId = null;
        userForm.reset();
        renderUsers();
    });

    // Renderiza la lista de usuarios en la tabla
    function renderUsers() {
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Edita un usuario existente
    window.editUser = function(id) {
        const user = users.find(user => user.id === id);
        document.getElementById('userId').value = user.id;
        document.getElementById('nombre').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('rol').value = user.role;
        currentUserId = user.id;
    }

    // Elimina un usuario existente
    window.deleteUser = function(id) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }

    // Maneja el cambio de modo oscuro
    let toggleButton = document.getElementById('toggleDarkMode');
    let body = document.body;
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        toggleButton.textContent = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    });
});
