document.addEventListener("DOMContentLoaded", () => {
    const evaluationForm = document.getElementById("theory-evaluation-form");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    evaluationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const totalQuestions = 5;
        const score = (correctAnswers / totalQuestions) * 100;

        if (score >= 85) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${score}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
        evaluationForm.classList.add("hidden");
    });

    retryButton.addEventListener("click", () => {
        evaluationForm.reset();
        document.getElementById("results").classList.add("hidden");
        evaluationForm.classList.remove("hidden");
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
            window.location.href = "/modulos/modulo5/evaluacionPractica.html";
        });
    });
});
