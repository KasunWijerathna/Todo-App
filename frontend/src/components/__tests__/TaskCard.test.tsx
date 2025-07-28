import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../TaskCard';
import type { Task } from '../../types/task';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    created_at: '2023-01-01T00:00:00Z',
  };

  const mockOnDone = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render task information', () => {
    render(<TaskCard task={mockTask} onDone={mockOnDone} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('should call onDone when Done button is clicked', () => {
    render(<TaskCard task={mockTask} onDone={mockOnDone} />);

    const doneButton = screen.getByRole('button', { name: 'Done' });
    fireEvent.click(doneButton);

    expect(mockOnDone).toHaveBeenCalledWith(1);
  });

  it('should render task with empty description', () => {
    const taskWithEmptyDescription: Task = {
      ...mockTask,
      description: '',
    };

    render(<TaskCard task={taskWithEmptyDescription} onDone={mockOnDone} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('should render task with long description', () => {
    const taskWithLongDescription: Task = {
      ...mockTask,
      description: 'This is a very long description that might wrap to multiple lines and should be displayed properly in the task card component.',
    };

    render(<TaskCard task={taskWithLongDescription} onDone={mockOnDone} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(taskWithLongDescription.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });
}); 