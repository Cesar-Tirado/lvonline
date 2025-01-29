document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll(".word");
    const keywords = document.querySelectorAll(".word[data-keyword='true']");
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

    const patternWords = document.querySelectorAll("#pattern .word");
    const matchWords = document.querySelectorAll("#text-to-match span");
    let correctMatches = 0;

    matchWords.forEach((word) => {
        word.addEventListener("click", () => {
            if (patternWords.textContent.includes(word.textContent)) {
                word.classList.add("selected");
                correctMatches++;
            }
        });
    });

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        );
        const totalKeywords = keywords.length;

        const exercise1Score = (correctSelections.length / totalKeywords) * 50;
        const exercise2Score = (correctMatches / patternWords.length) * 50;

        const totalScore = exercise1Score + exercise2Score;

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 90) {
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

    document.getElementById("retry").addEventListener("click", () => {
        words.forEach((word) => word.classList.remove("selected"));
        matchWords.forEach((word) => word.classList.remove("selected"));
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
            window.location.href = "/modulos/modulo8/teoria1.html";
        });
    });
});
