const { response, request } = require("express");
const functionManager       = require('../managers/function.manager');

const createFunction = async (req = request, res = response) => {
    try {

        functionManager.validateUser(req.body.idCreador)
        .then( ({ output }) =>{

            if(output.success === '0'){
                return res.status(500).
                send(JSON.stringify({content:{"errors":["msg", "Error, el id del creador no existe."]},
                success: "0", "code": 500})); 
            }

            functionManager.newFunction(req.body)
            .then( ({recordset='', output}) => {
    
                if(output.success === '0'){
                    return res.status(500).
                    send(JSON.stringify({content:{"errors":["msg", "Error, no existe una categoría con ese id."]},
                    success: "0", "code": 500})); 
                }
                res.status(200).send( JSON.stringify({content: [recordset[0]], success: "1", code: 200 }) );
                
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revisar server"]}, success: "0", "code": 500}));
            });


        })
        .catch(err => {
            console.log(err);
            res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revisar server"]}, success: "0", "code": 500}));
        });


    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revidar server"]}, success: "0", "code": 500}));
    }
}

const searchFunction = (req = request, res = response) => {
    try {
        functionManager.searchFuntion(req.query)
        .then( ( {recordset='', output } ) =>{
            console.log( output )
            if(output.success === '0'){
                return res.status(500).
                send(JSON.stringify({content:{"errors":["msg", "Error, no se encontraron coincidencias."]},
                success: "0", "code": 500})); 
            }
            res.status(200).send( JSON.stringify({content: recordset, success: "1", code: 200 }) );

        })
        .catch(err =>{
            console.log(err);
            res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revisar server"]}, success: "0", "code": 500}));
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revidar server"]}, success: "0", "code": 500}));
    }

}


const importFunc = (req = request, res = response) => {
    functionManager.importFunction(req.query)

    .then( ({recordset}) => {
        res.json(recordset);
    })
    .catch(err => {
        console.log(err);
        res.status(500);
    })

}
module.exports = { 
    createFunction,
    searchFunction,
    importFunc
}