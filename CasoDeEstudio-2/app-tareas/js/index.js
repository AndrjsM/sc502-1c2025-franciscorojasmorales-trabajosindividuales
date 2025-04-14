// Este archivo maneja la lógica del inicio de sesión de los usuarios.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm'); // Formulario de inicio de sesión
    const loginError = document.getElementById('login-error'); // Mensaje de error

    // Maneja el envío del formulario de inicio de sesión
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        const email = document.getElementById('email').value; // Obtiene el email ingresado
        const password = document.getElementById('password').value; // Obtiene la contraseña ingresada

        try {
            // Envía los datos al backend para autenticación
            const response = await fetch('backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ email: email, password: password })
            });

            const result = await response.json(); // Obtiene la respuesta del servidor

            if (response.ok) {
                // Redirige al dashboard si el inicio de sesión es exitoso
                window.location.href = 'dashboard.html';
            } else {
                // Muestra el mensaje de error si las credenciales son incorrectas
                loginError.style.display = 'block';
                loginError.textContent = result.error;
            }
        } catch (err) {
            console.error("Error al intentar iniciar sesión:", err);
        }
    });
});