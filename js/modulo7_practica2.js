document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-visual-test");
    const trackingArea = document.getElementById("tracking-area");
    const movingBlock = document.getElementById("moving-block");
    const optionsContainer = document.getElementById("options-container");
    const optionsDiv = document.querySelector(".options");
    const submitButton = document.getElementById("submit-answer");
    const results = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    let correctPosition;
    let selectedPosition;

    startButton.addEventListener("click", () => {
        startButton.classList.add("hidden");
        trackingArea.classList.remove("hidden");
        moveBlock();
    });

    function moveBlock() {
        const positions = ["Izquierda", "Centro", "Derecha"];
        correctPosition = positions[Math.floor(Math.random() * positions.length)];
        let animationFrames = 0;

        const interval = setInterval(() => {
            const randomX = Math.floor(Math.random() * (trackingArea.offsetWidth - 50));
            const randomY = Math.floor(Math.random() * (trackingArea.offsetHeight - 50));

            movingBlock.style.left = `${randomX}px`;
            movingBlock.style.top = `${randomY}px`;

            animationFrames++;
            if (animationFrames > 30) {
                clearInterval(interval);
                endAnimation(correctPosition);
            }
        }, 200);
    }

    function endAnimation(position) {
        movingBlock.style.display = "none";
        optionsContainer.classList.remove("hidden");
        generateOptions(position);
    }

    function generateOptions(correctPosition) {
        const positions = ["Izquierda", "Centro", "Derecha"];
        positions.forEach((position) => {
            const button = document.createElement("button");
            button.textContent = position;
            button.classList.add("option");
            button.addEventListener("click", () => {
                document.querySelectorAll(".option").forEach((btn) => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedPosition = position;
                submitButton.classList.remove("hidden");
            });
            optionsDiv.appendChild(button);
        });
    }

    submitButton.addEventListener("click", () => {
        const score = selectedPosition === correctPosition ? 100 : 0;

        trackingArea.classList.add("hidden");
        optionsContainer.classList.add("hidden");
        results.classList.remove("hidden");

        if (score === 100) {
            resultMessage.textContent = `¡Correcto! Identificaste la posición correctamente (${correctPosition}).`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Incorrecto. La posición correcta era ${correctPosition}.`;
            retryButton.classList.remove("hidden");
        }
    });

    retryButton.addEventListener("click", () => {
        trackingArea.classList.remove("hidden");
        movingBlock.style.display = "block";
        results.classList.add("hidden");
        optionsDiv.innerHTML = ""; // Reset options
        submitButton.classList.add("hidden");
        moveBlock();
    });

    markCompleteButton.addEventListener("click", () => {
        const progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
        const submodule = window.location.pathname.split("/").pop();
        progress[submodule] = "completed";
        localStorage.setItem("courseProgress", JSON.stringify(progress));

        const modal = document.getElementById("custom-modal");
        modal.classList.add("visible");

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.classList.remove("visible");
            window.location.href = "/modulos/modulo7/practica3.html";
        });
    });
});
