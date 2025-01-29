document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("theory-evaluation-form");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");
    const modal = document.getElementById("custom-modal");
    const closeModalButton = document.getElementById("close-modal");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const totalQuestions = document.querySelectorAll("input[type='radio'][value='correct']").length;

        const score = (correctAnswers / totalQuestions) * 100;

        if (score >= 80) {
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

    retryButton.addEventListener("click", () => {
        form.reset();
        document.getElementById("results").classList.add("hidden");
    });

    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        modal.classList.add("visible");
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = "/modulos/modulo4/evaluacionPractica.html";
    });
});
