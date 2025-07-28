import request from 'supertest';
import express from 'express';
import cors from 'cors';
import taskRoutes from '../../src/routes/taskRoutes';
import * as taskService from '../../src/services/taskService';

// Mock the task service
jest.mock('../../src/services/taskService');

const mockTaskService = taskService as jest.Mocked<typeof taskService>;

// Create a test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockTaskService.createTaskService.mockResolvedValueOnce(mockTask);

      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task', description: 'Test Description' })
        .expect(201);

      expect(response.body).toEqual(mockTask);
      expect(mockTaskService.createTaskService).toHaveBeenCalledWith('Test Task', 'Test Description');
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'Test Description' })
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe('Title is required');
    });

    it('should return 400 when title is empty', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '', description: 'Test Description' })
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe('Title is required');
    });

    it('should handle service errors', async () => {
      mockTaskService.createTaskService.mockRejectedValueOnce(new Error('Service error'));

      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task', description: 'Test Description' })
        .expect(500);

      expect(response.body.error).toBe('Failed to create task');
    });
  });

  describe('GET /api/tasks', () => {
    it('should get recent tasks successfully', async () => {
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

      const response = await request(app).get('/api/tasks').expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(mockTaskService.getRecentTasksService).toHaveBeenCalledWith(5);
    });

    it('should handle service errors', async () => {
      mockTaskService.getRecentTasksService.mockRejectedValueOnce(new Error('Service error'));

      const response = await request(app).get('/api/tasks').expect(500);

      expect(response.body.error).toBe('Failed to fetch tasks');
    });
  });

  describe('PATCH /api/tasks/:id/complete', () => {
    it('should mark a task as completed successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: true,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockTaskService.markTaskCompletedService.mockResolvedValueOnce(mockTask);

      const response = await request(app).patch('/api/tasks/1/complete').expect(200);

      expect(response.body).toEqual(mockTask);
      expect(mockTaskService.markTaskCompletedService).toHaveBeenCalledWith(1);
    });

    it('should return 400 when task ID is not an integer', async () => {
      const response = await request(app).patch('/api/tasks/invalid/complete').expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe('Task ID must be an integer');
    });

    it('should return 404 when task is not found', async () => {
      mockTaskService.markTaskCompletedService.mockResolvedValueOnce(null);

      const response = await request(app).patch('/api/tasks/999/complete').expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should handle service errors', async () => {
      mockTaskService.markTaskCompletedService.mockRejectedValueOnce(new Error('Service error'));

      const response = await request(app).patch('/api/tasks/1/complete').expect(500);

      expect(response.body.error).toBe('Failed to mark task as completed');
    });
  });
}); 