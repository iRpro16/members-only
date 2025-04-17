const { body } = require("express-validator");

const validateUser = [
    body('password')
        .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('confirm_password')
        .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
        .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
]

module.exports = validateUser;