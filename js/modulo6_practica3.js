document.addEventListener("DOMContentLoaded", () => {
    const movingTextContainer = document.getElementById("moving-text-container");
    const movingText = document.getElementById("moving-text");
    const startButton = document.getElementById("start-moving-text");
    const movingTextForm = document.getElementById("moving-text-form");

    const text = "La lectura veloz es una habilidad clave para procesar información de manera eficiente, ahorrando tiempo y mejorando la comprensión.";
    let position = 0;

    function moveText() {
        movingText.style.transform = `translateX(${position}px)`;
        position -= 2;

        if (Math.abs(position) > movingTextContainer.offsetWidth + movingText.offsetWidth) {
            clearInterval(movingInterval);
            movingTextForm.classList.remove("hidden");
        }
    }

    let movingInterval;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        movingText.textContent = text;
        position = movingTextContainer.offsetWidth;
        movingInterval = setInterval(moveText, 30);
    });

    movingTextForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedOption = document.querySelector("input[name='moving-text']:checked");
        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (selectedOption && selectedOption.value === "correct") {
            resultMessage.textContent = "¡Correcto! Has identificado el tema correctamente.";
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = "Respuesta incorrecta. Inténtalo nuevamente.";
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        movingTextForm.reset();
        movingTextForm.classList.add("hidden");
        document.getElementById("results").classList.add("hidden");
        startButton.classList.remove("hidden");
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        window.location.href = "/modulos/modulo6/evaluacionTeorica.html";
    });
});
