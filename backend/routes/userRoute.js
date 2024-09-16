import express from "express";
import { login, logout, signup, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete/:userId", deleteUser);


export default router;
