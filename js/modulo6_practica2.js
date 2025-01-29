document.addEventListener("DOMContentLoaded", () => {
    const patternContainer = document.getElementById("pattern-container");
    const patternDisplay = document.getElementById("pattern-display");
    const startButton = document.getElementById("start-pattern");
    const patternForm = document.getElementById("pattern-form");

    const patterns = ["Lectura", "Velocidad", "Comprehensión"];
    let currentIndex = 0;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        patternDisplay.textContent = "";
        let interval = setInterval(() => {
            if (currentIndex < patterns.length) {
                patternDisplay.textContent = patterns[currentIndex];
                currentIndex++;
            } else {
                clearInterval(interval);
                patternDisplay.textContent = "¿Recuerdas el patrón?";
                patternForm.classList.remove("hidden");
            }
        }, 1000);
    });

    patternForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedOption = document.querySelector("input[name='pattern']:checked");
        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (selectedOption && selectedOption.value === "correct") {
            resultMessage.textContent = "¡Correcto! Identificaste el patrón.";
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
        patternForm.reset();
        patternForm.classList.add("hidden");
        document.getElementById("results").classList.add("hidden");
        startButton.classList.remove("hidden");
        currentIndex = 0;
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        window.location.href = "/modulos/modulo6/practica3.html";
    });
});
