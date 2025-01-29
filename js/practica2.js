document.getElementById("main-ideas-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const correctAnswers = ["2", "3"]; // Respuestas correctas
    const selectedAnswers = Array.from(document.querySelectorAll("input[name='idea']:checked"))
        .map((checkbox) => checkbox.value);

    // Verificar si todas las respuestas correctas están seleccionadas
    const isCorrect = correctAnswers.every((answer) => selectedAnswers.includes(answer)) &&
                      selectedAnswers.every((answer) => correctAnswers.includes(answer));

    const resultMessage = document.getElementById("result-message");

    if (isCorrect) {
        resultMessage.textContent = "¡Correcto! Identificaste correctamente las ideas principales.";
    } else {
        resultMessage.textContent = "Algunas respuestas son incorrectas. Vuelve a intentarlo.";
    }

    // Mostrar resultados
    document.getElementById("exercise").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
});

document.getElementById("retry").addEventListener("click", () => {
    // Reiniciar el ejercicio
    document.querySelectorAll("input[name='idea']").forEach((checkbox) => {
        checkbox.checked = false;
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
        window.location.href = "/modulos/modulo1/practica3.html";
    });
});

