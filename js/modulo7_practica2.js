document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-visual-test");
    const trackingArea = document.getElementById("tracking-area");
    const movingBlock = document.getElementById("moving-block");
    const optionsContainer = document.getElementById("options-container");
    const optionsDiv = document.querySelector(".options");
    const submitButton = document.getElementById("submit-answer");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    let correctPosition;
    let selectedPosition;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        trackingArea.classList.remove("hidden");
        movingBlock.style.display = "block"; // 🔹 Asegurar que el bloque se muestre
        moveBlock();
    });

    function moveBlock() {
        const positions = ["Izquierda", "Centro", "Derecha"];
        correctPosition = positions[Math.floor(Math.random() * positions.length)];
        let animationFrames = 0;

        const maxX = trackingArea.offsetWidth - movingBlock.offsetWidth;  // 🔹 Evita que salga del borde derecho
        const maxY = trackingArea.offsetHeight - movingBlock.offsetHeight; // 🔹 Evita que salga del borde inferior

        const interval = setInterval(() => {
            const randomX = Math.floor(Math.random() * maxX); // 🔹 Genera posiciones dentro del área
            const randomY = Math.floor(Math.random() * maxY);

            movingBlock.style.left = `${randomX}px`;
            movingBlock.style.top = `${randomY}px`;

            animationFrames++;
            if (animationFrames > 30) {
                clearInterval(interval);
                endAnimation(correctPosition);
            }
        }, 100); // 🔹 Más rápido para mayor reto
    }

    function endAnimation(position) {
        movingBlock.style.display = "none"; // 🔹 Ocultar bloque al detenerse
        optionsContainer.classList.remove("hidden");
        optionsDiv.innerHTML = ""; // 🔹 Limpiar opciones previas
        generateOptions(position);
    }

    function generateOptions(correctPosition) {
        const positions = ["Izquierda", "Centro", "Derecha"];
        positions.forEach((position) => {
            const button = document.createElement("button");
            button.textContent = position;
            button.classList.add("option");
            button.addEventListener("click", () => {
                document.querySelectorAll(".option").forEach((btn) => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedPosition = position;
                submitButton.classList.remove("hidden");
            });
            optionsDiv.appendChild(button);
        });
    }

    submitButton.addEventListener("click", () => {
        const score = selectedPosition === correctPosition ? 100 : 0;

        trackingArea.classList.add("hidden");
        optionsContainer.classList.add("hidden");
        results.classList.remove("hidden");

        if (score === 100) {
            resultMessage.textContent = `¡Correcto! Identificaste la posición correctamente (${correctPosition}).`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Incorrecto. La posición correcta era ${correctPosition}.`;
            retryButton.classList.remove("hidden");
        }
    });

    retryButton.addEventListener("click", () => {
        trackingArea.classList.remove("hidden");
        movingBlock.style.display = "block"; // 🔹 Asegurar que el bloque reaparezca
        results.classList.add("hidden");
        optionsDiv.innerHTML = ""; // 🔹 Reset de opciones
        submitButton.classList.add("hidden");
        moveBlock();
    });

    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo7/practica3.html";
        });
    });
    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));
    
        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");
    
        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo7/practica3.html"; // 🔹 Redirección al siguiente módulo
        });
    
        // 🔹 Asegurar que también se redirija al hacer clic en "Marcar como Completado"
        window.location.href = "/modulos/modulo7/practica3.html";
    });
    
});
