# React TypeScript Sample Application

Đây là một ứng dụng ReactJS mẫu được viết bằng TypeScript, bao gồm các tính năng cơ bản và best practices.

## Tính năng

- ✅ **TypeScript**: Type safety cho toàn bộ ứng dụng
- ✅ **Custom Hooks**: useLocalStorage, useFetch
- ✅ **Component Library**: Header, TodoList, Counter, UserForm
- ✅ **State Management**: useState, useCallback với TypeScript
- ✅ **Form Handling**: Validation và error handling
- ✅ **Local Storage**: Lưu trữ dữ liệu người dùng và todos
- ✅ **Responsive Design**: CSS responsive cơ bản

## Cấu trúc thư mục

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── TodoList.tsx
│   ├── Counter.tsx
│   └── UserForm.tsx
├── hooks/              # Custom hooks
│   ├── useLocalStorage.ts
│   └── useFetch.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── index.css           # Global styles
```

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Mở trình duyệt tại `http://localhost:3000`

## Các component chính

### Header
- Hiển thị tiêu đề ứng dụng
- Nút đăng nhập/đăng xuất
- Hiển thị thông tin người dùng

### TodoList
- Thêm, xóa, đánh dấu hoàn thành công việc
- Lưu trữ trong localStorage
- Chỉ hiển thị khi đã đăng nhập

### Counter
- Bộ đếm đơn giản với tăng/giảm/reset
- Sử dụng useCallback để tối ưu performance

### UserForm
- Form liên hệ với validation
- Xử lý lỗi và hiển thị thông báo

## Custom Hooks

### useLocalStorage
- Lưu trữ state vào localStorage
- Tự động sync giữa state và localStorage

### useFetch
- Hook để fetch data từ API
- Quản lý loading, error states

## TypeScript Types

Tất cả các types được định nghĩa trong `src/types/index.ts`:
- User, Todo, FormData interfaces
- API response types
- Theme types

## Scripts

- `npm start`: Chạy ứng dụng ở chế độ development
- `npm build`: Build ứng dụng cho production
- `npm test`: Chạy tests
- `npm eject`: Eject từ Create React App (không khuyến nghị)
