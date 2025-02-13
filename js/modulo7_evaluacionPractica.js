document.addEventListener("DOMContentLoaded", () => {
    let startTime, endTime, wordsRead;
    
    // Iniciar lectura
    document.getElementById("start-reading").addEventListener("click", () => {
        startTime = new Date();
        document.getElementById("reading-container").classList.remove("hidden");
        document.getElementById("start-reading").classList.add("hidden");

        let timer = document.getElementById("timer");
        let seconds = 0;
        let interval = setInterval(() => {
            seconds++;
            timer.textContent = seconds;
        }, 1000);

        document.getElementById("finish-reading").addEventListener("click", () => {
            clearInterval(interval);
            endTime = new Date();
            let timeTaken = (endTime - startTime) / 1000;
            wordsRead = document.getElementById("reading-text").textContent.split(" ").length;
            let wordsPerMinute = Math.round((wordsRead / timeTaken) * 60);

            document.getElementById("reading-container").classList.add("hidden");
            document.getElementById("question-container").classList.remove("hidden");
            
            sessionStorage.setItem("WPM", wordsPerMinute);
        });
    });

    // Evaluación
    let correctAnswers = 0;
    document.querySelectorAll(".answer").forEach(button => {
        button.addEventListener("click", () => {
            if (button.getAttribute("data-correct") === "true") {
                correctAnswers++;
            }
        });
    });

    document.getElementById("submit-evaluation").addEventListener("click", () => {
        let wordsPerMinute = sessionStorage.getItem("WPM") || 0;
        let comprehensionScore = (correctAnswers / 5) * 100;
        let speedScore = Math.min(100, (wordsPerMinute / 250) * 100);  // Máximo 100 puntos

        let finalScore = Math.round((comprehensionScore * 0.7) + (speedScore * 0.3));

        document.getElementById("result-message").textContent = `Leíste a ${wordsPerMinute} PPM. Puntaje final: ${finalScore}%.`;

        document.getElementById("question-container").classList.add("hidden");
        document.getElementById("results").classList.remove("hidden");

        if (finalScore >= 90) {
            document.getElementById("mark-complete").classList.remove("hidden");
        } else {
            document.getElementById("retry").classList.remove("hidden");
        }
    });

    document.getElementById("retry").addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("mark-complete").addEventListener("click", () => {
        window.location.href = "/modulos/modulo8/teoria1.html";
    });
});
