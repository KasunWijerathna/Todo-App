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
exports.createTaskService = createTaskService;
exports.getRecentTasksService = getRecentTasksService;
exports.markTaskCompletedService = markTaskCompletedService;
const task_1 = require("../models/task");
function createTaskService(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        // Add any business logic here (e.g., sanitization, logging)
        return (0, task_1.createTask)(title, description);
    });
}
function getRecentTasksService() {
    return __awaiter(this, arguments, void 0, function* (limit = 5) {
        return (0, task_1.getRecentTasks)(limit);
    });
}
function markTaskCompletedService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, task_1.markTaskCompleted)(id);
    });
}
