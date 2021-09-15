const { con } = require("../db/connect")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = async function(req,res){
    try {
        const { FirstName, LastName, Email, Password } = req.body
        let userRecord = await checkExistEmail(Email);
        if (userRecord) {
            res.send({
                "code":400,
                "failed":"error occurred",
                "error" : `This email "${Email}" has already exist. Please choose an other email`});
        }
        else{
            const encryptedPassword = await bcrypt.hash(Password, saltRounds)
            const sql = "INSERT INTO users (FirstName, LastName, Email, Password) VALUES ('" + FirstName + "', '" + LastName + "', '" + Email + "', '" + encryptedPassword + "')";
            con.query(sql, async function (error, results, fields) {
                if (error) {
                    res.send({
                        "code":400,
                        "failed":"error occurred",
                        "error" : error})
                } else {
                    let userRecord = await checkExistEmail(Email);
                    res.send({
                        "code":200,
                        "success":"user registered successfully",
                        "payload": userRecord
                    });
                }
            });
        }
    }
    catch (e) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong with register user`,
            "message": e
        });
    }
}

const checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
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
    register: register
}