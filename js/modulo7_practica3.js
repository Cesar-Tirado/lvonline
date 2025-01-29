document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-reading");
    const finishButton = document.getElementById("finish-reading");
    const textArea = document.getElementById("text-area");
    const questionsArea = document.getElementById("questions-area");
    const comprehensionForm = document.getElementById("comprehension-form");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");
    let startTime, endTime;

    startButton.addEventListener("click", () => {
        textArea.classList.remove("hidden");
        startButton.classList.add("hidden");
        startTime = new Date();
    });

    finishButton.addEventListener("click", () => {
        endTime = new Date();
        const readingTime = Math.round((endTime - startTime) / 1000); // Tiempo en segundos
        textArea.classList.add("hidden");
        questionsArea.classList.remove("hidden");

        console.log(`Tiempo de lectura: ${readingTime} segundos`);
    });

    comprehensionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(comprehensionForm);
        let correctAnswers = 0;

        if (formData.get("q1") === "correct") correctAnswers++;
        if (formData.get("q2") === "correct") correctAnswers++;
        if (formData.get("q3") === "correct") correctAnswers++;

        const totalQuestions = 3;
        const score = (correctAnswers / totalQuestions) * 100;

        questionsArea.classList.add("hidden");
        results.classList.remove("hidden");

        if (score >= 85) {
            resultMessage.textContent = `¡Excelente! Has aprobado con un puntaje de ${score}%.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${score}%. No alcanzaste el puntaje mínimo requerido.`;
            retryButton.classList.remove("hidden");
        }
    });

    retryButton.addEventListener("click", () => {
        comprehensionForm.reset();
        results.classList.add("hidden");
        questionsArea.classList.remove("hidden");
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
            window.location.href = "/modulos/modulo7/evaluacionTeorica.html";
        });
    });
});
