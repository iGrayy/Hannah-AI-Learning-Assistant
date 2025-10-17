import { useState, useEffect } from 'react';

// Custom hook để sử dụng localStorage với TypeScript
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State để lưu trữ giá trị
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy từ local storage theo key
      const item = window.localStorage.getItem(key);
      // Parse stored json hoặc nếu không có thì return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu có lỗi thì return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return một wrapped version của useState's setter function
  // mà sẽ persist giá trị mới vào localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép value là một function để có cùng API như useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save vào local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Một implementation nâng cao hơn sẽ handle error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
