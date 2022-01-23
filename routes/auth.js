const { fieldValidate } = require('../middlewares/field-validator');
const { login }         = require('../controllers/auth.controller');
const { check }         = require('express-validator');
const { Router }        = require('express');

const router = Router();

router.post('/login',[
    check('userName' , 'El nombre de usuario es obligatorio.').not().isEmpty(),
    check('pass'     , 'Contraseña obligatoria y debe ser mayor a 5 letras.').not().isEmpty(),
    fieldValidate//Si ejecuta esto sin errores pasa al controlador
], login);

module.exports = router;