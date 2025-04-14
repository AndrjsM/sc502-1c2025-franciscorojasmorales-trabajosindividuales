// Este archivo maneja la lógica del registro de nuevos usuarios.

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form'); // Formulario de registro
    const registerError = document.getElementById('register-error'); // Mensaje de error

    // Maneja el envío del formulario de registro
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        const email = document.getElementById('email').value; // Obtiene el email ingresado
        const password = document.getElementById('password').value; // Obtiene la contraseña ingresada
        const confirmPassword = document.getElementById('confirm-password').value; // Obtiene la confirmación de la contraseña

        // Verifica que las contraseñas coincidan
        if (password !== confirmPassword) {
            registerError.innerHTML = `<div class="alert alert-danger fade show" role="alert">
            <strong>Error:</strong> Las contraseñas no coinciden.
            </div>`;
            return;
        }

        try {
            // Envía los datos al backend para registrar al usuario
            const response = await fetch('backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ email: email, password: password })
            });

            const result = await response.json(); // Obtiene la respuesta del servidor

            if (response.ok) {
                // Muestra un mensaje de éxito y redirige al login
                registerError.innerHTML = `<div class="alert alert-success fade show" role="alert">
                <strong>Éxito:</strong> Usuario registrado exitosamente.
                </div>`;
                setTimeout(function () {
                    registerError.innerHTML = "";
                    window.location.href = "index.html";
                }, 5000);
            } else {
                // Muestra un mensaje de error si el registro falla
                registerError.innerHTML = `<div class="alert alert-danger fade show" role="alert">
                <strong>Error:</strong> ${result.error || "Error al registrar el usuario."}
                </div>`;
            }
        } catch (err) {
            console.error("Error al intentar registrar al usuario:", err);
        }
    });
});