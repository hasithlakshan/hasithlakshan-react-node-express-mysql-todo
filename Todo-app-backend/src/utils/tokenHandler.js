const config = require("../../config/default");
const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const privateKey = config.privateKey;
            const object =  jwt.verify(token, privateKey)
            resolve(object);
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = {
    verifyToken: verifyToken
}