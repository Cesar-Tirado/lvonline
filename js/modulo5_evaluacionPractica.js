document.addEventListener("DOMContentLoaded", () => {
    const startExerciseButton = document.getElementById("start-exercise");
    const phraseContainer = document.getElementById("phrase-container");
    const phraseDisplay = document.getElementById("phrase-display");
    const questionsContainer = document.getElementById("questions-container");
    const questionText = document.getElementById("question-text");
    const answerOptions = document.querySelectorAll(".answer-option");
    const submitButton = document.getElementById("submit-evaluation");
    const resultsContainer = document.getElementById("results");
    const resultMessage = document.getElementById("result-message");
    const retryButton = document.getElementById("retry");
    const markCompleteButton = document.getElementById("mark-complete");

    let correctAnswers = 0;
    let currentPhraseIndex = 0;
    let currentQuestionIndex = 0;

    const phrases = [
        "La lectura veloz permite absorber información más rápido.",
        "Eliminando la subvocalización, puedes leer a mayor velocidad.",
        "Usar un lápiz como guía visual mejora la concentración.",
        "Leer en bloques amplía el campo visual y reduce pausas innecesarias.",
        "La práctica constante es clave para mejorar la velocidad de lectura."
    ];

    const questions = [
        {
            question: "¿Cuál es una técnica para leer más rápido?",
            options: ["Subvocalizar más", "Usar guías visuales", "Leer más lento", "Omitir palabras"],
            correct: "Usar guías visuales"
        },
        {
            question: "¿Por qué es importante leer en bloques?",
            options: ["Para reducir pausas", "Para aumentar distracciones", "Para leer menos", "Para repetir frases"],
            correct: "Para reducir pausas"
        },
        {
            question: "¿Cómo se puede mejorar la velocidad de lectura?",
            options: ["Practicando", "Leyendo menos", "Haciendo pausas largas", "Hablando en voz alta"],
            correct: "Practicando"
        },
        {
            question: "¿Qué técnica reduce la subvocalización?",
            options: ["Leer en voz alta", "Usar un lápiz como guía", "Repetir cada palabra", "Cerrar los ojos"],
            correct: "Usar un lápiz como guía"
        }
    ];

    startExerciseButton.addEventListener("click", () => {
        phraseContainer.classList.remove("hidden");
        startExerciseButton.classList.add("hidden");
        showNextPhrase();
    });

    function showNextPhrase() {
        if (currentPhraseIndex < phrases.length) {
            phraseDisplay.textContent = phrases[currentPhraseIndex];
            currentPhraseIndex++;
            setTimeout(showNextPhrase, 1500);
        } else {
            phraseContainer.classList.add("hidden");
            showQuestions();
        }
    }

    function showQuestions() {
        questionsContainer.classList.remove("hidden");
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionText.textContent = questions[currentQuestionIndex].question;
            answerOptions.forEach((button, index) => {
                button.textContent = questions[currentQuestionIndex].options[index];
                button.addEventListener("click", checkAnswer);
            });
        } else {
            submitButton.classList.remove("hidden");
        }
    }

    function checkAnswer(event) {
        if (event.target.textContent === questions[currentQuestionIndex].correct) {
            correctAnswers++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    submitButton.addEventListener("click", () => {
        resultsContainer.classList.remove("hidden");
        if (correctAnswers >= 3) {
            resultMessage.textContent = `¡Felicidades! Has aprobado con ${correctAnswers} respuestas correctas.`;
            markCompleteButton.classList.remove("hidden");
        } else {
            resultMessage.textContent = `Has obtenido ${correctAnswers} respuestas correctas. Intenta nuevamente.`;
            retryButton.classList.remove("hidden");
        }
    });

    markCompleteButton.addEventListener("click", () => {
        window.location.href = "/modulos/modulo6/teoria1.html";
    });

    retryButton.addEventListener("click", () => {
        window.location.reload();
    });
});
