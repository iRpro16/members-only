const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/queries");
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async (id, done) => {
        try {
            const rows = await db.searchID(id);
            const user = rows[0];

            done(null, user);
        } catch(err) {
            done(err);
        }
    });

    // LocalStrategy
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const rows = await db.searchUsername(username);
                const user = rows[0];
                
                if (!user) {
                    return done(null, false, { message: "Incorrect username"});
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, { message: "Incorrect password"});
                }
                return done(null, user);
            } catch(err) {
                return done(err);
            }
        })
    )
}