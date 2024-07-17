import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/auth/google', (req, res, next) => authController.loginGoogle(req, res, next));
authRouter.get('/google/callback', (req, res, next) => authController.googleCallback(req, res, next));
authRouter.get('/auth/failure', authController.googleFailure);
authRouter.get('/login/success', authController.googleLoginSuccess);
authRouter.get('/logout', authController.googleLogout);

export default authRouter;
