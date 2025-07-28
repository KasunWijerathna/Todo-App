import { createTask, getRecentTasks, markTaskCompleted } from '../../src/models/task';

// Mock the database pool
jest.mock('../../src/models/db', () => ({
  default: {
    query: jest.fn(),
  },
}));

// Import the mocked pool after the mock is set up
import pool from '../../src/models/db';

describe('Task Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a new task successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      };

      const mockQuery = pool.query as any;
      mockQuery.mockResolvedValueOnce({
        rows: [mockTask],
        rowCount: 1,
      });

      const result = await createTask('Test Task', 'Test Description');

      expect(mockQuery).toHaveBeenCalledWith(
        'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
        ['Test Task', 'Test Description']
      );
      expect(result).toEqual(mockTask);
    });

    it('should handle database errors', async () => {
      const mockQuery = pool.query as any;
      mockQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(createTask('Test Task', 'Test Description')).rejects.toThrow('Database error');
    });
  });

  describe('getRecentTasks', () => {
    it('should get recent incomplete tasks with default limit', async () => {
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

      const mockQuery = pool.query as any;
      mockQuery.mockResolvedValueOnce({
        rows: mockTasks,
        rowCount: 2,
      });

      const result = await getRecentTasks();

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1',
        [5]
      );
      expect(result).toEqual(mockTasks);
    });

    it('should get recent incomplete tasks with custom limit', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          completed: false,
          created_at: '2023-01-01T00:00:00Z',
        },
      ];

      const mockQuery = pool.query as any;
      mockQuery.mockResolvedValueOnce({
        rows: mockTasks,
        rowCount: 1,
      });

      const result = await getRecentTasks(1);

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1',
        [1]
      );
      expect(result).toEqual(mockTasks);
    });
  });

  describe('markTaskCompleted', () => {
    it('should mark a task as completed successfully', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: true,
        created_at: '2023-01-01T00:00:00Z',
      };

      const mockQuery = pool.query as any;
      mockQuery.mockResolvedValueOnce({
        rows: [mockTask],
        rowCount: 1,
      });

      const result = await markTaskCompleted(1);

      expect(mockQuery).toHaveBeenCalledWith(
        'UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *',
        [1]
      );
      expect(result).toEqual(mockTask);
    });

    it('should return null when task is not found', async () => {
      const mockQuery = pool.query as any;
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const result = await markTaskCompleted(999);

      expect(mockQuery).toHaveBeenCalledWith(
        'UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *',
        [999]
      );
      expect(result).toBeNull();
    });
  });
}); 