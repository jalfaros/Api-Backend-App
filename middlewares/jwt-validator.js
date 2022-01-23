const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).send( JSON.stringify({content:{errors:[{msg: "Error, debe enviar el token"}]}, success: "0", code: 401}) );
    }

    try {

        console.log(token.length);
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        req.body = {idCreador: uid, ...req.body};
        
        next();

    } catch ({name, message}) {
        console.log(`Error, ${name}, ${message}`);
        res.status(401).send( JSON.stringify({content:{errors:[{msg: `Error, ${name}, ${message}`}]}, success: "0", code: 401}) );
    }

}

module.exports = {
    jwtValidator
}