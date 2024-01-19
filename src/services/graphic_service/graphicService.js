const graphicDatabase = require('../../database/graphic_database/graphicDatabase');

const userGraphics = async (user) => {
    let response = await graphicDatabase.userGraphics(user);
    return response;
}

module.exports = {userGraphics}