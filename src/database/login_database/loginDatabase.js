const conn = require('../mysql');

const login = async (clan) => {
    const connection = await conn.connection();
    let sql = "select * from USER where user = ? and password = ?";
    try{
        const [rows, fields] = await connection.execute(sql,[clan.user, clan.pass]);
        let response = '';
        if(rows) response = rows[0] // user & pass match
        else { // user or pass are wrong... discover which one ->
            sql = "select * from USER where user = ?";
            const [rows, fields] = await connection.execute(sql,[clan.user]);
            if(rows) response = 'wrong password'
            else response = `user doesn't exist`;
        }
        return response;
    }catch(err){
    } finally {
        connection.release();
    }
}

module.exports = { login }