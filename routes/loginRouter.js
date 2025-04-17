const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

// GET and POST methods for log-in form
loginRouter.get("/login", loginController.getLogin);
loginRouter.post("/login", loginController.postLogin);

// GET method to logout
loginRouter.get("/log-out", loginController.getLogout);

module.exports = loginRouter;