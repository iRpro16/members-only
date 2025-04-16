const { Router } = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController");

// GET and POST methods for sign-up form
signupRouter.get("/sign-up", signupController.getCreateUser);
signupRouter.post("/sign-up", signupController.postCreateUser);

module.exports = signupRouter;