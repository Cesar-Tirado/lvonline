document.addEventListener("DOMContentLoaded", () => {
    const words = ["rápido", "clave", "información", "subvocalización", "práctica", "veloz", "lectura"];
    let displayedWords = [];
    let selectedWords = [];
    let currentRound = 0;
    const maxRounds = 5;

    const startButton = document.getElementById("start-pattern-test");
    const patternContainer = document.getElementById("pattern-container");
    const wordDisplay = document.getElementById("word-display");
    const optionsContainer = document.getElementById("options-container");
    const submitButton = document.getElementById("submit-pattern");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        patternContainer.classList.remove("hidden");
        startRound();
    });

    function startRound() {
        if (currentRound >= maxRounds) {
            endPractice();
            return;
        }

        currentRound++;
        displayedWords = generateRandomWords();
        selectedWords = [];

        wordDisplay.textContent = displayedWords.join(", ");
        setTimeout(() => {
            wordDisplay.textContent = ""; // Ocultar palabras
            showOptions();
        }, 2000); // Mostrar palabras por 2 segundos
    }

    function generateRandomWords() {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5); // Seleccionar 5 palabras aleatorias
    }

    function showOptions() {
        optionsContainer.innerHTML = ""; // Limpiar opciones
        words.forEach((word) => {
            const option = document.createElement("button");
            option.textContent = word;
            option.classList.add("option");
            option.addEventListener("click", () => {
                option.classList.toggle("selected");
                if (option.classList.contains("selected")) {
                    selectedWords.push(word);
                } else {
                    selectedWords = selectedWords.filter((w) => w !== word);
                }
            });
            optionsContainer.appendChild(option);
        });
        submitButton.classList.remove("hidden");
    }

    submitButton.addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) => displayedWords.includes(word));
        const score = (correctSelections.length / displayedWords.length) * 100;

        if (currentRound < maxRounds) {
            startRound();
        } else {
            displayResults(score);
        }
    });

    function displayResults(score) {
        patternContainer.classList.add("hidden");
        results.classList.remove("hidden");

        if (score >= 70) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje de ${score.toFixed(2)}%.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Obtuviste un puntaje de ${score.toFixed(2)}%. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
        }
    }

    retryButton.addEventListener("click", () => {
        currentRound = 0;
        results.classList.add("hidden");
        patternContainer.classList.remove("hidden");
        startRound();
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
            window.location.href = "/modulos/modulo7/practica2.html";
        });
    });
});
