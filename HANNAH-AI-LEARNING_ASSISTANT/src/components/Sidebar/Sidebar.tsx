import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GraduationCap size={28} className="logo-icon" />
          <div className="logo-text">
            <h2 className="sidebar-title">{title}</h2>
            <p className="sidebar-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {children}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-role">{user.role}</p>
            </div>
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout} title="Đăng xuất">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
