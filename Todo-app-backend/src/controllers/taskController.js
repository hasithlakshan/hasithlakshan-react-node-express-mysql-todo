const { con } = require("../db/connect")
const { verifyToken } = require("../utils/tokenHandler")
const addTask = async function(req,res){
    try {
        const { TaskName, Status } = req.body
        const { token } = req.headers
        const { UserID } = await verifyToken(token)
        const sql = "INSERT INTO tasks (TaskName, Status, UserId) VALUES ('" + TaskName + "', '" + Status + "', '" +  UserID + "')";
        con.query(sql, async function (error, results, fields) {
            if (error) {
                res.send({
                    "code":400,
                    "failed":"error occurred",
                    "error" : error})
            } else {
                console.log("added data>>>>>>>",UserID, TaskName, Status)
                const addedTask = await getTask(UserID, TaskName, Status)
                res.send({
                    "code":200,
                    "success":"task added successfully",
                    "payload": addedTask
                });
            }
        });
    }catch (e) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong with add task`,
            "message": e
        });
    }


}

const updateTask = async function(req,res){
    try {
        const { Status } = req.body
        const { taskId } = req.params
        const sql = "UPDATE tasks SET Status = '"+Status+"' WHERE TaskID = '" +taskId +"'";
        con.query(sql, async function (error, results) {
            if (error) {
                res.send({
                    "code":400,
                    "failed":"error occurred",
                    "error" : error})
            } else {
                const updatedTask = await getTaskById(taskId)
                res.send({
                    "code":200,
                    "success":"task update successfully",
                    "payload": updatedTask
                });
            }
        });
    }catch (e) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong with update task`,
            "message": e
        });
    }


}

const getTasks = async (req,res) => {
    try{
        const { token } = req.headers
        const { UserID } = await verifyToken(token)
        const sql = 'SELECT * FROM tasks WHERE UserId = ?';
        con.query(sql, [UserID], function (err, result) {
            if (err) {
                res.send({
                    "code":400,
                    "failed":"error occurred",
                    "error" : err})
            } else {
                res.send({
                    "code":200,
                    "success":"task retrive successfully",
                    "payload": result
                });
            }
        });
    }
    catch (e) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong with get task`,
            "message": e
        });
    }
};

const deleteTasks = async (req,res) => {
    try{
        const { taskId } = req.params
        const { token } = req.headers
        const { UserID } = await verifyToken(token)
        const sql = "DELETE FROM tasks WHERE TaskID = '" + taskId +"'";
        console.log("sql", sql)
        con.query(sql, [UserID], function (err, result) {
            if (err) {
                res.send({
                    "code":400,
                    "failed":"error occurred",
                    "error" : err})
            } else {
                console.log("ok")
                res.send({
                    "code":200,
                    "success":"task deleted successfully",
                    "payload": result
                });
            }
        });
    }
    catch (e) {
        res.send({
            "code":401,
            "failed":"error occurred",
            "error" : `something wants to wrong with delete task`,
            "message": e
        });
    }
};

const getTask = (userId, TaskName, status) => {
    return new Promise( (resolve, reject) => {
        try {
            const sql = 'SELECT * FROM `tasks` WHERE `UserId` = ? AND `TaskName` = ? AND `Status` = ?';
            con.query(sql, [userId, TaskName, status], function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getTaskById = (taskId) => {
    return new Promise( (resolve, reject) => {
        try {
            const sql = 'SELECT * FROM `tasks` WHERE `TaskID` = ?';
            con.query(sql, [taskId], function (err, result) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    addTask: addTask,
    getTasks: getTasks,
    deleteTasks: deleteTasks,
    updateTask: updateTask
}