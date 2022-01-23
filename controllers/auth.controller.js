const { response, request } = require("express");
const { generateJWT }       = require("../helpers/generatorJWT");
const authManager           = require('../managers/auth.manager');
const bcryptjs              = require('bcryptjs');

const login = async (req = request, res = response) => {
    
    try {
        const { userName, pass } = req.body;
        
        authManager.login(userName)
            .then( async ({ recordset } ) => {

                if(!recordset) {
                    return res.status(404).
                    send(JSON.stringify({content:{"errors":["msg", "Error, usuario o contraseña invalida."]},
                    success: "0", "code": 404})); 
                }

                const validPassword = bcryptjs.compareSync( pass, recordset[0].pass);
                if ( !validPassword ) {
                    return res.status(404).
                    send(JSON.stringify({content:{"errors":["msg", "Error, usuario o contraseña invalida."]},
                    success: "0", "code": 404})); 
                }

                authManager.dataLogin(userName)
                .then(async ({recordset}) => {
                    let token = await generateJWT( recordset[0].id );
                    res.status(200).send( JSON.stringify({content: [recordset[0]], token, success: "1", code: 200 }) );
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revisar server"]}, success: "0", "code": 500}));
                });
        })
        .catch(err => {
            res.status(500).send(JSON.stringify({content: err, success: "0", code: 500}));
            console.log(err);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revidar server"]}, success: "0", "code": 500}));
    }
}

module.exports = {
    login
}