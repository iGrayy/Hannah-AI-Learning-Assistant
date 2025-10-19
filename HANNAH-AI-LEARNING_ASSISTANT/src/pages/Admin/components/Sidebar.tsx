import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, BarChart2, Settings, Book, ChevronDown, ChevronRight, Activity, Key } from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);

  const toggleMonitoring = () => {
    setIsMonitoringOpen(!isMonitoringOpen);
  };

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
        
        <div className="sidebar-group">
          <button 
            className={`sidebar-link sidebar-toggle ${isMonitoringOpen ? 'active' : ''}`}
            onClick={toggleMonitoring}
          >
            <BarChart2 size={20} />
            <span>Giám sát Hệ thống</span>
            {isMonitoringOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          <div className={`sidebar-submenu ${isMonitoringOpen ? 'open' : ''}`}>
            <NavLink to="/admin/system-monitoring/api-keys" className="sidebar-sublink">
              <Key size={18} />
              <span>API Keys</span>
            </NavLink>
            <NavLink to="/admin/system-monitoring/usage" className="sidebar-sublink">
              <Activity size={18} />
              <span>Usage</span>
            </NavLink>
          </div>
        </div>
        
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
