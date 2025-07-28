import axios from 'axios';
import { fetchTasks, addTask, completeTask } from '../tasks';
import type { Task } from '../../types/task';

// Mock axios
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Tasks API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTasks', () => {
    it('should fetch tasks successfully', async () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          completed: false,
          created_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockAxios.get.mockResolvedValueOnce({ data: mockTasks });

      const result = await fetchTasks();

      expect(mockAxios.get).toHaveBeenCalledWith('/api/tasks');
      expect(result).toEqual(mockTasks);
    });

    it('should handle API errors', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchTasks()).rejects.toThrow('Network error');
    });
  });

  describe('addTask', () => {
    it('should add a task successfully', async () => {
      const mockTask: Task = {
        id: 1,
        title: 'New Task',
        description: 'New Description',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockAxios.post.mockResolvedValueOnce({ data: mockTask });

      const result = await addTask('New Task', 'New Description');

      expect(mockAxios.post).toHaveBeenCalledWith('/api/tasks', {
        title: 'New Task',
        description: 'New Description',
      });
      expect(result).toEqual(mockTask);
    });

    it('should handle API errors', async () => {
      mockAxios.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(addTask('New Task', 'New Description')).rejects.toThrow('Network error');
    });
  });

  describe('completeTask', () => {
    it('should complete a task successfully', async () => {
      const mockTask: Task = {
        id: 1,
        title: 'Completed Task',
        description: 'Completed Description',
        completed: true,
        created_at: '2023-01-01T00:00:00Z',
      };

      mockAxios.patch.mockResolvedValueOnce({ data: mockTask });

      const result = await completeTask(1);

      expect(mockAxios.patch).toHaveBeenCalledWith('/api/tasks/1/complete');
      expect(result).toEqual(mockTask);
    });

    it('should handle API errors', async () => {
      mockAxios.patch.mockRejectedValueOnce(new Error('Network error'));

      await expect(completeTask(1)).rejects.toThrow('Network error');
    });
  });
}); 