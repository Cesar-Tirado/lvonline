document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll(".word");
    const startButton = document.getElementById("start-exercise");
    const submitButton = document.getElementById("submit-practice");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");
    const resultMessage = document.getElementById("result-message");
    const timerElement = document.getElementById("timer");

    let selectedWords = [];
    let correctCount = 0;
    let incorrectCount = 0;
    let timeLeft = 20;
    let timerInterval = null;

    // Evento de selección de palabras clave
    words.forEach(word => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");

            if (word.classList.contains("selected")) {
                selectedWords.push(word);
            } else {
                selectedWords = selectedWords.filter(w => w !== word);
            }
        });
    });

    // Iniciar el ejercicio
    startButton.addEventListener("click", () => {
        selectedWords = [];
        correctCount = 0;
        incorrectCount = 0;
        timeLeft = 20;
        timerElement.textContent = timeLeft;
        startButton.classList.add("hidden");
        submitButton.classList.remove("hidden");

        words.forEach(word => word.classList.remove("selected"));

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitPractice();
            }
        }, 1000);
    });

    // Evaluar práctica
    function submitPractice() {
        clearInterval(timerInterval);

        const correctKeywords = document.querySelectorAll(".word[data-keyword='true']");
        const incorrectKeywords = document.querySelectorAll(".word[data-keyword='false']");

        correctCount = selectedWords.filter(word => word.getAttribute("data-keyword") === "true").length;
        incorrectCount = selectedWords.filter(word => word.getAttribute("data-keyword") === "false").length;

        let totalScore = ((correctCount - incorrectCount) / correctKeywords.length) * 100;
        totalScore = totalScore < 0 ? 0 : totalScore;

        resultMessage.textContent = `Has obtenido un puntaje de ${totalScore.toFixed(2)}%.`;

        document.getElementById("results").classList.remove("hidden");
        markCompleteButton.classList.remove("hidden");
    }

    submitButton.addEventListener("click", submitPractice);

    // Permitir volver a intentar
    retryButton.addEventListener("click", () => {
        document.getElementById("results").classList.add("hidden");
        startButton.classList.remove("hidden");
    });

    // Guardar progreso y avanzar al siguiente módulo
    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        window.location.href = "/modulos/modulo4/practica3.html";
    });
});
