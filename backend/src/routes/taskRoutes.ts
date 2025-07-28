import { Router } from 'express';
import { body, param } from 'express-validator';
import { createTaskHandler, getRecentTasksHandler, markTaskCompletedHandler } from '../controllers/taskController';

const router = Router();

// Create a new task
router.post(
  '/',
  [body('title').notEmpty().withMessage('Title is required')],
  createTaskHandler
);

// Get the 5 most recent incomplete tasks
router.get('/', getRecentTasksHandler);

// Mark a task as completed
router.patch(
  '/:id/complete',
  [param('id').isInt().withMessage('Task ID must be an integer')],
  markTaskCompletedHandler
);

export default router; 