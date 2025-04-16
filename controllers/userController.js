const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require('dotenv').config();

const validateUser = [
    body('secret_password')
        .exists({checkFalsy: true}).withMessage('You must type secret password')
        .custom((value, {req}) => value == process.env.SECRET_PASS).withMessage("Wrong password"),
]

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

const postExclusiveForm = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            // If errors array is not empty
            if (!errors.isEmpty()) {
                return res.status(400).render("exclusive", {
                    errors: errors.array(),
                });
            }

            // If errors array is empty
            const user = req.user;
            await db.upgradeStatus(user.username);
            res.redirect("/");
        } catch(error) {
            console.error(error);
            next(error);
        }
    }
]

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
    postAddMessage
}