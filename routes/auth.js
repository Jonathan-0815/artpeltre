const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../js/user')

router.post('/register', async(req, res)=>{
    const{idUsuario,nomUsuario,apUsuario,numContacto,direccionUsuario,contraUsuario,correoUsuario,fecharegisUsuario} = req.body;

    try{
        let usuario = await Usuario.findOne({where:{correoUsuario}})
        if (usuario){
            return res.status(400).json({msg:'Este correo se encuentra registrado, usuario ya existe'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedcontraUsuario = await bcrypt.hash(contraUsuario, salt);

        usuario = await Usuario.create({
            idUsuario,
            nomUsuario,
            apUsuario,
            numContacto,
            direccionUsuario,
            contraUsuario: hashedcontraUsuario,
            correoUsuario,
            fecharegisUsuario
        })
        const payload = {
            usuario :{
                idUsuario : usuario.id
            }
         }
    jwt.sign(payload, 'secret', {expiresIn:100}, (err, token)=>{
        if (err) throw err;
        res.json({token})
    })
    }catch (err){
        console.error(err.message);
        res.status(500).send('Error al registrar el usuario')
    }
})

router.post('/login', async(req, res)=>{
    const {correoUsuario, contraUsuario} = req.body;
    try {
        const usuario = await Usuario.findOne({where:{correoUsuario}})
        if (!usuario){
            return res.status(400).json({msg:'Este correo se encuentra registrado, usuario no encontrado'})
    }
    const isMatch = await bcrypt.compare(contraUsuario, usuario.contraUsuario);
    if(!isMatch){
        return res.status(400).json({msg:'Contraseña incorrecta'})
    }
    const payload = {
        usuario: {
            idUsuario: usuario.idUsuario
        }
    }
    jwt.sing(payload, 'secret', {expiresIn:300}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })
    }catch(err){
        console.error(err.message);
        res.status(500).send('Error al iniciar sesion')
    }
})
module.exports = router;

/*const token = jwt.sign({ id: usuario.idUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ msg: 'Login exitoso', token });
} catch (error) {
console.error(error);
res.status(500).json({ msg: 'Error en el servidor' });
}
});*/