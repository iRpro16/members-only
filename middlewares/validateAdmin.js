const { body } = require('express-validator');
require('dotenv').config();

const validateUser = [
    body('admin_password')
        .exists({checkFalsy: true}).withMessage('You must type admin password')
        .custom((value, {req}) => value == process.env.ADMIN_PASS).withMessage("Wrong password"),
]

module.exports = validateUser;