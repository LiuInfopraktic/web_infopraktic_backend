const graphicService = require('../../services/graphic_service/graphicService');

/***************
 * GETS
***************/
const userGraphics = async (req, res) => {
    let user = res.locals.user 
    // TODO: this function must return only the user graphics not all of them
        // rn returns all of them
        // maybe it should be a user id, not a username cuz it can be diferent users with the same username
    
    if(user){
        try{
            let graphics = await graphicService.userGraphics(user);
            if(graphics) return res.status(200).send({graphics})
            else res.status(404).send({error:'No graphics found'})
        } catch(e) {res.status(500).send({error:'Internal server error'})}
    } else res.status(422).send({error:'Missing user param'}) 
}

const graphicConfig = async (req, res) => {
    console.log(req.body)
}

module.exports = { userGraphics, graphicConfig }