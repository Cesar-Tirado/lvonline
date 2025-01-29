document.addEventListener("DOMContentLoaded", () => {
    const showQuestionsButton = document.getElementById("show-questions");
    const questionsContainer = document.getElementById("questions");
    const readingTextContainer = document.getElementById("reading-text");
    const submitAnswersButton = document.getElementById("submit-answers");

    // Mostrar preguntas después de leer
    showQuestionsButton.addEventListener("click", () => {
        readingTextContainer.classList.add("hidden");
        questionsContainer.classList.remove("hidden");
    });

    // Evaluar respuestas
    submitAnswersButton.addEventListener("click", () => {
        const totalQuestions = 3;
        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const score = (correctAnswers / totalQuestions) * 100;

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
            window.location.href = "/modulos/modulo5/evaluacionTeorica.html";
        });
    });
});
