const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require('dotenv').config();

const validateUser = [
    body('admin_password')
        .exists({checkFalsy: true}).withMessage('You must type admin password')
        .custom((value, {req}) => value == process.env.ADMIN_PASS).withMessage("Wrong password"),
]

async function getAdminForm(req, res) {
    res.render("admin");
}

const postAdminForm = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            // If errors array is not empty
            if (!errors.isEmpty()) {
                return res.status(400).render("admin", {
                    errors: errors.array(),
                });
            }

            // If errors array is empty
            const user = req.user;
            await db.upgradeStatus(user.username, 'admin');
            res.redirect("/");
        } catch(error) {
            console.error(error);
            next(error);
        }
    }
]

async function getDeleteMessage(req, res) {
    await db.deleteMessage(req.params.id);
    res.redirect("/");
}

module.exports = {
    getAdminForm,
    postAdminForm,
    getDeleteMessage
}