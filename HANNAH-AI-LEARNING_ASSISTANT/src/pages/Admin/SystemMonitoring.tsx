import React from 'react';
import { BarChart2, AlertTriangle } from 'lucide-react';
import './UnderDevelopment.css';

const SystemMonitoring: React.FC = () => {
  return (
    <div className="under-development">
      <div className="under-development-content">
        <div className="icon-container">
          <BarChart2 size={64} />
        </div>
        <h1>Giám sát Hệ thống</h1>
        <div className="status-badge developing">
          <AlertTriangle size={16} />
          <span>Đang phát triển</span>
        </div>
        <p>Tính năng giám sát hệ thống đang được phát triển và sẽ sớm có mặt trong phiên bản tiếp theo.</p>
        <div className="features-preview">
          <h3>Tính năng sắp có:</h3>
          <ul>
            <li>Theo dõi hiệu suất hệ thống</li>
            <li>Giám sát tài nguyên server</li>
            <li>Thống kê truy cập người dùng</li>
            <li>Cảnh báo lỗi hệ thống</li>
            <li>Báo cáo hoạt động</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;
