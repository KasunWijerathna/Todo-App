import {
  createTaskService,
  getRecentTasksService,
  markTaskCompletedService,
} from '../../src/services/taskService';
import * as taskModel from '../../src/models/task';

// Mock the task model
jest.mock('../../src/models/task');

const mockTaskModel = taskModel as jest.Mocked<typeof taskModel>;

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTaskService', () => {
    it('should create a task successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockTaskModel.createTask.mockResolvedValueOnce(mockTask);

      const result = await createTaskService('Test Task', 'Test Description');

      expect(mockTaskModel.createTask).toHaveBeenCalledWith('Test Task', 'Test Description');
      expect(result).toEqual(mockTask);
    });

    it('should handle empty description', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: '',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockTaskModel.createTask.mockResolvedValueOnce(mockTask);

      const result = await createTaskService('Test Task', '');

      expect(mockTaskModel.createTask).toHaveBeenCalledWith('Test Task', '');
      expect(result).toEqual(mockTask);
    });
  });

  describe('getRecentTasksService', () => {
    it('should get recent tasks with default limit', async () => {
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

      const result = await getRecentTasksService();

      expect(mockTaskModel.getRecentTasks).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockTasks);
    });

    it('should get recent tasks with custom limit', async () => {
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

      const result = await getRecentTasksService(1);

      expect(mockTaskModel.getRecentTasks).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTasks);
    });
  });

  describe('markTaskCompletedService', () => {
    it('should mark a task as completed successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: true,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockTaskModel.markTaskCompleted.mockResolvedValueOnce(mockTask);

      const result = await markTaskCompletedService(1);

      expect(mockTaskModel.markTaskCompleted).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTask);
    });

    it('should return null when task is not found', async () => {
      mockTaskModel.markTaskCompleted.mockResolvedValueOnce(null);

      const result = await markTaskCompletedService(999);

      expect(mockTaskModel.markTaskCompleted).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });
}); 