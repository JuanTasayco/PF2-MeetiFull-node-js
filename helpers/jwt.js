const jwt = require("jsonwebtoken");


const generarJWT = (uid, user) => {

    const payload = { uid, user };
    return new Promise((resolve, reject) => {  // TRUCO PARA CONVERTIR PROMESA, ASÍ PUEDO RESOLVER MI PROMESA TRANQUILAMENTE DESPUÉS

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {     // SI HAY ERROR NO SE PUDO GENERAR JSON WEB TOKEN
                reject(err);      // GRACIAS A LAS PROMESAS PUEDO OBTENER UN REJECT SI EL TOKEN SE RECHAZA
            } else {
                resolve(token)   // O PUEDO GENERAR UN RESOLVE SI EL TOKEN FUNCIONA
            }

        })
    })

}

module.exports = {
    generarJWT
}