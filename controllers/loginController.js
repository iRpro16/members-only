const db = require("../db/queries");
const passport = require('passport');

async function getSignupForm(req, res) {
    res.render("login");
}

function postSignupForm(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })(req, res, next);
}

function getLogout(req, res, next) {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

module.exports = {
    getSignupForm,
    postSignupForm,
    getLogout
}