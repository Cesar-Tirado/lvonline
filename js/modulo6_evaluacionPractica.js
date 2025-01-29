document.addEventListener("DOMContentLoaded", () => {
    // Ejercicio 1: Selección de palabras clave
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

    // Ejercicio 2: Arrastra y suelta
    const draggables = document.querySelectorAll(".draggable");
    const dropTargets = document.querySelectorAll(".drop-target");
    const matches = new Map();

    draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging");
        });

        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging");
        });
    });

    dropTargets.forEach((target) => {
        target.addEventListener("dragover", (e) => e.preventDefault());
        target.addEventListener("drop", () => {
            const dragging = document.querySelector(".dragging");
            if (dragging) {
                matches.set(target, dragging);
                target.textContent = dragging.textContent;
                target.classList.add("filled");
            }
        });
    });

    // Enviar evaluación
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        const correctSelections = selectedWords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        ).length;
        const exercise1Score = (correctSelections / keywords.length) * 50;

        let exercise2Score = 0;
        matches.forEach((dragged, target) => {
            if (dragged.id === target.dataset.answer) {
                exercise2Score += 50 / draggables.length;
            }
        });

        const totalScore = exercise1Score + exercise2Score;

        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 85) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje total de ${totalScore.toFixed(2)}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${totalScore.toFixed(2)}%. No alcanzaste el puntaje mínimo requerido.`;
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
            window.location.href = "/modulos/modulo7/teoria1.html";
        });
    });
});
