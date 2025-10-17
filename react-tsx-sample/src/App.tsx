import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import UserForm from './components/UserForm';
import Counter from './components/Counter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User, Todo, FormData } from './types';

const App: React.FC = () => {
  // Sử dụng custom hook để lưu user vào localStorage
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  
  // State cho todos
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  // Mock login function
  const handleLogin = useCallback(() => {
    const mockUser: User = {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
    };
    setUser(mockUser);
  }, [setUser]);

  // Logout function
  const handleLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  // Todo functions
  const handleAddTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      userId: user?.id || 0,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  }, [user?.id, setTodos]);

  const handleToggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  // Form submit handler
  const handleFormSubmit = useCallback((data: FormData) => {
    alert(`Cảm ơn ${data.name}! Chúng tôi đã nhận được tin nhắn của bạn.`);
    console.log('Form data:', data);
  }, []);

  return (
    <div className="App">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="container">
        <div style={gridStyle}>
          <div style={leftColumnStyle}>
            <Counter initialValue={0} step={1} />
            <UserForm onSubmit={handleFormSubmit} />
          </div>
          
          <div style={rightColumnStyle}>
            {user ? (
              <TodoList
                todos={todos}
                onAddTodo={handleAddTodo}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            ) : (
              <div className="card">
                <h2>Chào mừng!</h2>
                <p>Vui lòng đăng nhập để sử dụng danh sách công việc.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
};

const leftColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const rightColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export default App;
