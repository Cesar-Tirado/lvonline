document.getElementById("mark-complete").addEventListener("click", () => {
    const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    const currentPath = window.location.pathname;
    const submodule = currentPath.split("/").pop();

    // Marcar submódulo como completado
    progress[submodule] = "completed";
    localStorage.setItem("courseProgress", JSON.stringify(progress));

    // Calcular la siguiente sección
    const moduleBasePath = "/modulos/modulo7/";
    const nextPath = `${moduleBasePath}practica1.html`;

    // Mostrar modal
    const modal = document.getElementById("custom-modal");
    modal.classList.add("visible");

    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.remove("visible");
        window.location.href = nextPath; // Redirigir a la primera práctica
    });
});
