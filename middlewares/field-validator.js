
const { validationResult } = require('express-validator');


const fieldValidate = (req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).send(JSON.stringify({content: errors, code: 400, success: "0"}));
    next();//Esto es para que pase por todos lo middlewares, lo que valida en la carpeta de rutas
}

module.exports = {
    fieldValidate
}