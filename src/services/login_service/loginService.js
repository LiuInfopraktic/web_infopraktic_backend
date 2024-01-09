const loginDatabase = require('../../database/login_database/loginDatabase')

const login = async (user) => {
    let token = loginDatabase.login(user);
    return token;
}

module.exports = {login}