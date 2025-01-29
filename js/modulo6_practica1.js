document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("practice-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const totalQuestions = document.querySelectorAll("input[value='correct']").length;

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (correctAnswers === totalQuestions) {
            resultMessage.textContent = `¡Felicidades! Has obtenido ${correctAnswers} de ${totalQuestions} correctas.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${correctAnswers} de ${totalQuestions} correctas. Inténtalo de nuevo.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        document.getElementById("practice-form").reset();
        document.getElementById("results").classList.add("hidden");
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        window.location.href = "/modulos/modulo6/practica2.html";
    });
});
