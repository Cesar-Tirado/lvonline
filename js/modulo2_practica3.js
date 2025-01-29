document.addEventListener("DOMContentLoaded", () => {
    const distractors = document.querySelectorAll(".word[data-distractor='true']");
    const words = document.querySelectorAll(".word");
    let totalScore = 0;

    // Ejercicio de selección de distractores
    let selectedDistractors = [];

    words.forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
            if (word.classList.contains("selected")) {
                selectedDistractors.push(word);
            } else {
                selectedDistractors = selectedDistractors.filter((w) => w !== word);
            }
        });
    });

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        const correctSelections = selectedDistractors.filter((word) =>
            word.getAttribute("data-distractor") === "true"
        );
        const incorrectSelections = selectedDistractors.filter((word) =>
            word.getAttribute("data-distractor") === "false"
        );

        const totalCorrect = distractors.length;
        const correctCount = correctSelections.length;
        const incorrectCount = incorrectSelections.length;

        totalScore = 0;

        if (correctCount === totalCorrect && incorrectCount === 0) {
            totalScore += 100; // 100% si todas son correctas
        } else {
            totalScore += (correctCount / totalCorrect) * 100; // Puntaje proporcional
        }

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 70) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${totalScore}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${totalScore}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
        document.getElementById("exercise").classList.add("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        selectedDistractors = [];
        words.forEach((word) => word.classList.remove("selected"));
        document.getElementById("exercise").classList.remove("hidden");
        document.getElementById("results").classList.add("hidden");
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};

        // Guardar progreso del submódulo
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        // Mostrar modal
        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo2/evaluacionTeorica.html"; // Redirigir al siguiente submódulo
        });
    });

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });
});
