const {sql, getPoolConnection} = require('../config/sqlPool');


exports.login = async(userName) => {
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('userName', sql.VarChar, userName)
        .output('success')
        .execute('sp_login');

        sql.close();
        console.log(result);
        return result;
        
    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`
    }
}

exports.dataLogin = async( userName ) => {
    
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('userName', sql.VarChar, userName)
        .execute('sp_see_user');

        sql.close();
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`
    }
}