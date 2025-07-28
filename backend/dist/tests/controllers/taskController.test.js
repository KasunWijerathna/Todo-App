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
const express_validator_1 = require("express-validator");
const taskController_1 = require("../../src/controllers/taskController");
const taskService = __importStar(require("../../src/services/taskService"));
// Mock express-validator
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));
// Mock the task service
jest.mock('../../src/services/taskService');
const mockValidationResult = express_validator_1.validationResult;
const mockTaskService = taskService;
describe('Task Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        jest.clearAllMocks();
        mockJson = jest.fn().mockReturnThis();
        mockStatus = jest.fn().mockReturnThis();
        mockResponse = {
            json: mockJson,
            status: mockStatus,
        };
    });
    describe('createTaskHandler', () => {
        it('should create a task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: false,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockRequest = {
                body: { title: 'Test Task', description: 'Test Description' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            mockTaskService.createTaskService.mockResolvedValueOnce(mockTask);
            yield (0, taskController_1.createTaskHandler)(mockRequest, mockResponse);
            expect(mockTaskService.createTaskService).toHaveBeenCalledWith('Test Task', 'Test Description');
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(mockTask);
        }));
        it('should handle validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest = {
                body: { title: '', description: 'Test Description' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Title is required' }],
            });
            yield (0, taskController_1.createTaskHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ errors: [{ msg: 'Title is required' }] });
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest = {
                body: { title: 'Test Task', description: 'Test Description' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            mockTaskService.createTaskService.mockRejectedValueOnce(new Error('Service error'));
            yield (0, taskController_1.createTaskHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to create task' });
        }));
    });
    describe('getRecentTasksHandler', () => {
        it('should get recent tasks successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTasks = [
                {
                    id: 1,
                    title: 'Task 1',
                    description: 'Description 1',
                    completed: false,
                    created_at: '2023-01-01T00:00:00Z',
                },
            ];
            mockTaskService.getRecentTasksService.mockResolvedValueOnce(mockTasks);
            yield (0, taskController_1.getRecentTasksHandler)(mockRequest, mockResponse);
            expect(mockTaskService.getRecentTasksService).toHaveBeenCalledWith(5);
            expect(mockJson).toHaveBeenCalledWith(mockTasks);
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockTaskService.getRecentTasksService.mockRejectedValueOnce(new Error('Service error'));
            yield (0, taskController_1.getRecentTasksHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to fetch tasks' });
        }));
    });
    describe('markTaskCompletedHandler', () => {
        it('should mark a task as completed successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTask = {
                id: 1,
                title: 'Test Task',
                description: 'Test Description',
                completed: true,
                created_at: '2023-01-01T00:00:00Z',
            };
            mockRequest = {
                params: { id: '1' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            mockTaskService.markTaskCompletedService.mockResolvedValueOnce(mockTask);
            yield (0, taskController_1.markTaskCompletedHandler)(mockRequest, mockResponse);
            expect(mockTaskService.markTaskCompletedService).toHaveBeenCalledWith(1);
            expect(mockJson).toHaveBeenCalledWith(mockTask);
        }));
        it('should handle validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest = {
                params: { id: 'invalid' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => [{ msg: 'Task ID must be an integer' }],
            });
            yield (0, taskController_1.markTaskCompletedHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ errors: [{ msg: 'Task ID must be an integer' }] });
        }));
        it('should handle task not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest = {
                params: { id: '999' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            mockTaskService.markTaskCompletedService.mockResolvedValueOnce(null);
            yield (0, taskController_1.markTaskCompletedHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Task not found' });
        }));
        it('should handle service errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest = {
                params: { id: '1' },
            };
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });
            mockTaskService.markTaskCompletedService.mockRejectedValueOnce(new Error('Service error'));
            yield (0, taskController_1.markTaskCompletedHandler)(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to mark task as completed' });
        }));
    });
});
