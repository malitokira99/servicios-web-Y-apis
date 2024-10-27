// Añadimos un evento de escucha al formulario con el id "crearUso"
document.getElementById("crearUso").addEventListener("submit", async (e) => {
   e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

   // Imprimimos el valor del campo "user" en la consola
   console.log(e.target.children.user.value);

   // Realizamos una solicitud POST a la API de registro
   const res = await fetch("http://localhost:4000/api/register", {
       method: "POST",
       headers: {
           "Content-Type": "application/json" // Indicamos que el contenido es JSON
       },
       body: JSON.stringify({
           user: e.target.children.user.value, // Obtenemos el valor del campo "user"
           email: e.target.children.email.value, // Obtenemos el valor del campo "email"
           password: e.target.children.password.value, // Obtenemos el valor del campo "password"
       })
   });

   // Si la respuesta no es exitosa, salimos de la función
   if (!res.ok) return;

   // Convertimos la respuesta a JSON
   const resJson = await res.json();

   // Si la respuesta contiene una redirección, redirigimos al usuario
   if (resJson.redirect) {
       window.location.href = resJson.redirect;
   }
});
