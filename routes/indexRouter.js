const { Router } = require("express");
const indexRouter = Router();
const usercontroller = require("../controllers/userController");
const adminController = require("../controllers/adminController");

// GET method for index
indexRouter.get("/", usercontroller.getRenderIndex);

// GET and POST methods for exclusive
indexRouter.get("/exclusive", usercontroller.getExclusiveForm);
indexRouter.post("/exclusive", usercontroller.postExclusiveForm);

// GET and POST methods for adding message
indexRouter.get("/add", usercontroller.getAddMessage);
indexRouter.post("/add", usercontroller.postAddMessage);

// GET and POST methods for admin
indexRouter.get("/admin", adminController.getAdminForm);
indexRouter.post("/admin", adminController.postAdminForm);

// GET method for delete
indexRouter.get("/delete/:id", adminController.getDeleteMessage);

module.exports = indexRouter;