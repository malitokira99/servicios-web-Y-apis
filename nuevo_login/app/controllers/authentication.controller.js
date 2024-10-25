 import bcryptjs from "bcryptjs";
 import jsonwebtoken from "jsonwebtoken";
 import dotenv from "dotenv";

 dotenv.config();

  export const usuarios =[{
    user: "a",
    email: "a@a.com",
    password: "$2a$05$2NgX4gYVaR16VCppOkJNIeXMYwNdbIVWBfVSe.Tf7Ln0QLV9QfTNO"
 }]
 
 async function login(req,res){
   console.log(req.body);
   const user = req.body.user;
   const password = req.body.password;
   if(!user || !password ){
      return res.status(400).send({status:"error", mensage:"los campos estan incompletos"})
   
  }
  const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
  if(!usuarioAResvisar){
   return res.status(400).send({status: "Error", message:"error durante la authenticacion"})
  }
  const loginCorrecto = await bcryptjs.compare(password,usuarioAResvisar.password);
  if(!loginCorrecto){
   return res.status(400).send({status:"Error",message:"Error durante login"})
  }
  const token = jsonwebtoken.sign({user:usuarioAResvisar.user},
   process.env.JWT_SECRET, 
   {expiresIn:process.env.JWT_EXPIRATION
   })

   const cookieOption = {
      expires:new Date ( Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
      path: "/"
   }
   res.cookie("jwt",token,cookieOption);
   res.send({status: "ok", message:"usuario logeado", redirect:"/inicio"})
}

 async function register(req,res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
        return res.status(400).send({status:"error", mensage:"los campos estan incompletos"})
    }
  const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
 if(usuarioAResvisar){
   return res.status(400).send({status:"error", mensage:"este usuario ya exise"})
 }

 const salt = await bcryptjs.genSalt(5);
 const hashPasword = await bcryptjs.hash(password,salt);
 const nuevoUsuario = {
   user, email, password : hashPasword
 }
 
 usuarios.push(nuevoUsuario);
 console.log(usuarios);
  return res.status(201).send({status:"ok", message:`usuario ${nuevoUsuario.user} agregado`, redirect:"/" })
}


export const methods ={
    login,
    register
}