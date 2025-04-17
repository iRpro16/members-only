const db = require("../db/queries");
const { validationResult } = require("express-validator");
require('dotenv').config();

async function getAdminForm(req, res) {
    res.render("admin");
}

async function postAdminForm(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("admin", {
            errors: errors.array(),
        });
    }

    try {
        const user = req.user;
        await db.upgradeStatus(user.username, 'admin');
        res.redirect("/");
    } catch(error) {
        console.error(error);
        next(error);
    }
}

async function getDeleteMessage(req, res) {
    try {
        await db.deleteMessage(req.params.id);
        res.redirect("/");
    } catch(error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    getAdminForm,
    postAdminForm,
    getDeleteMessage
}