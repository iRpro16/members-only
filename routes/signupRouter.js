const { Router } = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController");
const validateNewUser = require("../middlewares/validateNewUser");

// GET and POST methods for sign-up form
signupRouter.get("/sign-up", signupController.getCreateUser);
signupRouter.post("/sign-up", validateNewUser, signupController.postCreateUser);

module.exports = signupRouter;