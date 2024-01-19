const conn = require('../mysql');

const userGraphics = async (user) => {
    const connection = await conn.connection();
    let sql = `select vf.* from view v
    left join VIEW_FIELDS_CONFIG vf
    on v.company = vf.company and v.id = vf.id_view
    where user = ?;`;
    try{
        const [rows, fields] = await connection.execute(sql,[user]);
        return rows;
    }catch(err){
    } finally {
        connection.release();
    }
}

module.exports = { userGraphics }