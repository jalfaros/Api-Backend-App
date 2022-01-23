const {sql, getPoolConnection} = require('../config/sqlPool');

exports.newUser = async(userName, pass, firstName, lastName) => {

        const pool = await getPoolConnection();

        let result = await pool.request()
        .input('userName' , sql.VarChar, userName )
        .input('pass'     , sql.VarChar, pass     )
        .input('firstName', sql.VarChar, firstName)
        .input('lastName' , sql.VarChar, lastName )
        .output('success')
        .execute('sp_new_user');

        sql.close();
        return result;
}

sql.on(console.warn)