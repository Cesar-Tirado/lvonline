document.addEventListener("DOMContentLoaded", () => {
    const wordBlocks = [
        "La lectura veloz permite procesar texto rápidamente.",
        "Captar grupos de palabras mejora la comprensión.",
        "Leer en bloques reduce la fatiga ocular.",
        "Practicar técnicas avanzadas acelera el aprendizaje.",
        "La lectura por bloques requiere enfoque constante."
    ];

    let currentIndex = 0;

    const wordDisplay = document.getElementById("word-display");
    const nextBlockButton = document.getElementById("next-block");
    const startPracticeButton = document.getElementById("start-practice");
    const wordBlocksContainer = document.getElementById("word-blocks");
    const questionsContainer = document.getElementById("questions");

    startPracticeButton.addEventListener("click", () => {
        wordBlocksContainer.classList.remove("hidden");
        startPracticeButton.classList.add("hidden");
        displayNextBlock();
    });

    nextBlockButton.addEventListener("click", () => {
        if (currentIndex < wordBlocks.length - 1) {
            currentIndex++;
            displayNextBlock();
        } else {
            wordBlocksContainer.classList.add("hidden");
            questionsContainer.classList.remove("hidden");
        }
    });

    function displayNextBlock() {
        wordDisplay.textContent = wordBlocks[currentIndex];
        wordDisplay.style.opacity = 1;

        setTimeout(() => {
            wordDisplay.style.opacity = 0;
        }, 2000);

        nextBlockButton.classList.remove("hidden");
    }

    document.getElementById("practice-questions").addEventListener("submit", (e) => {
        e.preventDefault();

        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const totalQuestions = document.querySelectorAll("input[type='radio'][value='correct']").length;

        const resultMessage = document.getElementById("result-message");
        const markCompleteButton = document.getElementById("mark-complete");

        if (correctAnswers === totalQuestions) {
            resultMessage.textContent = "¡Felicidades! Has completado la práctica exitosamente.";
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = "Intenta nuevamente para mejorar tu comprensión.";
        }

        document.getElementById("results").classList.remove("hidden");
        questionsContainer.classList.add("hidden");
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo5/practica2.html";
        });
    });
});
