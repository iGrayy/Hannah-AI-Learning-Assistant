// Định nghĩa các types cho ứng dụng

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type Theme = 'light' | 'dark';

export interface AppContextType {
  user: User | null;
  theme: Theme;
  setUser: (user: User | null) => void;
  setTheme: (theme: Theme) => void;
}
