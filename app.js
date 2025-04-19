const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "/public");
const session = require('express-session');
const pool = require("./db/pool");
const passport = require("passport");
// Routers
const signupRouter = require("./routes/signupRouter");
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
require("./config/passport")(passport)

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

// session
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: pool,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false}));

// routers
app.use(indexRouter);
app.use(signupRouter);
app.use(loginRouter);

app.listen(8000,'0.0.0.0', () => {
    console.log("Listening to on PORT: 3000");
})