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
Object.defineProperty(exports, "__esModule", { value: true });
const taskService_1 = require("../../src/services/taskService");
const taskModel = __importStar(require("../../src/models/task"));
// Mock the task model
jest.mock('../../src/models/task');
const mockTaskModel = taskModel;
describe('Task Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createTaskService', () => {
        it('should create a task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: false,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockTaskModel.createTask.mockResolvedValueOnce(mockTask);
            const result = yield (0, taskService_1.createTaskService)('Test Task', 'Test Description');
            expect(mockTaskModel.createTask).toHaveBeenCalledWith('Test Task', 'Test Description');
            expect(result).toEqual(mockTask);
        }));
        it('should handle empty description', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: '',
                completed: false,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockTaskModel.createTask.mockResolvedValueOnce(mockTask);
            const result = yield (0, taskService_1.createTaskService)('Test Task', '');
            expect(mockTaskModel.createTask).toHaveBeenCalledWith('Test Task', '');
            expect(result).toEqual(mockTask);
        }));
    });
    describe('getRecentTasksService', () => {
        it('should get recent tasks with default limit', () => __awaiter(void 0, void 0, void 0, function* () {
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
            mockTaskModel.getRecentTasks.mockResolvedValueOnce(mockTasks);
            const result = yield (0, taskService_1.getRecentTasksService)();
            expect(mockTaskModel.getRecentTasks).toHaveBeenCalledWith(5);
            expect(result).toEqual(mockTasks);
        }));
        it('should get recent tasks with custom limit', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTasks = [
                {
                    id: 1,
                    title: 'Task 1',
                    description: 'Description 1',
                    completed: false,
                    created_at: '2023-01-01T00:00:00Z',
                },
            ];
            mockTaskModel.getRecentTasks.mockResolvedValueOnce(mockTasks);
            const result = yield (0, taskService_1.getRecentTasksService)(1);
            expect(mockTaskModel.getRecentTasks).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTasks);
        }));
    });
    describe('markTaskCompletedService', () => {
        it('should mark a task as completed successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: true,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockTaskModel.markTaskCompleted.mockResolvedValueOnce(mockTask);
            const result = yield (0, taskService_1.markTaskCompletedService)(1);
            expect(mockTaskModel.markTaskCompleted).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTask);
        }));
        it('should return null when task is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskModel.markTaskCompleted.mockResolvedValueOnce(null);
            const result = yield (0, taskService_1.markTaskCompletedService)(999);
            expect(mockTaskModel.markTaskCompleted).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        }));
    });
});
