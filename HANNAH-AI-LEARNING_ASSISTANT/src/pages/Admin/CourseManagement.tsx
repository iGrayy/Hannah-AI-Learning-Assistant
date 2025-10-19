import React from 'react';
import { Book, AlertTriangle } from 'lucide-react';
import './UnderDevelopment.css';

const CourseManagement: React.FC = () => {
  return (
    <div className="under-development">
      <div className="under-development-content">
        <div className="icon-container">
          <Book size={64} />
        </div>
        <h1>Quản lý Lộ trình Khóa học</h1>
        <div className="status-badge developing">
          <AlertTriangle size={16} />
          <span>Đang phát triển</span>
        </div>
        <p>Tính năng quản lý lộ trình khóa học đang được phát triển và sẽ sớm có mặt trong phiên bản tiếp theo.</p>
        <div className="features-preview">
          <h3>Tính năng sắp có:</h3>
          <ul>
            <li>Tạo và quản lý khóa học</li>
            <li>Thiết kế lộ trình học tập</li>
            <li>Quản lý nội dung bài học</li>
            <li>Phân công giảng viên</li>
            <li>Theo dõi tiến độ học tập</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
