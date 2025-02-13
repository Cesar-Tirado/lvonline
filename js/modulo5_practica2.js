document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "Comprensión", "Desconexión", "Velocidad", "Confusión", "Bloques", "Salto", "Concentración"
    ];
    let currentWordIndex = 0;
    const flashingWord = document.getElementById("flashing-word");
    const startPracticeButton = document.getElementById("start-practice");
    const wordFlashContainer = document.getElementById("word-flash");
    const nextWordButton = document.getElementById("next-word");
    const questionsContainer = document.getElementById("questions");
    const optionsContainer = document.getElementById("options-container");
    const submitAnswersButton = document.getElementById("submit-answers");

    // Iniciar la práctica
    startPracticeButton.addEventListener("click", () => {
        wordFlashContainer.classList.remove("hidden");
        startPracticeButton.classList.add("hidden");
        showNextWord();
    });

    nextWordButton.addEventListener("click", () => {
        if (currentWordIndex < words.length - 1) {
            currentWordIndex++;
            showNextWord();
        } else {
            wordFlashContainer.classList.add("hidden");
            questionsContainer.classList.remove("hidden");
            submitAnswersButton.classList.remove("hidden");
        }
    });

    function showNextWord() {
        flashingWord.textContent = words[currentWordIndex];
        flashingWord.style.opacity = 1;

        setTimeout(() => {
            flashingWord.style.opacity = 0;
        }, 1000);

        nextWordButton.classList.remove("hidden");
    }

    // Manejar la selección de opciones
    optionsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("word-option")) {
            e.target.classList.toggle("selected");
        }
    });

    // Enviar respuestas
    submitAnswersButton.addEventListener("click", () => {
        const selectedOptions = document.querySelectorAll(".word-option.selected");
        let correctCount = 0;

        selectedOptions.forEach((option) => {
            if (option.dataset.correct === "true") {
                correctCount++;
            }
        });

        const totalCorrect = document.querySelectorAll(".word-option[data-correct='true']").length;
        const score = (correctCount / totalCorrect) * 100;

        const resultMessage = document.getElementById("result-message");
        const markCompleteButton = document.getElementById("mark-complete");

        if (score >= 85) {
            resultMessage.textContent = `¡Felicidades! Has completado la práctica con un puntaje de ${score}%.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
        }

        document.getElementById("results").classList.remove("hidden");
        questionsContainer.classList.add("hidden");
    });

    // Completar práctica y redirigir
    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo5/practica3.html";
        });
    });

    // Botón de reintentar
const retryButton = document.createElement("button");
retryButton.textContent = "Intentarlo otra vez";
retryButton.classList.add("exercise-btn", "hidden");
retryButton.addEventListener("click", () => {
    location.reload(); // Recarga la página
});
document.getElementById("results").appendChild(retryButton);

// Enviar respuestas
submitAnswersButton.addEventListener("click", () => {
    const selectedOptions = document.querySelectorAll(".word-option.selected");
    let correctCount = 0;

    selectedOptions.forEach((option) => {
        if (option.dataset.correct === "true") {
            correctCount++;
        }
    });

    const totalCorrect = document.querySelectorAll(".word-option[data-correct='true']").length;
    const score = (correctCount / totalCorrect) * 100;

    const resultMessage = document.getElementById("result-message");
    const markCompleteButton = document.getElementById("mark-complete");

    if (score >= 85) {
        resultMessage.textContent = `¡Felicidades! Has completado la práctica con un puntaje de ${score}%.`;
        markCompleteButton.classList.remove("hidden");
    } else {
        resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
        retryButton.classList.remove("hidden"); // 🔹 Mostrar botón de reintentar si no aprueba
    }

    document.getElementById("results").classList.remove("hidden");
    questionsContainer.classList.add("hidden");
});

});
