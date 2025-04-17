const { body } = require('express-validator');
require('dotenv').config()

const validateUser = [
    body('secret_password')
        .exists({checkFalsy: true}).withMessage('You must type secret password')
        .custom((value, {req}) => value == process.env.SECRET_PASS).withMessage("Wrong password"),
]

module.exports = validateUser;