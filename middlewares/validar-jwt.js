const { response } = require("express")
const jwt = require("jsonwebtoken")

const validarJWT = (req, resp = response, next) => {

    const token = req.header("x-token") // COLOCO EL NOMBRE DEL TOKEN KEY QUE USARÉ CUANDO BUSCO EN POSTMAN, GET, HEADERS, KEY= X-TOKEN.

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: "Error en el token"
        })
    }

    try {                   // SI VA AL CATCH SIGNIFICA QUE EL TOKEN NO SE PUDO LEER

        const { uid, user} = jwt.verify(token, process.env.SECRET_JWT_SEED) // PARA VERIFICAR SI MI TOKEN FUE FIRMADO CON LA LLAVE CORRECTA DE MIS ENV
        // ESTOY DESESTRUCTURANDO, YA QUE SOLO USARÉ UID y USER DE MI VERIFICACION PARA MOSTRARLAS
  
        req.uid = uid;     //COMO PASA POR REFERENCIA ENVIAMOS ESTA INFORMACIÓN PARA USARLA EN AUTH CONTROLLERS
        req.user = user;
       


    } catch (error) {

        return resp.status(401).json({
            ok: false,
            msg: "token no valido"
        })

    }

    next();


}


module.exports = {
    validarJWT
}