import type { Task } from '../types/task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onDone: (id: number) => void;
}

export default function TaskList({ tasks, onDone }: TaskListProps) {
  return (
    <div>
      {tasks.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#6c757d',
          background: '#f8f9fa',
          borderRadius: 12,
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#495057' }}>
            No tasks yet
          </div>
          <div style={{ fontSize: 14 }}>
            Add your first task using the form on the left
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...tasks].reverse().map((task) => <TaskCard key={task.id} task={task} onDone={onDone} />)}
        </div>
      )}
    </div>
  );
}
