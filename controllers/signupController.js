const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

// Validation
const validateUser = [
    body('password')
        .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('confirm_password')
        .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
        .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
]

// createUser - GET method
async function getCreateUser(req, res) {
    res.render("sign-up");
}

// createUser - POST method
const postCreateUser = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            // If errors array is not empty
            if (!errors.isEmpty()) {
                return res.status(400).render("sign-up", {
                    errors: errors.array(),
                });
            }

            // If errors array is empty
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
]

module.exports = {
    getCreateUser,
    postCreateUser
}


// member, exclusive, admin