import pool from '../models/db';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export async function createTask(title: string, description: string): Promise<Task> {
  const result = await pool.query(
    'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );
  return result.rows[0];
}

export async function getRecentTasks(limit = 5): Promise<Task[]> {
  const result = await pool.query(
    'SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
}

export async function markTaskCompleted(id: number): Promise<Task | null> {
  const result = await pool.query(
    'UPDATE task SET completed = TRUE WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
} 