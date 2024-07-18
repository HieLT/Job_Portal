import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: "No token" });
        }
        jwt.verify(token, process.env.TOKEN_KEY!, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            if (decoded) {
                const currentTime = Math.floor(Date.now() / 1000);
                const exp = (decoded as JwtPayload).exp;

                if (exp && currentTime >= exp) {
                    res.status(401).send({message: 'Token expired'});
                }
                req.user = (decoded as JwtPayload).email;
                return next(); // Add this line to continue to the next middleware
            }
        });
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};

export default authentication;
