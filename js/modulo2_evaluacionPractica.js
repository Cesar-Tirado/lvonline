document.addEventListener("DOMContentLoaded", () => {
    const keywords = document.querySelectorAll(".word[data-keyword='true']");
    const words = document.querySelectorAll(".word");
    let selectedKeywords = [];

    // Ejercicio: Identificación de Palabras Clave
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

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        const correctSelections = selectedKeywords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        );
        const incorrectSelections = selectedKeywords.filter((word) =>
            word.getAttribute("data-keyword") === "false"
        );

        const totalCorrect = keywords.length;
        const correctCount = correctSelections.length;
        const incorrectCount = incorrectSelections.length;

        let score = 0;

        if (correctCount === totalCorrect && incorrectCount === 0) {
            score = 100; // 100% si todo es correcto
        } else {
            score = Math.max(0, ((correctCount - incorrectCount) / totalCorrect) * 100);
        }

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (score >= 75) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${Math.round(score)}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${Math.round(score)}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        selectedKeywords = [];
        words.forEach((word) => word.classList.remove("selected"));
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
            window.location.href = "/modulos/modulo3/teoria1.html";
        });
    });

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        // Moverse al fondo de la página suavemente
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });

    
});
