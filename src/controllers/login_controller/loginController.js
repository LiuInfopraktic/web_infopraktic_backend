const loginService = require('../../services/login_service/loginService');
const jwt = require('jsonwebtoken');

const secretKey = 'K@rt0shk@';

const generateToken = (userData) => {
    try {
        const token = jwt.sign(userData, secretKey);
        return token;
    } catch (error) {
        throw new Error('Error al generar el token');
    }
};

const login = async (req, res) => {
    const user = req.body.user;
    const pass = req.body.password;

    if (!user) {
        return res.status(422).send({ error: 'user missing' });
    }

    if (!pass) {
        return res.status(422).send({ error: 'password missing' });
    }

    try {
        const response = await loginService.login({ user, pass });

        if (typeof response !== 'string') {
            const token = generateToken(response);
            res.status(200).send({ token });
        } else {
            let error_code = 500;

            switch (response) {
                case 'wrong password':
                    error_code = 403;
                    break;
                case "user doesn't exist":
                    error_code = 404;
                    break;
                default:
                    break;
            }

            res.status(error_code).send({ error: response });
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const verify = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensaje: 'Missing Token' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        res.locals.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Invalid Token' });
    }
};

module.exports = { login, verify };