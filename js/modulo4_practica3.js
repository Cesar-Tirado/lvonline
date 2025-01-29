document.addEventListener("DOMContentLoaded", () => {
    const wordContainer = document.getElementById("word-container");
    const currentWordElement = document.getElementById("current-word");
    const optionsContainer = document.getElementById("options");
    const startButton = document.getElementById("start-practice");
    const submitButton = document.getElementById("submit-practice");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");
    const modal = document.getElementById("custom-modal");
    const closeModalButton = document.getElementById("close-modal");

    const wordsToShow = ["lectura", "veloz", "subvocalización", "bloques", "rápido"];
    const distractors = ["piedra", "cielo", "árbol", "hoja", "pantalla"];
    const allWords = [...wordsToShow, ...distractors].sort(() => Math.random() - 0.5);
    let shownWords = [];

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        wordContainer.classList.remove("hidden");

        let index = 0;
        const interval = setInterval(() => {
            if (index < wordsToShow.length) {
                currentWordElement.textContent = wordsToShow[index];
                shownWords.push(wordsToShow[index]);
                index++;
            } else {
                clearInterval(interval);
                wordContainer.classList.add("hidden");
                submitButton.classList.remove("hidden");

                // Generar opciones
                optionsContainer.innerHTML = "";
                allWords.forEach((word) => {
                    const wordButton = document.createElement("button");
                    wordButton.textContent = word;
                    wordButton.classList.add("word-option");
                    wordButton.addEventListener("click", () => {
                        wordButton.classList.toggle("selected");
                    });
                    optionsContainer.appendChild(wordButton);
                });
                document.getElementById("word-bank").classList.remove("hidden");
            }
        }, 1000); // Aparece una palabra cada 1 segundo
    });

    submitButton.addEventListener("click", () => {
        const selectedWords = Array.from(
            document.querySelectorAll(".word-option.selected")
        ).map((btn) => btn.textContent);

        const correctSelections = selectedWords.filter((word) =>
            shownWords.includes(word)
        );
        const incorrectSelections = selectedWords.filter(
            (word) => !shownWords.includes(word)
        );

        const totalScore =
            (correctSelections.length / wordsToShow.length) * 100 -
            incorrectSelections.length * 5; // Penalización por selecciones incorrectas

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
        submitButton.classList.add("hidden");
    });

    retryButton.addEventListener("click", () => {
        shownWords = [];
        wordContainer.classList.add("hidden");
        submitButton.classList.add("hidden");
        startButton.classList.remove("hidden");
        optionsContainer.innerHTML = "";
        document.getElementById("results").classList.add("hidden");
    });

    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        modal.classList.add("visible");
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = "/modulos/modulo4/evaluacionTeorica.html";
    });
});
