import { Router } from "express";
import userHandler from "../handlers/userHandler.js";

const userRputes = Router();


userRputes.post("/api/signup", userHandler.createUser);
userRputes.post("/api/login", userHandler.login);
userRputes.get("/api/chacklogin", userHandler.chackLogin);


export default userRputes;