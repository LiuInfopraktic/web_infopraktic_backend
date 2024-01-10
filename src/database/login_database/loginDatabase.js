const conn = require('../mysql');

const login = async (clan) => {
    const connection = await conn.connection();
    let sql = "select u.user,u.role, ur.role, ur.privileges from USER as u left join USER_ROLE as ur on u.role = ur.id where user = ? and password = ?";
    try{
        const [rows, fields] = await connection.execute(sql,[clan.user, clan.pass]);
        let response = '';
        if(rows.length > 0) response = rows[0] // user & pass match
        else { // user or pass are wrong... discover which one ->
            sql = "select * from USER where user = ?";
            const [rows, fields] = await connection.execute(sql,[clan.user]);
            if(rows.length > 0) response = "wrong password";
            else response = `user doesn't exist`;
        }
        return response;
    }catch(err){
    } finally {
        connection.release();
    }
}

module.exports = { login }