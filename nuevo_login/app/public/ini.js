// Añadimos un evento de escucha al primer botón en el documento
document.getElementsByTagName("button")[0].addEventListener("click", () => {
  // Borramos la cookie 'jwt' estableciendo su fecha de expiración en el pasado
  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  
  // Redirigimos al usuario a la página principal
  document.location.href = "/";
});
