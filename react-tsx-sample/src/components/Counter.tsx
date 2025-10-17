import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return (
    <div className="card">
      <h2>Bộ đếm</h2>
      <div style={counterContainerStyle}>
        <div style={countDisplayStyle}>
          <span style={countStyle}>{count}</span>
        </div>
        <div style={buttonGroupStyle}>
          <button className="button" onClick={decrement}>
            -
          </button>
          <button className="button" onClick={reset} style={resetButtonStyle}>
            Reset
          </button>
          <button className="button" onClick={increment}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const counterContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const countDisplayStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '2px solid #dee2e6',
};

const countStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#007bff',
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const resetButtonStyle: React.CSSProperties = {
  backgroundColor: '#6c757d',
};

export default Counter;
