document.addEventListener("DOMContentLoaded", () => {
    // Ejercicio 1: Selección de palabras clave
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

    // Ejercicio 2: Drag & Drop
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
        target.addEventListener("dragover", (e) => {
            e.preventDefault();
            target.classList.add("drag-over");
        });

        target.addEventListener("dragleave", () => {
            target.classList.remove("drag-over");
        });

        target.addEventListener("drop", (e) => {
            e.preventDefault();
            target.classList.remove("drag-over");

            const dragging = document.querySelector(".dragging");
            if (dragging) {
                if (!target.classList.contains("filled")) {
                    target.textContent = dragging.textContent;
                    matches.set(target, dragging);
                    target.classList.add("filled");
                } else {
                    alert("Este espacio ya está lleno. Intenta con otro.");
                }
            }
        });
    });

    // Enviar evaluación
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        // Ejercicio 1: Calcular puntaje
        const correctSelections = selectedWords.filter((word) =>
            word.getAttribute("data-keyword") === "true"
        );
        const totalKeywords = distractors.length;
        const exercise1Score = (correctSelections.length / totalKeywords) * 50;

        // Ejercicio 2: Calcular puntaje
        let exercise2Score = 0;
        matches.forEach((dragged, target) => {
            if (dragged.id === target.dataset.answer) {
                exercise2Score += 50 / draggables.length;
            }
        });

        // Puntaje total
        const totalScore = exercise1Score + exercise2Score;

        // Mostrar resultados
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
            window.location.href = "/modulos/modulo4/teoria1.html";
        });
    });

    // Scroll al fondo
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
});
