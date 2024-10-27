
// Seleccionamos el primer elemento con la clase "error"
const mensajeError = document.getElementsByClassName("error")[0];

// Añadimos un evento de escucha al formulario con el id "autenticador"
document.getElementById("autenticador").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Obtenemos los valores de usuario y contraseña del formulario
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;

    // Realizamos una solicitud POST a la API de login
    const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indicamos que el contenido es JSON
        },
        body: JSON.stringify({ user, password }) // Enviamos los datos de usuario y contraseña en el cuerpo de la solicitud
    });

    // Si la respuesta no es exitosa, mostramos el mensaje de error
    if (!res.ok) return mensajeError.classList.toggle("escondido", false);

    // Convertimos la respuesta a JSON
    const resJson = await res.json();

    // Si la respuesta contiene una redirección, redirigimos al usuario
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
});
