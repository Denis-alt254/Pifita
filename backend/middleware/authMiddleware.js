const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Access denied, user not authenticated."});
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        if(!decoded){
            return res.status(403).json({error: "Invalid payload"});
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error({Token_ver_Error: error.message});
        res.status(403).json({error: "Invalid or expired token"});
    }
}