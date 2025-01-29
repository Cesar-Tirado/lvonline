document.addEventListener("DOMContentLoaded", () => {
    // Variables del ejercicio de seguimiento ocular
    const trackingArea = document.getElementById("tracking-area");
    const movingPoint = document.getElementById("moving-point");
    const trackingButtons = document.getElementById("tracking-buttons");
    const startTrackingButton = document.getElementById("start-tracking");
    const trackingButtonElements = document.querySelectorAll(".tracking-button");
    let trackingScore = 0;

    startTrackingButton.addEventListener("click", () => {
        startTrackingButton.disabled = true; // Deshabilitar el botón para evitar reinicios
        trackingButtons.classList.add("hidden");
        let randomX, randomY;

        // Movimiento aleatorio del punto
        const movePoint = () => {
            randomX = Math.random() * (trackingArea.offsetWidth - 20);
            randomY = Math.random() * (trackingArea.offsetHeight - 20);

            movingPoint.style.left = `${randomX}px`;
            movingPoint.style.top = `${randomY}px`;
        };

        // Repetir el movimiento cada 500ms durante 5 segundos
        const interval = setInterval(movePoint, 500);
        const randomNumber = Math.ceil(Math.random() * 4);

        setTimeout(() => {
            clearInterval(interval); // Detener el movimiento
            movingPoint.textContent = randomNumber; // Mostrar número
            trackingButtons.classList.remove("hidden"); // Mostrar botones
        }, 5000);

        // Evaluar respuesta
        trackingButtonElements.forEach((button) => {
            button.addEventListener("click", () => {
                const selectedValue = parseInt(button.getAttribute("data-value"));
                if (selectedValue === randomNumber) {
                    trackingScore = 50; // Asignar puntuación si es correcto
                }
                trackingButtons.classList.add("hidden"); // Ocultar botones
                movingPoint.textContent = ""; // Limpiar número
                startTrackingButton.disabled = false; // Habilitar reinicio
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Variables del ejercicio de palabras clave
    const words = document.querySelectorAll(".word");
    const distractors = document.querySelectorAll(".word[data-keyword='true']");
    let selectedWords = [];

    words.forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
            if (word.classList.contains("selected")) {
                selectedWords.push(word);
            } else {
                selectedWords = selectedWords.filter((w) => w !== word);
            }
        });
    });

    // Validar el ejercicio
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        );
        const incorrectSelections = selectedWords.filter((word) =>
            word.getAttribute("data-keyword") === "false"
        );

        const totalKeywords = distractors.length;
        const exercise2Score = Math.max(
            0,
            (correctSelections.length / totalKeywords) * 50 -
                (incorrectSelections.length * 10)
        );

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (exercise2Score >= 40) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con ${exercise2Score}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${exercise2Score}%. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    // Botón de reintento
    document.getElementById("retry").addEventListener("click", () => {
        selectedWords = [];
        words.forEach((word) => word.classList.remove("selected"));
        document.getElementById("results").classList.add("hidden");
    });
});
