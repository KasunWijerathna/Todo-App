import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';
import type { Task } from '../../types/task';

describe('TaskList', () => {
  const mockOnDone = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when no tasks', () => {
    render(<TaskList tasks={[]} onDone={mockOnDone} />);

    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
  });

  it('should render multiple tasks', () => {
    const tasks: Task[] = [
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

    render(<TaskList tasks={tasks} onDone={mockOnDone} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Done' })).toHaveLength(2);
  });

  it('should render single task', () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Single Task',
        description: 'Single Description',
        completed: false,
        created_at: '2023-01-01T00:00:00Z',
      },
    ];

    render(<TaskList tasks={tasks} onDone={mockOnDone} />);

    expect(screen.getByText('Single Task')).toBeInTheDocument();
    expect(screen.getByText('Single Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });
}); 