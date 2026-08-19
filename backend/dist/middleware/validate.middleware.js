"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        // Parse and replace body so defaults/coercions apply downstream
        req.body = await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: error.flatten().fieldErrors,
            });
            return;
        }
        next(error);
    }
};
exports.validate = validate;
