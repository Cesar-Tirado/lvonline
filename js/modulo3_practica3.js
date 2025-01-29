document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll(".concept");
    const pattern = word => word.length > 7; // Criterio: Palabras con más de 7 caracteres
    let selectedWords = [];

    words.forEach(word => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
            if (word.classList.contains("selected")) {
                selectedWords.push(word.textContent);
            } else {
                selectedWords = selectedWords.filter(w => w !== word.textContent);
            }
        });
    });

    document.getElementById("submit-pattern-analysis").addEventListener("click", () => {
        const correctWords = Array.from(words).filter(word => pattern(word.textContent) && word.dataset.distractor === "false");
        const correctSelections = selectedWords.filter(word => correctWords.map(w => w.textContent).includes(word));
        const incorrectSelections = selectedWords.filter(word => !correctWords.map(w => w.textContent).includes(word));

        const totalCorrect = correctWords.length;
        const correctCount = correctSelections.length;
        const incorrectCount = incorrectSelections.length;

        const score = Math.round((correctCount / totalCorrect) * 100);
        const resultMessage = document.getElementById("result-message");

        if (score >= 70 && incorrectCount === 0) {
            resultMessage.textContent = `¡Felicidades! Identificaste correctamente ${correctCount} de ${totalCorrect} palabras y no seleccionaste incorrectas. Puntaje: ${score}%.`;
            document.getElementById("mark-complete").classList.remove("hidden");
            document.getElementById("retry").classList.add("hidden");
        } else {
            resultMessage.textContent = `Identificaste correctamente ${correctCount} de ${totalCorrect} palabras, pero seleccionaste ${incorrectCount} incorrectas. Puntaje: ${score}%. Intenta nuevamente.`;
            document.getElementById("retry").classList.remove("hidden");
            document.getElementById("mark-complete").classList.add("hidden");
        }

        document.getElementById("results").classList.remove("hidden");
    });

    document.getElementById("retry").addEventListener("click", () => {
        selectedWords = [];
        words.forEach(word => word.classList.remove("selected"));
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
            window.location.href = "/modulos/modulo3/evaluacionTeorica.html";
        });
    });

    document.getElementById("submit-pattern-analysis").addEventListener("click", () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
});
