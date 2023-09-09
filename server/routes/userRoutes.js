const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
 
userRouter.get("/", userController.getAll);

userRouter.get("/:id", userController.getById);

userRouter.get("/name/:name", userController.getByName);

userRouter.get("/email/:email", userController.getByEmail);

userRouter.post("/", userController.add);
  
userRouter.post("/auth/", userController.loginUser);

userRouter.put("/:id", userController.edit);

userRouter.delete("/:id", userController.delete)

 
module.exports = userRouter;