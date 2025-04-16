const { Router } = require("express");
const formRouter = Router();
const formController = require("../controllers/formController");

formRouter.get("/sign-up", formController.getCreateUser);
formRouter.post("/sign-up", formController.postCreateUser);

module.exports = formRouter;