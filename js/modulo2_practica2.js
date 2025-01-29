document.getElementById("main-ideas-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedIdeas = document.querySelectorAll("input[type='checkbox']:checked");
    const correctIdeas = [2, 3]; // Respuestas correctas
    const correctSelections = Array.from(selectedIdeas).filter((idea) =>
        correctIdeas.includes(parseInt(idea.value))
    );

    const totalCorrect = correctIdeas.length;
    const correctCount = correctSelections.length;

    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    if (correctCount === totalCorrect) {
        resultMessage.textContent = `¡Felicidades! Has identificado todas las ideas principales correctamente.`;
        markCompleteButton.classList.remove("hidden");
        retryButton.classList.add("hidden");
    } else {
        resultMessage.textContent = `Has identificado ${correctCount} de ${totalCorrect} ideas principales correctamente. Intenta nuevamente.`;
        retryButton.classList.remove("hidden");
        markCompleteButton.classList.add("hidden");
    }

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("exercise").classList.add("hidden");
});

document.getElementById("retry").addEventListener("click", () => {
    // Reiniciar el formulario
    document.querySelectorAll("input[type='checkbox']").forEach((input) => {
        input.checked = false;
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

    // Mostrar modal
    const modal = document.getElementById("custom-modal");
    modal.classList.add("visible");

    // Redirigir a la siguiente práctica
    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = "/modulos/modulo2/practica3.html";
    });
});

document.getElementById("submit-evaluation").addEventListener("click", () => {
    // Moverse al fondo de la página suavemente
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});
