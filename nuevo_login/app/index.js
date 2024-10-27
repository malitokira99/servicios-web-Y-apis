// Importamos los módulos necesarios
import express from "express";
import cookieParser from "cookie-parser";

// Importamos path y dirname para manejar rutas de archivos
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

// Configuramos __dirname para usar rutas relativas
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Importamos métodos de los controladores y middleware
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./midlewares/authorization.js";

// Creamos una instancia de la aplicación Express
const app = express();

// Configuramos el puerto del servidor
app.set("port", 4000);

// Iniciamos el servidor y escuchamos en el puerto configurado
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

// Configuraciones de middleware
app.use(express.static(__dirname + "/public")); // Servir archivos estáticos
app.use(express.json()); // Parsear JSON
app.use(cookieParser()); // Parsear cookies

// Definición de rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/inicio", authorization.soloInicio, (req, res) => res.sendFile(__dirname + "/pages/inicio.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);
