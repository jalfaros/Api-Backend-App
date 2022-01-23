const {sql, getPoolConnection} = require('../config/sqlPool');

exports.newFunction = async ({ idCreador, idCategoria, nombreFuncion, descripcion, codigoFuncion }) => {
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('idCreator'          , sql.VarChar, idCreador    )
        .input('idCategory'         , sql.VarChar, idCategoria  )
        .input('functionName'       , sql.VarChar, nombreFuncion)
        .input('functionDescription', sql.VarChar, descripcion  )
        .input('functionCode'       , sql.VarChar, codigoFuncion)
        .output('success')
        .execute('sp_new_function');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
}

exports.validateUser = async ( idUser ) =>{
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('idUser', sql.Int, idUser)
        .output('success')
        .execute('sp_validate_user');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
    
}

exports.searchFuntion = async ( { search } ) =>{
    try {
        
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('search', sql.VarChar, search)
        .output('success')
        .execute('sp_search_function');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
    
}

exports.importFunction = async ( { idFunction } ) =>{

    console.log(idFunction, 'her');
    
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('id', sql.Int , idFunction)
        .execute('sp_import_function');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
    
}