"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// Create a new task
router.post('/', [(0, express_validator_1.body)('title').notEmpty().withMessage('Title is required')], taskController_1.createTaskHandler);
// Get the 5 most recent incomplete tasks
router.get('/', taskController_1.getRecentTasksHandler);
// Mark a task as completed
router.patch('/:id/complete', [(0, express_validator_1.param)('id').isInt().withMessage('Task ID must be an integer')], taskController_1.markTaskCompletedHandler);
exports.default = router;
