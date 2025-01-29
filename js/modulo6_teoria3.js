document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mark-complete").addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();

        // Marcar submódulo como completado
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        // Mostrar modal
        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo6/teoria4.html";
        });
    });
});
