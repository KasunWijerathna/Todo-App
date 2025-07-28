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
const task_1 = require("../../src/models/task");
// Mock the database pool
jest.mock('../../src/models/db', () => ({
    default: {
        query: jest.fn(),
    },
}));
// Import the mocked pool after the mock is set up
const db_1 = __importDefault(require("../../src/models/db"));
describe('Task Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createTask', () => {
        it('should create a new task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: false,
                created_at: '2023-01-01T00:00:00Z',
            };
            const mockQuery = db_1.default.query;
            mockQuery.mockResolvedValueOnce({
                rows: [mockTask],
                rowCount: 1,
            });
            const result = yield (0, task_1.createTask)('Test Task', 'Test Description');
            expect(mockQuery).toHaveBeenCalledWith('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', ['Test Task', 'Test Description']);
            expect(result).toEqual(mockTask);
        }));
        it('should handle database errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockQuery = db_1.default.query;
            mockQuery.mockRejectedValueOnce(new Error('Database error'));
            yield expect((0, task_1.createTask)('Test Task', 'Test Description')).rejects.toThrow('Database error');
        }));
    });
    describe('getRecentTasks', () => {
        it('should get recent incomplete tasks with default limit', () => __awaiter(void 0, void 0, void 0, function* () {
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
            const mockQuery = db_1.default.query;
            mockQuery.mockResolvedValueOnce({
                rows: mockTasks,
                rowCount: 2,
            });
            const result = yield (0, task_1.getRecentTasks)();
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1', [5]);
            expect(result).toEqual(mockTasks);
        }));
        it('should get recent incomplete tasks with custom limit', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTasks = [
                {
                    id: 1,
                    title: 'Task 1',
                    description: 'Description 1',
                    completed: false,
                    created_at: '2023-01-01T00:00:00Z',
                },
            ];
            const mockQuery = db_1.default.query;
            mockQuery.mockResolvedValueOnce({
                rows: mockTasks,
                rowCount: 1,
            });
            const result = yield (0, task_1.getRecentTasks)(1);
            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1', [1]);
            expect(result).toEqual(mockTasks);
        }));
    });
    describe('markTaskCompleted', () => {
        it('should mark a task as completed successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: true,
                created_at: '2023-01-01T00:00:00Z',
            };
            const mockQuery = db_1.default.query;
            mockQuery.mockResolvedValueOnce({
                rows: [mockTask],
                rowCount: 1,
            });
            const result = yield (0, task_1.markTaskCompleted)(1);
            expect(mockQuery).toHaveBeenCalledWith('UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *', [1]);
            expect(result).toEqual(mockTask);
        }));
        it('should return null when task is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockQuery = db_1.default.query;
            mockQuery.mockResolvedValueOnce({
                rows: [],
                rowCount: 0,
            });
            const result = yield (0, task_1.markTaskCompleted)(999);
            expect(mockQuery).toHaveBeenCalledWith('UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *', [999]);
            expect(result).toBeNull();
        }));
    });
});
