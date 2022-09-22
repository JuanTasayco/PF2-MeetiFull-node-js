const { validationResult } = require("express-validator")
const { response } = require("express")


const validarCampos = (req, resp = response, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return resp.status(404).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}


module.exports = {
    validarCampos
}