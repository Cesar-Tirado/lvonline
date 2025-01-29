const users = {
    "usuario1": "12345",
    "usuario2": "abcde"
};

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "curso.html"; // Redirigir al curso
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        errorMessage.style.display = "block";
    }
});

