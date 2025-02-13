document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-exercise");
    const dot = document.getElementById("moving-dot");
    const evaluationSection = document.getElementById("evaluation");
    const submitBtn = document.getElementById("submit-evaluation");

    let positions = [
        { top: "5%", left: "10%" },  // Top-left
        { top: "5%", left: "80%" },  // Top-right
        { top: "80%", left: "10%" }, // Bottom-left
        { top: "80%", left: "80%" }  // Bottom-right
    ];
    let finalPositionIndex = 0;

    startBtn.addEventListener("click", () => {
        startBtn.style.display = "none";
        dot.style.display = "block";

        let count = 0;
        let moveInterval = setInterval(() => {
            if (count >= positions.length) {
                clearInterval(moveInterval);
                setTimeout(() => {
                    dot.style.display = "none";
                    evaluationSection.classList.remove("hidden");
                }, 500);
            } else {
                dot.style.top = positions[count].top;
                dot.style.left = positions[count].left;
                finalPositionIndex = count;
                count++;
            }
        }, 3000);
    });

    submitBtn.addEventListener("click", () => {
        let selectedOption = document.querySelector('input[name="position"]:checked');
        if (!selectedOption) {
            Swal.fire({
                title: "Por favor, selecciona una respuesta.",
                icon: "warning",
                confirmButtonText: "Intentar de nuevo"
            });
            return;
        }

        let correctAnswer = ["top-left", "top-right", "bottom-left", "bottom-right"][finalPositionIndex];
        if (selectedOption.value === correctAnswer) {
            Swal.fire({
                title: "¡Correcto! 🎉",
                text: "Has completado el ejercicio exitosamente.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                localStorage.setItem("modulo3_evaluacionPractica", "completed");
                window.location.href = "/modulos/modulo4/teoria1.html";
            });
        } else {
            Swal.fire({
                title: "Oops... 😟",
                text: "Tu respuesta es incorrecta. Intenta de nuevo.",
                icon: "error",
                confirmButtonText: "Reintentar"
            });
        }
    });
});
