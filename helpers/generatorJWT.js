const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') =>{
    return new Promise ( (resolve, reject ) => {

        const payload = { uid };
        
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'  //Expiración de 4 horas
            }, (err, token) => {
                if ( err ) {
                    console.log(err);
                    reject( 'No se pudo generar el token' );
                } else {
                    resolve(token);
                }
            })
    })
}

module.exports = { generateJWT  }