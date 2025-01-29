document.addEventListener("DOMContentLoaded", () => {
    const distractors = document.querySelectorAll(".word[data-distractor='true']");
    const allWords = document.querySelectorAll(".word");

    // Marcar palabras seleccionadas
    allWords.forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
        });
    });

    document.getElementById("submit").addEventListener("click", () => {
        const selectedWords = document.querySelectorAll(".word.selected");
        const correctSelections = Array.from(selectedWords).filter((word) =>
            word.getAttribute("data-distractor") === "true"
        );

        const isCorrect = correctSelections.length === distractors.length &&
                          selectedWords.length === distractors.length;

        const resultMessage = document.getElementById("result-message");

        if (isCorrect) {
            resultMessage.textContent = "¡Correcto! Identificaste todas las distracciones.";
        } else {
            resultMessage.textContent = "Algunas respuestas son incorrectas. Vuelve a intentarlo.";
        }

        // Mostrar resultados
        document.getElementById("exercise").classList.add("hidden");
        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        // Reiniciar ejercicio
        allWords.forEach((word) => {
            word.classList.remove("selected");
        });

        document.getElementById("exercise").classList.remove("hidden");
        document.getElementById("results").classList.add("hidden");
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    
        // Guardar progreso del submódulo
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));
    
        // Mostrar el modal personalizado
        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");
    
        // Agregar evento para cerrar el modal y redirigir
        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo1/evaluacionTeorica.html";
        });
    });
    
});
