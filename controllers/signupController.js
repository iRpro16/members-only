const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

async function getCreateUser(req, res) {
    res.render("sign-up");
}

async function postCreateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
            errors: errors.array(),
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userStatus = "member";
        await db.insertUser(
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            hashedPassword,
            userStatus
        )
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }

}

module.exports = {
    getCreateUser,
    postCreateUser
}


// member, exclusive, admin