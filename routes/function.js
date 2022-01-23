const { createFunction, searchFunction, importFunc } = require('../controllers/function.controller');
const { fieldValidate }                  = require('../middlewares/field-validator');
const { jwtValidator }                   = require('../middlewares/jwt-validator');
const { check }                          = require('express-validator');
const { Router }                         = require('express');

const router = Router();

router.post('/',[
    jwtValidator, //Validando token
    check( 'idCreador'    , 'Es obligatorio el id del creador.'      ).notEmpty(), //Esto lo valido con el token
    check( 'idCategoria'  , 'Es obligatorio el id de la categoría.'  ).notEmpty(),
    check( 'nombreFuncion', 'Es obligatorio el nombre de la función.').notEmpty(),
    check( 'descripcion'  , 'Es obligatorio la descripción.'         ).notEmpty(),
    check( 'codigoFuncion', 'Es obligatorio el código de la función.').notEmpty(),
    fieldValidate
], createFunction);

router.get('/', [
    jwtValidator,
    check( 'search' , 'Es obligatorio enviar el parámetro a buscar').notEmpty(),
    fieldValidate
],  searchFunction);

router.get('/exportFunction', [
    check( 'idFunction', 'Es obligatorio el id de la función'),
    fieldValidate
],  importFunc)

module.exports = router;