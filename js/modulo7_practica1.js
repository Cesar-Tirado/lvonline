document.addEventListener("DOMContentLoaded", () => {
    const words = ["rápido", "clave", "información", "subvocalización", "práctica", "veloz", "lectura", "análisis", "memoria"];
    let displayedWords = [];
    let selectedWords = [];

    const startButton = document.getElementById("start-pattern-test");
    const patternContainer = document.getElementById("pattern-container");
    const wordDisplay = document.getElementById("word-display");
    const optionsContainer = document.getElementById("options-container");
    const wordOptions = document.getElementById("word-options");
    const submitButton = document.getElementById("submit-pattern");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        patternContainer.classList.remove("hidden");
        startTest();
    });

    function startTest() {
        displayedWords = getRandomWords(6);
        wordDisplay.textContent = displayedWords.join(" - ");
        
        setTimeout(() => {
            wordDisplay.textContent = ""; // Ocultar palabras
            patternContainer.classList.add("hidden");
            showOptions();
        }, 2000); // Mostrar palabras por 2 segundos
    }

    function getRandomWords(num) {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, num);
    }

    function showOptions() {
        optionsContainer.classList.remove("hidden");
        wordOptions.innerHTML = "";

        const optionsList = [...displayedWords, ...getRandomWords(3)].sort(() => Math.random() - 0.5);

        optionsList.forEach((word) => {
            const option = document.createElement("button");
            option.textContent = word;
            option.classList.add("option");
            option.addEventListener("click", () => {
                // Controlar la cantidad máxima de selecciones
                if (option.classList.contains("selected")) {
                    option.classList.remove("selected");
                    option.style.backgroundColor = ""; // Restaurar color original
                    selectedWords = selectedWords.filter((w) => w !== word);
                } else if (selectedWords.length < displayedWords.length) {
                    option.classList.add("selected");
                    option.style.backgroundColor = "#14aff8"; // 🔹 Cambiar color al seleccionar
                    selectedWords.push(word);
                }
            });
            wordOptions.appendChild(option);
        });

        submitButton.classList.remove("hidden");
    }

    submitButton.addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) => displayedWords.includes(word));
        const maxScore = 100; // Para evitar puntajes mayores al 100%
        let score = Math.min((correctSelections.length / displayedWords.length) * 100, maxScore);

        displayResults(score);
    });

    function displayResults(score) {
        optionsContainer.classList.add("hidden");
        results.classList.remove("hidden");

        if (score >= 66) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje de ${score.toFixed(2)}%.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Obtuviste un puntaje de ${score.toFixed(2)}%. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
        }
    }

    // 🔹 Botón de "Reintentar" ahora recarga la página completamente
    retryButton.addEventListener("click", () => {
        location.reload();
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
            window.location.href = "/modulos/modulo7/practica2.html"; // 🔹 Redirigir al siguiente módulo
        });

        // 🔹 Redirigir inmediatamente al hacer clic en "Marcar como Completado"
        window.location.href = "/modulos/modulo7/practica2.html";
    });
});
