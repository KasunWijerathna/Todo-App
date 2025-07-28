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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getRecentTasks = getRecentTasks;
exports.markTaskCompleted = markTaskCompleted;
const db_1 = __importDefault(require("../models/db"));
function createTask(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        return result.rows[0];
    });
}
function getRecentTasks() {
    return __awaiter(this, arguments, void 0, function* (limit = 5) {
        const result = yield db_1.default.query('SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1', [limit]);
        return result.rows;
    });
}
function markTaskCompleted(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    });
}
