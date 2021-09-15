const express = require('express');
const router = express.Router();
const registerController = require("../../controllers/registerController");
router.route("/")
    .get( (req, res) => res.status(200).json({data: "hasi"}))
    .post(registerController.register)

module.exports = router;