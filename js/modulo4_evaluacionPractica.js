document.addEventListener("DOMContentLoaded", () => {
    const trackingArea = document.getElementById("tracking-area");
    const movingPoint = document.getElementById("moving-point");
    const trackingButtons = document.getElementById("tracking-buttons");
    const startTrackingButton = document.getElementById("start-tracking");
    const resultMessage = document.getElementById("result-message");
    const markCompleteButton = document.getElementById("mark-complete");
    const retryButton = document.getElementById("retry");
    const aciertosCounter = document.createElement("p");

    let correctAttempts = 0;
    let currentNumber = 0;

    aciertosCounter.id = "aciertos-counter";
    aciertosCounter.textContent = "Aciertos: 0";
    trackingArea.insertAdjacentElement("afterend", aciertosCounter); // Agrega el contador debajo del área

    function movePoint() {
        let randomX = Math.random() * (trackingArea.offsetWidth - 20);
        let randomY = Math.random() * (trackingArea.offsetHeight - 20);
        movingPoint.style.left = `${randomX}px`;
        movingPoint.style.top = `${randomY}px`;
    }

    function startExercise() {
        startTrackingButton.disabled = true;
        trackingButtons.classList.add("hidden");
        movingPoint.style.display = "block";

        movePoint();

        let interval = setInterval(movePoint, 300); // Mueve más rápido

        setTimeout(() => {
            clearInterval(interval);
            currentNumber = Math.ceil(Math.random() * 4);
            movingPoint.textContent = currentNumber;

            setTimeout(() => {
                movingPoint.textContent = "";
                trackingButtons.classList.remove("hidden");
            }, 500); // Número visible solo por 1 segundo
        }, 4000);
    }

    startTrackingButton.addEventListener("click", startExercise);

    document.querySelectorAll(".tracking-button").forEach(button => {
        button.addEventListener("click", () => {
            const selectedValue = parseInt(button.getAttribute("data-value"));

            if (selectedValue === currentNumber) {
                correctAttempts++;
                aciertosCounter.textContent = `Aciertos: ${correctAttempts}`;
            }

            trackingButtons.classList.add("hidden");
            movingPoint.textContent = "";

            if (correctAttempts >= 3) {
                resultMessage.textContent = `¡Felicidades! Has acertado 3 veces. Puedes continuar.`;
                document.getElementById("results").classList.remove("hidden");
                markCompleteButton.classList.remove("hidden");
                retryButton.classList.add("hidden");
            } else {
                setTimeout(startExercise, 1000);
            }
        });
    });
     // 🚀 Redirigir al siguiente módulo cuando se haga clic en "Continuar"
     markCompleteButton.addEventListener("click", () => {
        window.location.href = "/modulos/modulo5/teoria1.html"; // Reemplaza con la URL correcta
    });
});
