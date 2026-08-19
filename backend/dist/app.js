"use strict";
// dotenv.config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const habit_routes_1 = __importDefault(require("./routes/habit.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const app = (0, express_1.default)();
// Security headers
app.use((0, helmet_1.default)());
// CORS
app.use((0, cors_1.default)({
    origin: env_1.env.NODE_ENV === 'production' ? env_1.env.CORS_ORIGINS.split(',') : true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));
// Body parsing
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// NoSQL injection prevention
app.use((req, res, next) => {
    if (req.body)
        req.body = express_mongo_sanitize_1.default.sanitize(req.body);
    if (req.params)
        req.params = express_mongo_sanitize_1.default.sanitize(req.params);
    next();
});
// Global rate limit
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api', globalLimiter);
// Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/tasks', task_routes_1.default);
app.use('/api/v1/habits', habit_routes_1.default);
app.use('/api/v1/dashboard', dashboard_routes_1.default);
app.use('/api/v1/analytics', analytics_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Graphodo API is running' });
});
// 404 Handler for non-existent routes
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Not Found - ${req.originalUrl}`,
    });
});
// Global Error Handler
app.use((err, req, res, next) => {
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        return res.status(404).json({ status: 'error', message });
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return res.status(400).json({ status: 'error', message });
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({ status: 'error', message });
    }
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});
exports.default = app;
