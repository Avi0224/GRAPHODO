"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Don't return password by default
    },
    avatar: {
        type: String,
    },
    googleId: {
        type: String,
    },
}, {
    timestamps: true,
});
// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password)
        return false;
    return await bcryptjs_1.default.compare(candidatePassword, this.password);
};
exports.User = mongoose_1.default.model('User', UserSchema);
