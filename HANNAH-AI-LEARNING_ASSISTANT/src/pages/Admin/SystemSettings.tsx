import React from 'react';
import { Settings, AlertTriangle } from 'lucide-react';
import './UnderDevelopment.css';

const SystemSettings: React.FC = () => {
  return (
    <div className="under-development">
      <div className="under-development-content">
        <div className="icon-container">
          <Settings size={64} />
        </div>
        <h1>Cài đặt Hệ thống</h1>
        <div className="status-badge developing">
          <AlertTriangle size={16} />
          <span>Đang phát triển</span>
        </div>
        <p>Tính năng cài đặt hệ thống đang được phát triển và sẽ sớm có mặt trong phiên bản tiếp theo.</p>
        <div className="features-preview">
          <h3>Tính năng sắp có:</h3>
          <ul>
            <li>Cấu hình hệ thống chung</li>
            <li>Quản lý cài đặt bảo mật</li>
            <li>Cấu hình email và thông báo</li>
            <li>Quản lý backup và restore</li>
            <li>Cài đặt giao diện</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
