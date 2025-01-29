document.addEventListener("DOMContentLoaded", () => {
    const concepts = document.querySelectorAll(".concept");
    let selectedConcepts = [];

    // Lógica para seleccionar conceptos (máximo 5)
    concepts.forEach((concept) => {
        concept.addEventListener("click", () => {
            if (concept.classList.contains("selected")) {
                concept.classList.remove("selected");
                selectedConcepts = selectedConcepts.filter((c) => c !== concept);
            } else if (selectedConcepts.length < 5) {
                concept.classList.add("selected");
                selectedConcepts.push(concept);
            } else {
                alert("Solo puedes seleccionar hasta 5 conceptos.");
            }
        });
    });

    document.getElementById("submit-practice").addEventListener("click", () => {
        const correctSelections = selectedConcepts.filter((concept) =>
            concept.getAttribute("data-key") === "true"
        );
        const incorrectSelections = selectedConcepts.filter((concept) =>
            concept.getAttribute("data-key") === "false"
        );

        const totalKeyConcepts = document.querySelectorAll(".concept[data-key='true']").length;
        const correctCount = correctSelections.length;
        const incorrectCount = incorrectSelections.length;

        let totalScore = (correctCount / totalKeyConcepts) * 100;

        if (incorrectCount > 0) {
            totalScore -= incorrectCount * 10; // Penalización por errores
        }

        // Mostrar resultados
        const resultMessage = document.getElementById("result-message");
        const retryButton = document.getElementById("retry");
        const markCompleteButton = document.getElementById("mark-complete");

        if (totalScore >= 80) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con un puntaje de ${Math.max(totalScore, 0)}%.`;
            markCompleteButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            resultMessage.textContent = `Tu puntaje es ${Math.max(totalScore, 0)}%. No alcanzaste el puntaje mínimo requerido. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
            markCompleteButton.classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        selectedConcepts = [];
        concepts.forEach((concept) => concept.classList.remove("selected"));
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
            window.location.href = "/modulos/modulo3/practica3.html";
        });
    });
});
