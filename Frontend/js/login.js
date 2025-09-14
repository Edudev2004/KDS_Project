document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    const btnText = document.getElementById('btnText');
    const loader = document.getElementById('loader');

    // Ocultar mensaje de error previo
    errorDiv.classList.remove('show');

    // Mostrar loader
    btnText.style.display = 'none';
    loader.style.display = 'inline';

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        const usuarios = await response.json();
        console.log('Usuarios obtenidos:', usuarios);

        const usuarioEncontrado = usuarios.find(u =>
            u.usuario === usuario && u.password === password
        );

        if (usuarioEncontrado) {
            console.log('Login exitoso:', usuarioEncontrado);

            localStorage.setItem('userData', JSON.stringify({
                id: usuarioEncontrado.id_usuario,
                nombre: usuarioEncontrado.nombre,
                usuario: usuarioEncontrado.usuario,
                rol: usuarioEncontrado.rol
            }));

            // Redirigir al dashboard
            window.location.href = 'dashboard/admin.html';

        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }

    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = error.message || 'Error de conexión. Intenta nuevamente.';
        errorDiv.classList.add('show');

    } finally {
        // Ocultar loader
        btnText.style.display = 'inline';
        loader.style.display = 'none';
    }
});