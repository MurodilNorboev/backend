import { Router } from "express";
import { UserController } from "../../controllers/user/user.controller.js";
import { auth } from "../../middleware/auts.middleware.js";
import { loginV, signupV } from "../../validator/todo/todo.validator.js";
import {validate} from '../../validator/validator.js'
import { authF } from "../../middleware/auts.middlewareFur.js";

export const router = Router();

router.post("/sign-up", signupV(), validate,   UserController.signUp);

router.post("/login", auth, loginV(),   UserController.login);

router.get("/me", authF, UserController.getprofile);
