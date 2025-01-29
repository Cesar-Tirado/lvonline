document.getElementById("theory-evaluation-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
    const totalQuestions = document.querySelectorAll("input[type='radio'][value='correct']").length;

    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    if (correctAnswers >= 4) { // 80% mínimo
        resultMessage.textContent = `¡Felicidades! Obtuviste ${correctAnswers} de ${totalQuestions} correctas. Has aprobado.`;
        markCompleteButton.classList.remove("hidden"); // Mostrar botón de completar
        retryButton.classList.add("hidden"); // Ocultar botón de reintento
    } else {
        resultMessage.textContent = `Obtuviste ${correctAnswers} de ${totalQuestions} correctas. No alcanzaste el mínimo requerido. Intenta nuevamente.`;
        retryButton.classList.remove("hidden"); // Mostrar botón de reintento
        markCompleteButton.classList.add("hidden"); // Ocultar botón de completar
    }

    // Mostrar resultados y ocultar el formulario
    document.getElementById("theory-evaluation-form").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
});

document.getElementById("retry").addEventListener("click", () => {
    document.querySelectorAll("input[type='radio']").forEach((input) => {
        input.checked = false;
    });

    document.getElementById("theory-evaluation-form").classList.remove("hidden");
    document.getElementById("results").classList.add("hidden");
});

document.getElementById("mark-complete").addEventListener("click", () => {
    const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};

    // Guardar progreso del submódulo
    const submodule = window.location.pathname.split("/").pop();
    progress[submodule] = "completed";
    localStorage.setItem("courseProgress", JSON.stringify(progress));

    // Mostrar modal
    const modal = document.getElementById("custom-modal");
    modal.classList.add("visible");

    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = "/modulos/modulo2/evaluacionPractica.html";
    });
});


