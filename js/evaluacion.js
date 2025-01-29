document.addEventListener("DOMContentLoaded", () => {
    let startTime, endTime;

    // Ejercicio 1: Test de Velocidad
    document.getElementById("start-reading").addEventListener("click", () => {
        startTime = new Date();
        document.getElementById("reading-text").classList.remove("hidden");
    });

    document.getElementById("finish-reading").addEventListener("click", () => {
        endTime = new Date();
        const timeElapsed = (endTime - startTime) / 1000; // Tiempo en segundos
        const text = document.querySelector("#reading-text p").textContent;
        const wordCount = text.split(" ").length;
        const wpm = Math.round((wordCount / timeElapsed) * 60);

        document.getElementById("wpm-result").textContent = `Tu velocidad de lectura es ${wpm} palabras por minuto.`;
        document.getElementById("reading-text").classList.add("hidden");
        document.getElementById("reading-result").classList.remove("hidden");
    });

    // Ejercicio 3: Detección de Distracciones
    document.querySelectorAll(".word").forEach((word) => {
        word.addEventListener("click", () => {
            word.classList.toggle("selected");
        });
    });

    // Botón de enviar evaluación
    document.getElementById("submit-evaluation").addEventListener("click", () => {
        // Validar respuestas y calcular puntaje
        // Implementar lógica combinada para validar ejercicios
        alert("Evaluación enviada");
    });
});
