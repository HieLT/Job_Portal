import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import connect from "./src/db/connectDb";
import route from "./src/routes/route";
import { config } from "dotenv";
config();

const app = express();

app.use(session({
    secret: "badliar",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

connect();
route(app);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

export default app;
