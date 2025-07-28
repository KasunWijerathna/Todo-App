import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form elements', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task description (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  it('should call onAdd with form data when submitted', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText('Enter task title');
    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith('Test Task', 'Test Description');
  });

  it('should not call onAdd when title is empty', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should not call onAdd when title is only whitespace', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText('Enter task title');
    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(titleInput, { target: { value: '   ' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should clear form after successful submission', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText('Enter task title') as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('should handle empty description', () => {
    render(<TaskForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText('Enter task title');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith('Test Task', '');
  });
}); 