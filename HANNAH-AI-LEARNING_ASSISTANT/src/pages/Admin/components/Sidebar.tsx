import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, BarChart2, Settings, Book, ChevronDown, ChevronRight, Activity, Key } from 'lucide-react';
import ReusableSidebar from '../../../components/Sidebar/Sidebar';

const AdminSidebar: React.FC = () => {
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);

  const toggleMonitoring = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMonitoringOpen(!isMonitoringOpen);
  };

  return (
    <ReusableSidebar title="Hannah" subtitle="Admin Portal">
      <div className="nav-section">
        <span className="nav-section-title">MENU</span>
        <NavLink to="/admin/user-management" className="sidebar-link">
          <Users size={20} />
          <span className="sidebar-label">Quản lý Người dùng</span>
        </NavLink>

        <div className="sidebar-group">
          <a
            href="#"
            className={`sidebar-link sidebar-toggle ${isMonitoringOpen ? 'active' : ''}`}
            onClick={toggleMonitoring}
          >
            <BarChart2 size={20} />
            <span className="sidebar-label">Giám sát Hệ thống</span>
            {isMonitoringOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </a>

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
          <span className="sidebar-label">Cài đặt Hệ thống</span>
        </NavLink>
        <NavLink to="/admin/course-management" className="sidebar-link">
          <Book size={20} />
          <span className="sidebar-label">Quản lý Lộ trình</span>
        </NavLink>
      </div>
    </ReusableSidebar>
  );
};

export default AdminSidebar;
