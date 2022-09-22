const { response } = require("express");
const Usuario = require("../models/Usuario");

const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, resp = response) => {

    const { email, user, password } = req.body;
    try {
        //Verificar Email
        const usuario = await Usuario.findOne({ email }) // PROPIEDAD EMAIL IGUAL A UNA VARIABLE EMAIL, ES LO MISMO QUE EMAIL : EMAIL, EMAIL DEL USUARIO CON EMAIL QUE TRAIGO REL REQ

        if (usuario) {            // RESTRINGE SI YA EXISTE ESE USUARIO CON ESE EMAIL
            return resp.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            })
        }

        //Crear usuario con el modelo

        const dbUser = new Usuario(req.body);

        const salt = bcrypt.genSaltSync(); // ESPECIFICA LA CANTIDAD DE VUELTAS PARA ENCRIPTAR, MIENTRAS MÁS SEAN, MÁS SEGURO ES, PERO MÁS LENTO RESPONDE
        dbUser.password = bcrypt.hashSync(password, salt) // LA VARIABLE QUE QUIERO ENCRIPTAR + LA CANTIDAD DE SALTOS  DE ENCRIPTACION


        const token = await generarJWT(dbUser.id, user) // SI ESTO SALE MAL DISPARA EL CATCH

        await dbUser.save()

        return resp.status(201).json({
            ok: true,
            uid: dbUser.id,
            user,
            email,
            token          // PONGO QUE EL TOKEN SEA PARTE DE LA RESPUESTA, EN CASO TODO VAYA BIEN
        })


    } catch (error) {
        return resp.status(500).json({   //RESPUESTA DE CREACION DE USUARIO
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }

}


let intentos = 0;
const loginUsuario = async (req, resp = response) => {
    const { email, password } = req.body;
    try {
        const dbUser = await Usuario.findOne({ email })

        if (!dbUser) {
            return resp.status(400).json({
                ok: false,
                msg: "El email no existe"
            })
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password)

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: "La contraseña no es correcta"
            })
        }


        const token = await generarJWT(dbUser.id, dbUser.user); // REFERENCIA A LO QUE TENGO ALMACENADO, Y AHÍ SI TENGO USER


        return resp.json({
            ok: true,
            uid: dbUser.id,
            user: dbUser.user,
            email: dbUser.email,
            token
        })


    } catch (error) {

        return resp.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })

    }


}



const revalidarToken = async (req, resp) => {

    const { uid } = req;
    const dbUser = await Usuario.findById(uid)
    const token = await generarJWT(uid, dbUser.user)

    return resp.json({
        ok: true,
        msg: "Renew",
        uid,
        user: dbUser.user,
        email: dbUser.email,
        token
    })
}






module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

