document.getElementById("mark-complete").addEventListener("click", () => {
    const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    const currentPath = window.location.pathname;
    const submodule = currentPath.split("/").pop();

    // Marcar submódulo como completado
    progress[submodule] = "completed";
    localStorage.setItem("courseProgress", JSON.stringify(progress));

    // Calcular la siguiente teoría
    const moduleBasePath = "/modulos/modulo4/";
    const currentNumber = parseInt(submodule.match(/\d+/)); // Extraer el número de teoría (1, 2, etc.)
    const nextNumber = currentNumber + 1;

    const nextPath = `${moduleBasePath}teoria${nextNumber}.html`;

    // Mostrar modal
    const modal = document.getElementById("custom-modal");
    modal.classList.add("visible");

    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = nextPath; // Redirigir a la siguiente teoría
    });
});
