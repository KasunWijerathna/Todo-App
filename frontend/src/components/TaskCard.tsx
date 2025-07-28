import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDone: (id: number) => void;
}

export default function TaskCard({ task, onDone }: TaskCardProps) {
  return (
    <div
      style={{
        background: '#f8f9fa',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ 
        fontWeight: 700, 
        fontSize: 18, 
        marginBottom: 8,
        color: '#212529',
        lineHeight: 1.3
      }}>
        {task.title}
      </div>
      <div style={{ 
        color: '#6c757d', 
        marginBottom: 16,
        lineHeight: 1.5,
        fontSize: 14
      }}>
        {task.description || 'No description provided'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onDone(task.id)}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'background-color 0.2s',
            minWidth: '80px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
        >
          Done
        </button>
      </div>
    </div>
  );
}
