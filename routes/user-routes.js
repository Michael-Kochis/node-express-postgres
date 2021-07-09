const express = require('express');
const bcrypt = require('bcryptjs');

const authRouter = require('../api/auth/auth-routes')
const users = require("../models/userHelpers");
const router = express.Router()

router.get('/', (req, res) => {
    users.findUsers()
    .then(resp => {
        res.status(200).json(resp);
    }).catch((err) => {
        res.status(500).json({ message: "Error retrieving users." })
    })
})

router.use("/", authRouter);

module.exports = router;