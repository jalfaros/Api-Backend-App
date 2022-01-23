const {sql, getPoolConnection} = require('../config/sqlPool');

exports.newCategory = async ({nombreCategoria}) =>{

    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .input('nameCategory', sql.VarChar, nombreCategoria)
        .output('success')
        .execute('sp_create_category');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
}

exports.getAllCategorys = async() => {
    try {
        const pool = await getPoolConnection();
        let result = await pool.request()
        .output('success')
        .execute('sq_get_all_categorys');

        sql.close();
        console.log(result);
        return result;

    } catch (error) {
        sql.close();
        console.log(error);
        return `Error, ${error}`;
    }
}