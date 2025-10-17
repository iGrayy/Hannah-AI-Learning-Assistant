import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (title: string) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="card">
      <h2>Danh sách công việc</h2>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          className="input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc mới..."
        />
        <button type="submit" className="button">
          Thêm
        </button>
      </form>

      <div style={todoListStyle}>
        {todos.length === 0 ? (
          <p style={emptyMessageStyle}>Chưa có công việc nào.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} style={todoItemStyle}>
              <div style={todoContentStyle}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  style={checkboxStyle}
                />
                <span
                  style={{
                    ...todoTitleStyle,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.6 : 1,
                  }}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={deleteButtonStyle}
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

const todoListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const todoItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

const todoContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const checkboxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
};

const todoTitleStyle: React.CSSProperties = {
  fontSize: '16px',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const emptyMessageStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#666',
  fontStyle: 'italic',
};

export default TodoList;
