"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.me = exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, env_1.env.JWT_ACCESS_SECRET, {
        expiresIn: env_1.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, env_1.env.JWT_REFRESH_SECRET, {
        expiresIn: env_1.env.JWT_REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
};
const setTokenCookies = (res, accessToken, refreshToken) => {
    res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: env_1.env.NODE_ENV === 'production',
        sameSite: env_1.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env_1.env.NODE_ENV === 'production',
        sameSite: env_1.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ status: 'error', message: 'Please provide name, email and password' });
            return;
        }
        const userExists = await User_1.User.findOne({ email });
        if (userExists) {
            res.status(400).json({ status: 'error', message: 'User already exists' });
            return;
        }
        const user = await User_1.User.create({
            name,
            email,
            password,
        });
        if (user) {
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            setTokenCookies(res, accessToken, refreshToken);
            res.status(201).json({
                status: 'success',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        else {
            res.status(400).json({ status: 'error', message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ status: 'error', message: 'Please provide email and password' });
            return;
        }
        const user = await User_1.User.findOne({ email }).select('+password');
        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            setTokenCookies(res, accessToken, refreshToken);
            res.status(200).json({
                status: 'success',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        else {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};
exports.logout = logout;
const me = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?._id);
        if (user) {
            res.status(200).json({
                status: 'success',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.me = me;
const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(401).json({ status: 'error', message: 'Not authorized, no refresh token' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.env.JWT_REFRESH_SECRET);
        const user = await User_1.User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
            return;
        }
        const tokens = generateTokens(user._id.toString());
        setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
        res.status(200).json({ status: 'success', message: 'Token refreshed' });
    }
    catch (error) {
        res.status(401).json({ status: 'error', message: 'Not authorized, refresh token failed' });
    }
};
exports.refresh = refresh;
