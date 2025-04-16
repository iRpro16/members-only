const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const session = require('express-session');
const pool = require("./db/pool");
const passport = require("passport");
const formRouter = require("./routes/formRouter");
const indexRouter = require("./routes/indexRouter");

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

app.use(indexRouter);
app.use(formRouter);

app.listen(3000, () => {
    console.log("Listening to on PORT: 3000");
})