const { createCategory, getAllCategorys } = require('../controllers/category.controller');
const { fieldValidate }                  = require('../middlewares/field-validator');
const { jwtValidator }                   = require('../middlewares/jwt-validator');
const { check }                          = require('express-validator');
const { Router }                         = require('express');

const router = Router();

router.post('/',[
    jwtValidator, //validando token
    check('nombreCategoria', 'nombreCategoria es obligatorio.').notEmpty(),
    fieldValidate
], createCategory);

router.get('/',[
    jwtValidator
], getAllCategorys);

module.exports = router;