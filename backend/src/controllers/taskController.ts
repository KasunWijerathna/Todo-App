import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createTaskService, getRecentTasksService, markTaskCompletedService } from '../services/taskService';

export async function createTaskHandler(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description } = req.body;
    const task = await createTaskService(title, description || '');
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getRecentTasksHandler(req: Request, res: Response) {
  try {
    const tasks = await getRecentTasksService(5);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function markTaskCompletedHandler(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = parseInt(req.params.id, 10);
    const task = await markTaskCompletedService(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark task as completed' });
  }
} 