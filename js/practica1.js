let startTime, endTime;

document.getElementById("start-test").addEventListener("click", () => {
    // Mostrar el texto y ocultar el botón de inicio
    document.getElementById("test-text").classList.remove("hidden");
    document.getElementById("start-test").classList.add("hidden");

    // Registrar el tiempo de inicio
    startTime = new Date();
});

document.getElementById("finish-test").addEventListener("click", () => {
    // Registrar el tiempo de finalización
    endTime = new Date();

    // Calcular el tiempo transcurrido en segundos
    const timeElapsed = (endTime - startTime) / 1000;

    // Calcular las palabras por minuto (WPM)
    const text = document.querySelector("#test-text p").textContent;
    const wordCount = text.split(" ").length;
    const wpm = Math.round((wordCount / timeElapsed) * 60);

    // Mostrar el resultado
    const resultMessage = document.getElementById("result-message");
    resultMessage.textContent = `Has leído a una velocidad de ${wpm} palabras por minuto.`;

    document.getElementById("test-text").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
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
        window.location.href = "/modulos/modulo1/practica2.html";
    });
});
