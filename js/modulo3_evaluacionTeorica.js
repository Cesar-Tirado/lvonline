document.getElementById("theory-evaluation-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
    const totalQuestions = document.querySelectorAll("input[type='radio'][value='correct']").length;

    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    if (correctAnswers >= 4) {
        resultMessage.textContent = `¡Felicidades! Obtuviste ${correctAnswers} de ${totalQuestions} correctas. Has aprobado.`;
        markCompleteButton.classList.remove("hidden");
        retryButton.classList.add("hidden");
    } else {
        resultMessage.textContent = `Obtuviste ${correctAnswers} de ${totalQuestions} correctas. No alcanzaste el mínimo requerido. Intenta nuevamente.`;
        retryButton.classList.remove("hidden");
        markCompleteButton.classList.add("hidden");
    }

    document.getElementById("results").classList.remove("hidden");
});

document.getElementById("retry").addEventListener("click", () => {
    document.querySelectorAll("input[type='radio']").forEach((input) => input.checked = false);
    document.getElementById("results").classList.add("hidden");
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
        window.location.href = "/modulos/modulo3/evaluacionPractica.html";
    });
});
