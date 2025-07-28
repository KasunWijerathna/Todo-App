import React from 'react';
import { useState } from 'react';

interface TaskFormProps {
  onAdd: (title: string, description: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ 
            width: '100%',
            padding: 12, 
            fontSize: 16,
            border: '1px solid #ddd',
            borderRadius: 8,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0047FF'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>
      
      <div>
        <label htmlFor="description" style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ 
            width: '100%',
            padding: 12, 
            fontSize: 16, 
            resize: 'vertical',
            border: '1px solid #ddd',
            borderRadius: 8,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0047FF'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>
      
      <button
        type="submit"
        style={{
          background: '#0047FF',
          color: 'white',
          padding: 12,
          fontSize: 16,
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginTop: 8
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#0033CC'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#0047FF'}
      >
        Add Task
      </button>
    </form>
  );
}
