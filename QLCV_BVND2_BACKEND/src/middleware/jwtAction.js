require("dotenv").config();

import jwt from "jsonwebtoken";

const createJWT = () => {
    let payload = { department: 'IT' };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (err) {
        console.log(err);
    }

    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    jwt.verify(token, key, function (err, decoded) {
        if (err) {
            console.log(err);
            return data;
        }
        return decoded;
    });
}

module.exports = {
    createJWT, verifyToken
} 