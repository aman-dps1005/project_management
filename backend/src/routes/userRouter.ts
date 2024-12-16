import { Router } from "express";
import { createUser, getUsers, signin } from "../controllers/UserController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const userRouter=Router();
userRouter.post("/users",createUser);
userRouter.get("/users",authenticateJWT,getUsers);
userRouter.post("/signin",signin);

export default userRouter;