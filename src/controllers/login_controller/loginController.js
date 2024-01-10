const loginService = require('../../services/login_service/loginService')
const jwt = require('jsonwebtoken');

const secretKey = 'K@rt0shk@';

const generateToken = (userData) => {
    const token = jwt.sign(userData, secretKey);
    return token;
}

const login = async (req, res) => {
    let user = req.body.user;
    let pass = req.body.password;

    if (user && pass) {
        try {
            response = await loginService.login({user,pass})
            if(typeof(response) != 'string') res.status(200).send({token:generateToken(response)})
            else {
                let error_code = 500;
                switch(response){
                    case 'wrong password':
                        error_code = 403
                        break;
                    case "user doesn't exist":
                        error_code = 404
                        break;
                    default:
                        break;
                }
                res.status(error_code).send({error:response})
            }
        } catch (e){ res.status(500).send({error:e}) }
    } else if (!user) {
        res.status(422).send({ error: "user missing" });
    } else {
        res.status(422).send({ error: "password missing" });
    }
};

module.exports = { login }