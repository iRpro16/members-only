const db = require("../db/queries");
const passport = require('passport');

async function getLogin(req, res) {
    res.render("login");
}

function postLogin(req, res, next) {
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
    getLogin,
    postLogin,
    getLogout
}