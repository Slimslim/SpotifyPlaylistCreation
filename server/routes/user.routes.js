import { Router } from "express";
import * as userConroller from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userConroller.register);
router.post("/login", userConroller.login);
router.post("/logout", userConroller.logout);

export default router;
