const express = require('express');
const router = express.Router();
const taskController = require("../../controllers/taskController");
router.route("/")
    .post(taskController.addTask)
    .get(taskController.getTasks)
router.route("/:taskId")
    .delete(taskController.deleteTasks)
    .put(taskController.updateTask)

module.exports = router;