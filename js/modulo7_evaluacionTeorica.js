document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("theory-evaluation-form");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");
    const modal = document.getElementById("custom-modal");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let correctAnswers = 0;

        if (formData.get("q1") === "correct") correctAnswers++;
        if (formData.get("q2") === "correct") correctAnswers++;
        if (formData.get("q3") === "correct") correctAnswers++;
        if (formData.get("q4") === "correct") correctAnswers++;
        if (formData.get("q5") === "correct") correctAnswers++;

        const score = (correctAnswers / 5) * 100;

        form.classList.add("hidden");
        results.classList.remove("hidden");

        if (score >= 85) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje de ${score}%.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido.`;
            retryButton.classList.remove("hidden");
        }
    });

    retryButton.addEventListener("click", () => {
        form.reset();
        results.classList.add("hidden");
        form.classList.remove("hidden");
    });

    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo7/evaluacionPractica.html";
        });
    });
});
