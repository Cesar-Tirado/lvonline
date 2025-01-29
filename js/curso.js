document.addEventListener("DOMContentLoaded", () => {
    // Recuperar progreso desde localStorage
    const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};

    // Actualizar submódulos completados
    document.querySelectorAll(".submodulo-link").forEach(link => {
        const submodule = link.getAttribute("href").split("/").pop();

        // Verificar si el submódulo está completado
        if (progress[submodule] === "completed") {
            link.style.color = "green";
            link.textContent += " (Completado)";
        }
    });

    // Actualizar barra de progreso
    const totalSubmodules = document.querySelectorAll(".submodulo-link").length;
    const completedSubmodules = Object.values(progress).filter(status => status === "completed").length;
    const progressBar = document.getElementById("progress-bar");

    if (progressBar) {
        progressBar.style.width = `${(completedSubmodules / totalSubmodules) * 100}%`;
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const modulos = document.querySelectorAll(".modulo");

    modulos.forEach((modulo) => {
        modulo.addEventListener("click", () => {
            const submodulos = modulo.querySelector(".submodulos");
            const isOpen = submodulos.classList.contains("open");
            
            // Cerrar todos los demás
            document.querySelectorAll(".submodulos").forEach((sm) => sm.classList.remove("open"));
            
            // Abrir o cerrar el actual
            if (!isOpen) submodulos.classList.add("open");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const pagination = document.getElementById("pagination");
    const slides = document.querySelectorAll(".card");
    const slidesToShow = window.innerWidth > 768 ? 2 : 1; // Mostrar 2 o 1 tarjeta dependiendo del tamaño
    const totalPages = Math.ceil(slides.length / slidesToShow);

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // Crear puntos de paginación
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        pagination.appendChild(dot);

        dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
        });
    }

    const updateSlider = () => {
        const offset = -currentIndex * 100; // Ajustar por página
        slider.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll(".pagination .dot").forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    };

    // Eventos táctiles
    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const moveX = e.touches[0].clientX;
        const deltaX = moveX - startX;

        if (Math.abs(deltaX) > 50) { // Umbral para reconocer un deslizamiento
            if (deltaX > 0) {
                // Deslizar a la izquierda
                currentIndex = Math.max(currentIndex - 1, 0);
            } else {
                // Deslizar a la derecha
                currentIndex = Math.min(currentIndex + 1, totalPages - 1);
            }
            updateSlider();
            isDragging = false;
        }
    });

    slider.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Eventos de mouse para PC
    slider.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const moveX = e.clientX;
        const deltaX = moveX - startX;

        if (Math.abs(deltaX) > 50) { // Umbral para reconocer un deslizamiento
            if (deltaX > 0) {
                // Deslizar a la izquierda
                currentIndex = Math.max(currentIndex - 1, 0);
            } else {
                // Deslizar a la derecha
                currentIndex = Math.min(currentIndex + 1, totalPages - 1);
            }
            updateSlider();
            isDragging = false;
        }
    });

    slider.addEventListener("mouseup", () => {
        isDragging = false;
    });

    slider.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // Auto deslizar cada 5 segundos (opcional, actualmente comentado)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalPages;
    //     updateSlider();
    // }, 15000);
});

document.addEventListener("DOMContentLoaded", () => {
    const completeButtons = document.querySelectorAll(".complete-btn");
    const steps = document.querySelectorAll(".step");
    const downloadButton = document.getElementById("downloadCertificate");

    // Cargar progreso guardado
    completeButtons.forEach((button) => {
        const moduleNumber = button.getAttribute("data-module");
        if (localStorage.getItem(`module${moduleNumber}`) === "completed") {
            button.disabled = true;
            button.textContent = "Completado";
            steps[moduleNumber - 1].classList.add("completed");
        }
    });

    // Marcar módulo como completado
    completeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const moduleNumber = button.getAttribute("data-module");
            localStorage.setItem(`module${moduleNumber}`, "completed");
            button.disabled = true;
            button.textContent = "Completado";
            steps[moduleNumber - 1].classList.add("completed");
            checkCompletion();
        });
    });

    // Comprobación para habilitar el certificado
    function checkCompletion() {
        const allCompleted = [...completeButtons].every(button =>
            button.disabled
        );
        if (allCompleted) {
            steps[7].classList.add("completed");
            downloadButton.disabled = false;
        }
    }

    // Descargar certificado desde un archivo en el repositorio
    downloadButton.addEventListener("click", () => {
        // Ruta del certificado en el repositorio de GitHub Pages
        window.open("assets/pdfs/CertificadoLVO.pdf", "_blank");
    });

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
    
    checkCompletion(); // Comprobar si ya estaba completado antes
});




