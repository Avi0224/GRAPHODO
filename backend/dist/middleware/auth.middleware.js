"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_ACCESS_SECRET);
        const user = await User_1.User.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
        return;
    }
};
exports.protect = protect;
