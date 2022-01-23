const { response, request } = require('express');
const { generateJWT }       = require('../helpers/generatorJWT');
const userManager           = require('../managers/users.manager');
const bcryptjs              = require('bcryptjs');

const userPost = (req = request, res = response) => {

    try {
        const {userName, pass, firstName, lastName} = req.body;
        const salt     =  bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync( pass, salt ); //emcriptando the password
    
        userManager.newUser( userName, password, firstName, lastName )
            .then( async({ recordset, output }) => {

                if(output.success === "0"){
                    return res.status(500).send(JSON.stringify({content:{errors:[{msg: "Error, Ya existe ese nombre de usuario"}]}, success: "0", code: 500}));
                }
                
                let token = await generateJWT( recordset[0].id );
                res.status(200).send( JSON.stringify({content: recordset, token, success: output.success, code: 200 }) )
            })
            .catch(err => {
                res.status(500).send(JSON.stringify({content: err, success: "0", code: 500}));
                console.log(err);
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({content:{errors:[{msg: "Error, review server"}]}, success: "0", code: 500}));
    }

}

const userGet = (req, res = response) => {

    res.json({
        msg: 'get API'
    })
}


const userPut = (req, res = response) => {
    const id = req.params;
    res.json({
        msg: 'put API',
        id
    })
}


const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}
