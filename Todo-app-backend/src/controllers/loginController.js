const { con } = require("../db/connect")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../../config/default");

const login = async function(req,res){
    try {
        console.log("req.body>>>>>>>", req.body)
        const { username, password } = req.body
        const user = await findUserByEmail(username);
        if (user) {
            const userObject =  {
                    UserID: user.UserID,
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Email: user.Email,
                    Password: user.Password
            }
            //compare password
            const isMatch = await bcrypt.compare(password, user.Password)
                if (isMatch) {
                    const token = await generateToken(userObject);
                    res.send({
                        "code":200,
                        "success" : `user login successfully`,
                        "payload": user,
                        "token" : token
                    });
                } else {
                    res.send({
                        "code":401,
                        "failed":"error occurred",
                        "error" : `This username or email must be wrong!`});
                }
        }
        else{
            res.send({
                "code":401,
                "failed":"error occurred",
                "error" : `This username or email must be wrong!`
            });
        }
    } catch (err) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong`
        });
    }
}

const generateToken = (payload ) => {
    return new Promise((resolve, reject) => {
        try {
            const privateKey = config.privateKey;
            const time = config.accessTokenTtl;
            const token = jwt.sign(payload, privateKey, { expiresIn: time });
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
};

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

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            con.query(
                ' SELECT * FROM `users` WHERE `Email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        let user = rows[0]
                        resolve(user)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    login: login
}