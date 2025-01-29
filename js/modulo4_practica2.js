document.addEventListener("DOMContentLoaded", () => {
    // Ejercicio 1: Identificación de palabras clave
    const words = document.querySelectorAll(".word");
    let selectedKeywords = [];

    words.forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
            if (word.classList.contains("selected")) {
                selectedKeywords.push(word);
            } else {
                selectedKeywords = selectedKeywords.filter((w) => w !== word);
            }
        });
    });

    // Ejercicio 2: Seguimiento visual por bloques
    const textBlocks = document.querySelectorAll(".block");
    const startButton = document.getElementById("start-blocks");

    let currentBlockIndex = 0;
    let interval = null;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        textBlocks.forEach((block) => block.classList.add("hidden")); // Asegurarse de que todos los bloques estén ocultos
        textBlocks[currentBlockIndex].classList.remove("hidden"); // Mostrar el primer bloque

        interval = setInterval(() => {
            textBlocks[currentBlockIndex].classList.add("hidden"); // Ocultar el bloque actual
            currentBlockIndex++;

            if (currentBlockIndex < textBlocks.length) {
                textBlocks[currentBlockIndex].classList.remove("hidden"); // Mostrar el siguiente bloque
            } else {
                clearInterval(interval); // Detener el ciclo cuando se muestren todos los bloques
                startButton.textContent = "Reiniciar Ejercicio";
                startButton.classList.remove("hidden");
                currentBlockIndex = 0; // Reiniciar índice
            }
        }, 3000); // Cambiar bloques cada 3 segundos
    });

    document.getElementById("submit-practice").addEventListener("click", () => {
        const correctKeywords = selectedKeywords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        );
        const totalKeywords = document.querySelectorAll(".word[data-keyword='true']").length;

        const exercise1Score = (correctKeywords.length / totalKeywords) * 50;
        const exercise2Score = currentBlockIndex === textBlocks.length ? 50 : 0;

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
            window.location.href = "/modulos/modulo4/practica3.html";
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const textBlocks = document.querySelectorAll(".block");
    const startButton = document.getElementById("start-blocks");

    let currentBlockIndex = 0;
    let interval = null;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        textBlocks.forEach((block) => block.classList.remove("visible")); // Asegúrate de ocultar todo inicialmente
        textBlocks[currentBlockIndex].classList.add("visible"); // Muestra el primer bloque

        interval = setInterval(() => {
            textBlocks[currentBlockIndex].classList.remove("visible"); // Ocultar el bloque actual
            currentBlockIndex++;

            if (currentBlockIndex < textBlocks.length) {
                textBlocks[currentBlockIndex].classList.add("visible"); // Mostrar el siguiente bloque
            } else {
                clearInterval(interval); // Detener el ciclo al final
                startButton.textContent = "Reiniciar Ejercicio";
                startButton.classList.remove("hidden");
                currentBlockIndex = 0; // Reiniciar índice
            }
        }, 3000); // Cambia bloques cada 3 segundos
    });
});
