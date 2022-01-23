const { response, request } = require("express");
const categoryManager       = require('../managers/category.manager');


const createCategory = async (req = request, res = response) => {
    
    try {
        categoryManager.newCategory(req.body)
        .then( ({recordset='', output}) => {

            if(output.success === '0'){
                return res.status(500).
                send(JSON.stringify({content:{"errors":["msg", "Error, ya existe una categoría con el mismo nombre."]},
                success: "0", "code": 500})); 
            }
            res.status(200).send( JSON.stringify({content: [recordset[0]], success: "1", code: 200 }) );
            
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

const getAllCategorys = async (req, res = response ) => {
    try {
        categoryManager.getAllCategorys()
        .then( ({recordset='', output}) => {

            if(output.success === '0'){
                return res.status(500).
                send(JSON.stringify({content:{"errors":["msg", "Error, no hay categorías registradas."]},
                success: "0", "code": 500})); 
            }
            res.status(200).send( JSON.stringify({content: recordset, success: "1", code: 200 }) );
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(JSON.stringify({content:{"errors":["msg", "Error, revisar server"]}, success: "0", "code": 500}));
        });

    } catch (error) {
        console.log(error);
        
    }

}
module.exports = { 
    createCategory,
    getAllCategorys
}