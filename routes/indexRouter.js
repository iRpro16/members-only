const { Router } = require("express");
const indexRouter = Router();
const usercontroller = require("../controllers/userController");

// GET method for index
indexRouter.get("/", usercontroller.getRenderIndex);

// GET and POST methods for exclusive
indexRouter.get("/exclusive", usercontroller.getExclusiveForm);
indexRouter.post("/exclusive", usercontroller.postExclusiveForm);

// GET and POST methods for adding message
indexRouter.get("/add", usercontroller.getAddMessage);
indexRouter.post("/add", usercontroller.postAddMessage);

module.exports = indexRouter;