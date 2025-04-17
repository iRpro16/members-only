const db = require("../db/queries");
const { validationResult } = require("express-validator");
require('dotenv').config();

async function getRenderIndex(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {
        user: req.user,
        messages: messages
    })
}

async function getExclusiveForm(req, res) {
    res.render("exclusive");
}

async function postExclusiveForm(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("exclusive", {
            errors: errors.array(),
        });
    }

    try {
        const user = req.user;
        await db.upgradeStatus(user.username, 'exclusive');
        res.redirect("/");   
    } catch(error) {
        console.error(error);
        next(error);
    }
}

async function getAddMessage(req, res) {
    res.render("add");
}

async function postAddMessage(req, res) {
    await db.addMessage(
        req.body.title,
        req.body.message,
        req.user.id
    )
    res.redirect("/");
}

module.exports = {
    getRenderIndex,
    getExclusiveForm,
    postExclusiveForm,
    getAddMessage,
    postAddMessage,
}