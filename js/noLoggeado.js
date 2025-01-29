document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        // Crear el modal dinámicamente
        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("modal-overlay");

        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <p>Debes iniciar sesión para acceder a esta página.</p>
            <button id="redirect-login">Iniciar Sesión</button>
            <a id="purchase-access">Comprar Acceso al Curso</a>
        `;

        document.body.appendChild(modalOverlay);
        document.body.appendChild(modal);

        // Mostrar el modal
        modalOverlay.classList.add("show");
        modal.classList.add("show");

        // Botón de redirección
        document.getElementById("redirect-login").addEventListener("click", () => {
            modalOverlay.classList.remove("show");
            modal.classList.remove("show");

            // Redirigir al login
            const basePath = window.location.pathname.split("/").slice(0, -1).join("/");
            window.location.href = `${basePath}/../../index.html`;
        });

        // Redirigir al enlace de compra
        document.getElementById("purchase-access").addEventListener("click", () => {
            window.open("https://www.lecturavelozpro.com/"); // Reemplaza con tu URL real
        });
    } else {
        console.log(`Usuario autenticado: ${loggedInUser}`);
    }

    // Lógica para cerrar sesión
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = `${basePath}/../../index.html`; // Redirigir al index.html
        });
    }
    
    document.getElementById("logout").addEventListener("click", () => {
        Swal.fire({
            title: 'Cerrando sesión...',
            text: 'Por favor, espera un momento.',
            icon: 'info', // Cambia a 'success', 'warning', etc., si lo prefieres
            showConfirmButton: false, // Quita el botón de confirmar
            timer: 1500, // Tiempo que dura la alerta (en milisegundos)
            timerProgressBar: true, // Barra de progreso
            background: '#f8f9fa', // Fondo personalizado
            color: '#333', // Color del texto
        }).then(() => {
            location.reload(); // Recarga la página después de que desaparezca la alerta
        });
    });
    

});
