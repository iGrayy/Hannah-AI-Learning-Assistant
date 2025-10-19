import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, BarChart2, Settings, Book } from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Hannah Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/user-management" className="sidebar-link">
          <Users size={20} />
          <span>Quản lý Người dùng</span>
        </NavLink>
        <NavLink to="/admin/system-monitoring" className="sidebar-link">
          <BarChart2 size={20} />
          <span>Giám sát Hệ thống</span>
        </NavLink>
        <NavLink to="/admin/system-settings" className="sidebar-link">
          <Settings size={20} />
          <span>Cài đặt Hệ thống</span>
        </NavLink>
        <NavLink to="/admin/course-management" className="sidebar-link">
          <Book size={20} />
          <span>Quản lý Lộ trình</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
