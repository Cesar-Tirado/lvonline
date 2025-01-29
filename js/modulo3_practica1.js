document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll(".word");
    let selectedWords = [];

    // Evento para seleccionar palabras clave
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

    document.getElementById("submit-practice").addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) =>
            word.getAttribute("data-key") === "true"
        );
        const incorrectSelections = selectedWords.filter((word) =>
            word.getAttribute("data-key") === "false"
        );

        const totalKeyWords = document.querySelectorAll(".word[data-key='true']").length;
        const correctCount = correctSelections.length;
        const incorrectCount = incorrectSelections.length;

        let totalScore = (correctCount / totalKeyWords) * 100;

        if (incorrectCount > 0) {
            totalScore -= incorrectCount * 5; // Penalización por selecciones incorrectas
        }

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 80) {
            resultMessage.textContent = `¡Felicidades! Has obtenido un puntaje de ${Math.max(totalScore, 0)}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Tu puntaje es ${Math.max(totalScore, 0)}%. No alcanzaste el mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        selectedWords = [];
        words.forEach((word) => word.classList.remove("selected"));
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
            window.location.href = "/modulos/modulo3/practica2.html";
        });
    });
});
