"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const taskRoutes_1 = __importDefault(require("../../src/routes/taskRoutes"));
const taskService = __importStar(require("../../src/services/taskService"));
// Mock the task service
jest.mock('../../src/services/taskService');
const mockTaskService = taskService;
// Create a test app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/tasks', taskRoutes_1.default);
describe('Task Routes Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /api/tasks', () => {
        it('should create a new task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: false,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockTaskService.createTaskService.mockResolvedValueOnce(mockTask);
            const response = yield (0, supertest_1.default)(app)
                .post('/api/tasks')
                .send({ title: 'Test Task', description: 'Test Description' })
                .expect(201);
            expect(response.body).toEqual(mockTask);
            expect(mockTaskService.createTaskService).toHaveBeenCalledWith('Test Task', 'Test Description');
        }));
        it('should return 400 when title is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/api/tasks')
                .send({ description: 'Test Description' })
                .expect(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('Title is required');
        }));
        it('should return 400 when title is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post('/api/tasks')
                .send({ title: '', description: 'Test Description' })
                .expect(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('Title is required');
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskService.createTaskService.mockRejectedValueOnce(new Error('Service error'));
            const response = yield (0, supertest_1.default)(app)
                .post('/api/tasks')
                .send({ title: 'Test Task', description: 'Test Description' })
                .expect(500);
            expect(response.body.error).toBe('Failed to create task');
        }));
    });
    describe('GET /api/tasks', () => {
        it('should get recent tasks successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTasks = [
                {
                    id: 1,
                    title: 'Task 1',
                    description: 'Description 1',
                    completed: false,
                    created_at: '2023-01-01T00:00:00Z',
                },
                {
                    id: 2,
                    title: 'Task 2',
                    description: 'Description 2',
                    completed: false,
                    created_at: '2023-01-02T00:00:00Z',
                },
            ];
            mockTaskService.getRecentTasksService.mockResolvedValueOnce(mockTasks);
            const response = yield (0, supertest_1.default)(app).get('/api/tasks').expect(200);
            expect(response.body).toEqual(mockTasks);
            expect(mockTaskService.getRecentTasksService).toHaveBeenCalledWith(5);
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskService.getRecentTasksService.mockRejectedValueOnce(new Error('Service error'));
            const response = yield (0, supertest_1.default)(app).get('/api/tasks').expect(500);
            expect(response.body.error).toBe('Failed to fetch tasks');
        }));
    });
    describe('PATCH /api/tasks/:id/complete', () => {
        it('should mark a task as completed successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: true,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockTaskService.markTaskCompletedService.mockResolvedValueOnce(mockTask);
            const response = yield (0, supertest_1.default)(app).patch('/api/tasks/1/complete').expect(200);
            expect(response.body).toEqual(mockTask);
            expect(mockTaskService.markTaskCompletedService).toHaveBeenCalledWith(1);
        }));
        it('should return 400 when task ID is not an integer', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).patch('/api/tasks/invalid/complete').expect(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('Task ID must be an integer');
        }));
        it('should return 404 when task is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskService.markTaskCompletedService.mockResolvedValueOnce(null);
            const response = yield (0, supertest_1.default)(app).patch('/api/tasks/999/complete').expect(404);
            expect(response.body.error).toBe('Task not found');
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskService.markTaskCompletedService.mockRejectedValueOnce(new Error('Service error'));
            const response = yield (0, supertest_1.default)(app).patch('/api/tasks/1/complete').expect(500);
            expect(response.body.error).toBe('Failed to mark task as completed');
        }));
    });
});
