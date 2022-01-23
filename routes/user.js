
const { userGet, userPut, userPost, userDelete } = require('../controllers/users.controller');
const { fieldValidate }                          = require('../middlewares/field-validator');
const { Router }                                 = require('express');
const { check }                                  = require('express-validator');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/',[
    check('userName' , 'El nombre de usuario es obligatorio.').not().isEmpty(),
    check('pass'     , 'Contraseña obligatoria y debe ser mayor a 5 letras.').isLength({min: 5}),
    check('firstName', 'El nombre es obligatorio.').not().isEmpty(),
    check('lastName' , 'El apellido es obligatorio').not().isEmpty(),
    //Falta validar desde aquí si el correo ya existe video 124-125 minuto 8
    fieldValidate//Si ejecuta esto sin errores pasa al controlador
], userPost),

router.delete('/', userDelete);

module.exports = router;