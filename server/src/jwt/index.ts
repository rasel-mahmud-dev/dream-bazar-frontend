import jwt from "jsonwebtoken";
import { Request } from "express";
import { JWT_SECRET } from "../config/env";

export function createToken(id: any, email?: string, roles: string[] = []) {
    return jwt.sign({ id, email, roles }, JWT_SECRET, { expiresIn: "7d" });
}

export function parseToken(token: string, cb?: (err: any, data: any) => void) {
    if (cb) {
        jwt.verify(token, JWT_SECRET, cb);
        return;
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

export function getToken(req: Request) {
    const au = req.headers["authorization"];
    if (au && typeof au === "string") {
        return au.split(" ")?.[1] ?? "";
    }
    return "";
}

export default {
    createToken,
    parseToken,
    getToken
};
