import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  createTaskHandler,
  getRecentTasksHandler,
  markTaskCompletedHandler,
} from '../../src/controllers/taskController';
import * as taskService from '../../src/services/taskService';

// Mock express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

// Mock the task service
jest.mock('../../src/services/taskService');

const mockValidationResult = validationResult as jest.MockedFunction<typeof validationResult>;
const mockTaskService = taskService as jest.Mocked<typeof taskService>;

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

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
    it('should create a task successfully', async () => {
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
      } as any);

      mockTaskService.createTaskService.mockResolvedValueOnce(mockTask);

      await createTaskHandler(mockRequest as Request, mockResponse as Response);

      expect(mockTaskService.createTaskService).toHaveBeenCalledWith('Test Task', 'Test Description');
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockTask);
    });

    it('should handle validation errors', async () => {
      mockRequest = {
        body: { title: '', description: 'Test Description' },
      };

      mockValidationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Title is required' }],
      } as any);

      await createTaskHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ errors: [{ msg: 'Title is required' }] });
    });

    it('should handle service errors', async () => {
      mockRequest = {
        body: { title: 'Test Task', description: 'Test Description' },
      };

      mockValidationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => [],
      } as any);

      mockTaskService.createTaskService.mockRejectedValueOnce(new Error('Service error'));

      await createTaskHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to create task' });
    });
  });

  describe('getRecentTasksHandler', () => {
    it('should get recent tasks successfully', async () => {
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

      await getRecentTasksHandler(mockRequest as Request, mockResponse as Response);

      expect(mockTaskService.getRecentTasksService).toHaveBeenCalledWith(5);
      expect(mockJson).toHaveBeenCalledWith(mockTasks);
    });

    it('should handle service errors', async () => {
      mockTaskService.getRecentTasksService.mockRejectedValueOnce(new Error('Service error'));

      await getRecentTasksHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to fetch tasks' });
    });
  });

  describe('markTaskCompletedHandler', () => {
    it('should mark a task as completed successfully', async () => {
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
      } as any);

      mockTaskService.markTaskCompletedService.mockResolvedValueOnce(mockTask);

      await markTaskCompletedHandler(mockRequest as Request, mockResponse as Response);

      expect(mockTaskService.markTaskCompletedService).toHaveBeenCalledWith(1);
      expect(mockJson).toHaveBeenCalledWith(mockTask);
    });

    it('should handle validation errors', async () => {
      mockRequest = {
        params: { id: 'invalid' },
      };

      mockValidationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Task ID must be an integer' }],
      } as any);

      await markTaskCompletedHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ errors: [{ msg: 'Task ID must be an integer' }] });
    });

    it('should handle task not found', async () => {
      mockRequest = {
        params: { id: '999' },
      };

      mockValidationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => [],
      } as any);

      mockTaskService.markTaskCompletedService.mockResolvedValueOnce(null);

      await markTaskCompletedHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Task not found' });
    });

    it('should handle service errors', async () => {
      mockRequest = {
        params: { id: '1' },
      };

      mockValidationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => [],
      } as any);

      mockTaskService.markTaskCompletedService.mockRejectedValueOnce(new Error('Service error'));

      await markTaskCompletedHandler(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to mark task as completed' });
    });
  });
}); 