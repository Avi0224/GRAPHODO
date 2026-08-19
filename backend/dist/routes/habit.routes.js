"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habit_controller_1 = require("../controllers/habit.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const habit_schema_1 = require("../schemas/habit.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protect);
router.route('/')
    .post((0, validate_middleware_1.validate)(habit_schema_1.createHabitSchema), habit_controller_1.createHabit)
    .get(habit_controller_1.getHabits);
router.route('/:id')
    .get(habit_controller_1.getHabitById)
    .patch((0, validate_middleware_1.validate)(habit_schema_1.updateHabitSchema), habit_controller_1.updateHabit)
    .delete(habit_controller_1.deleteHabit);
router.route('/:id/toggle')
    .post((0, validate_middleware_1.validate)(habit_schema_1.toggleHabitSchema), habit_controller_1.toggleHabitDate);
exports.default = router;
