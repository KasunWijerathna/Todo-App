"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskHandler = createTaskHandler;
exports.getRecentTasksHandler = getRecentTasksHandler;
exports.markTaskCompletedHandler = markTaskCompletedHandler;
const express_validator_1 = require("express-validator");
const taskService_1 = require("../services/taskService");
function createTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description } = req.body;
            const task = yield (0, taskService_1.createTaskService)(title, description || '');
            res.status(201).json(task);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create task' });
        }
    });
}
function getRecentTasksHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield (0, taskService_1.getRecentTasksService)(5);
            res.json(tasks);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    });
}
function markTaskCompletedHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const id = parseInt(req.params.id, 10);
            const task = yield (0, taskService_1.markTaskCompletedService)(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to mark task as completed' });
        }
    });
}
