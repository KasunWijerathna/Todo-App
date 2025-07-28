import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks, addTask, completeTask } from '../api/tasks';
import type { Task } from '../types/task';

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (title: string, description: string) => {
    try {
      await addTask(title, description);
      loadTasks();
    } catch {
      setError('Failed to add task');
    }
  };

  const handleDone = async (id: number) => {
    try {
      await completeTask(id);
      setTasks((tasks) => tasks.filter((t) => t.id !== id));
    } catch {
      setError('Failed to complete task');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fafbfc',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'white',
          padding: '20px 0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #eee',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <h1 style={{ margin: 0, color: '#333', fontSize: '2rem' }}>
            Todo App
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '20px',
          gap: '20px',
        }}
      >
        {/* Left: Add Task */}
        <div
          className="task-form-container"
          style={{
            flex: '1',
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            height: 'fit-content',
            minWidth: '300px',
          }}
        >
          <h2 style={{ marginBottom: '24px', color: '#333' }}>Add a Task</h2>
          <TaskForm onAdd={handleAdd} />
        </div>

        {/* Right: Task List */}
        <div
          className="task-container"
          style={{
            flex: '2',
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '400px',
          }}
        >
          <h2 style={{ marginBottom: '24px', color: '#333' }}>Tasks</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading...
            </div>
          ) : error ? (
            <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
              {error}
            </div>
          ) : (
            <TaskList tasks={tasks} onDone={handleDone} />
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
 