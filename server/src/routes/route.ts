import { Request, Response } from "express";
import authRouter from "./auth.router";
import emailVerificationRouter from "./emailVerification.router";
import candidateRouter from "./candidate.router";

const route = (app: any) => {
    app.get('/', (req: Request, res: Response) => {
        res.send('<a href = "/auth/google">Login with Google</a>');
    });
    app.use('/', authRouter);
    app.use('/gmail/', emailVerificationRouter);
    app.use('/candidate/', candidateRouter);
};

export default route;