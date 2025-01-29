document.addEventListener("DOMContentLoaded", () => {
    // Ejercicio 1
    const memorizeButton = document.getElementById("start-memorize");
    const memorizeSection = document.getElementById("words-to-memorize");
    const selectSection = document.getElementById("exercise1-select");
    const wordOptions = document.querySelectorAll(".word-option");
    let selectedWords = [];

    memorizeButton.addEventListener("click", () => {
        memorizeSection.classList.remove("hidden");
        setTimeout(() => {
            memorizeSection.classList.add("hidden");
            selectSection.classList.remove("hidden");
        }, 5000); // Mostrar palabras durante 5 segundos
    });

    wordOptions.forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
            if (word.classList.contains("selected")) {
                selectedWords.push(word.textContent);
            } else {
                selectedWords = selectedWords.filter((w) => w !== word.textContent);
            }
        });
    });

    // Ejercicio 2
    const trackingButton = document.getElementById("start-tracking");
    const blocksContainer = document.getElementById("blocks-container");
    const blocks = document.querySelectorAll(".block");
    let trackingStarted = false;

    trackingButton.addEventListener("click", () => {
        trackingButton.classList.add("hidden");
        blocksContainer.classList.remove("hidden");
        trackingStarted = true;

        setTimeout(() => {
            blocks.forEach((block) => block.classList.remove("highlight"));
            blocks[2].classList.add("highlight");
        }, 2000); // Resaltar el bloque correcto después de 2 segundos
    });

    // Evaluación
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        let score = 0;

        // Validación Ejercicio 1
        const correctWords = ["Rendimiento", "Velocidad", "Comprehensión", "Práctica", "Subvocalización"];
        const correctSelections = selectedWords.filter((word) => correctWords.includes(word));
        const exercise1Score = (correctSelections.length / correctWords.length) * 50;
        score += exercise1Score;

        // Validación Ejercicio 2
        if (trackingStarted && blocks[2].classList.contains("highlight")) {
            score += 50;
        }

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (score >= 90) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${score}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    // Modal
    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo6/teoria1.html";
        });
    });
});
