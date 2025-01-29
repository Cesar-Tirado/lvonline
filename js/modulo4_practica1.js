document.addEventListener("DOMContentLoaded", () => {
    // Ejercicio 1: Escaneo de información
    const exercise1Form = document.getElementById("exercise1-form");

    // Ejercicio 2: Seguimiento Visual
    const movingPoint = document.getElementById("moving-point");
    const trackingArea = document.getElementById("tracking-area");

    let direction = 1;
    let position = 0;

    function movePoint() {
        position += direction * 5; // Velocidad del movimiento
        if (position >= trackingArea.offsetWidth - movingPoint.offsetWidth || position <= 0) {
            direction *= -1; // Cambiar dirección
        }
        movingPoint.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(movePoint);
    }
    movePoint();

    document.getElementById("submit-practice").addEventListener("click", () => {
        const correctAnswers = document.querySelectorAll("input[value='correct']:checked").length;
        const totalQuestions = document.querySelectorAll("input[value='correct']").length;

        const exercise1Score = (correctAnswers / totalQuestions) * 50;
        const exercise2Score = 50; // Dado que es seguimiento, se da por completado.

        const totalScore = exercise1Score + exercise2Score;

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 85) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${totalScore}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${totalScore}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    // Modal y progreso
    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo4/practica2.html";
        });
    });
});
