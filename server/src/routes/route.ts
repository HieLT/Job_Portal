import authRouter from "./auth.router";
import emailVerificationRouter from "./emailVerification.router";
import candidateRouter from "./candidate.router";
import companyRouter from "./company.router";
import adminRouter from "./admin.router";
import jobRouter from "./job.router";

const route = (app: any) => {
    app.use('/', authRouter);
    app.use('/gmail/', emailVerificationRouter);
    app.use('/candidate/', candidateRouter);
    app.use('/company/', companyRouter);
    app.use('/admin/', adminRouter);
    app.use('/job/', jobRouter);
};

export default route;