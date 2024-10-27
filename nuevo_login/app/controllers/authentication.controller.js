// Importamos bcryptjs para encriptar contraseñas
import bcryptjs from "bcryptjs";

// Importamos jsonwebtoken para manejar tokens JWT
import jsonwebtoken from "jsonwebtoken";

// Importamos dotenv para manejar variables de entorno
import dotenv from "dotenv";
dotenv.config(); // Cargamos las variables de entorno

// Definimos un array de usuarios con un usuario de ejemplo
export const usuarios = [{
    user: "a",
    email: "a@a.com",
    password: "$2a$05$2NgX4gYVaR16VCppOkJNIeXMYwNdbIVWBfVSe.Tf7Ln0QLV9QfTNO" // Contraseña encriptada
}];

// Función asincrónica para el login
async function login(req, res) {
    console.log(req.body); // Imprimimos el cuerpo de la solicitud en la consola
    const user = req.body.user; // Obtenemos el usuario del cuerpo de la solicitud
    const password = req.body.password; // Obtenemos la contraseña del cuerpo de la solicitud

    // Verificamos si el usuario o la contraseña están vacíos
    if (!user || !password) {
        return res.status(400).send({ status: "error", message: "los campos estan incompletos" });
    }

    // Buscamos el usuario en el array de usuarios
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);

    // Si el usuario no existe, enviamos un error
    if (!usuarioAResvisar) {
        return res.status(400).send({ status: "Error", message: "error durante la autenticacion" });
    }

    // Comparamos la contraseña ingresada con la contraseña encriptada
    const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);

    // Si la contraseña es incorrecta, enviamos un error
    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Error durante login" });
    }

    // Generamos un token JWT
    const token = jsonwebtoken.sign(
        { user: usuarioAResvisar.user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Configuramos las opciones de la cookie
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
        path: "/"
    };

    // Enviamos la cookie con el token al cliente
    res.cookie("jwt", token, cookieOption);

    // Enviamos una respuesta de éxito
    res.send({ status: "ok", message: "usuario logeado", redirect: "/inicio" });
}

// Función asincrónica para el registro
async function register(req, res) {
    console.log(req.body); // Imprimimos el cuerpo de la solicitud en la consola
    const user = req.body.user; // Obtenemos el usuario del cuerpo de la solicitud
    const password = req.body.password; // Obtenemos la contraseña del cuerpo de la solicitud
    const email = req.body.email; // Obtenemos el email del cuerpo de la solicitud

    // Verificamos si el usuario, la contraseña o el email están vacíos
    if (!user || !password || !email) {
        return res.status(400).send({ status: "error", message: "los campos estan incompletos" });
    }

    // Buscamos si el usuario ya existe en el array de usuarios
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);

    // Si el usuario ya existe, enviamos un error
    if (usuarioAResvisar) {
        return res.status(400).send({ status: "error", message: "este usuario ya existe" });
    }

    // Generamos un salt para encriptar la contraseña
    const salt = await bcryptjs.genSalt(5);

    // Encriptamos la contraseña
    const hashPassword = await bcryptjs.hash(password, salt);

    // Creamos un nuevo usuario con la contraseña encriptada
    const nuevoUsuario = {
        user,
        email,
        password: hashPassword
    };

    // Agregamos el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);
    console.log(usuarios); // Imprimimos el array de usuarios en la consola

    // Enviamos una respuesta de éxito
    return res.status(201).send({ status: "ok", message: `usuario ${nuevoUsuario.user} agregado`, redirect: "/" });
}

// Exportamos los métodos de login y register
export const methods = {
    login,
    register
};
