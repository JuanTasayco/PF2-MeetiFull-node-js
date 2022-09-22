const { Router } = require("express"); // CASI TODO LO QUE VIENE DE EXPRESS SON FUNCIONES QUE DEBO EJECUTAR
const { check } = require("express-validator")
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router(); // ES UNA FUNCION COMUN Y CORRIENTE, NO ES UN NEW ROUTER ETC.

//TENEMOS EL CRUD

//CREAR UN NUEVO USUARIO
router.post('/new', [
    check("email").isEmail().withMessage("Se necesita el email"),
    check("user").notEmpty().withMessage("Se necesita ingresar usuario"),
    check("password").isLength({ min: 6 }).withMessage("Necesitas minimo 6 caracteres de password").notEmpty().withMessage("no puede ser vacio este campo")
    , validarCampos
], crearUsuario)
//LOGIN DE USUARIO
router.post('/', [
    check("email", "Se necesita el email").isEmail(),
    check("password").isLength({ min: 6 }).withMessage("Se necesita contraseña de 6 digitos")  //ESTO CREA UN OBJETO CON ERRORES QUE USAREMOS EN MIS RUTAS PRINCIPALES
    , validarCampos
], loginUsuario)

router.get('/renew', validarJWT, revalidarToken)


module.exports = router; // ASI SE EXPORTA EN NODE, NO SOLAMENTE EXPORT