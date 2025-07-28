import { Task, createTask, getRecentTasks, markTaskCompleted } from '../models/task';

export async function createTaskService(title: string, description: string): Promise<Task> {
  // Add any business logic here (e.g., sanitization, logging)
  return createTask(title, description);
}

export async function getRecentTasksService(limit = 5): Promise<Task[]> {
  return getRecentTasks(limit);
}

export async function markTaskCompletedService(id: number): Promise<Task | null> {
  return markTaskCompleted(id);
} 