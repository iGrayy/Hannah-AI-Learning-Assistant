import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  GraduationCap,
  LogOut,
  User
} from 'lucide-react';
import { useFacultyContext } from '../../../contexts/FacultyContext';
import './Sidebar.css';

interface MenuItem {
  path: string;
  label: string;
  badge: number | null;
  description: string;
}

const Sidebar: React.FC = () => {
  const { flaggedConversationsCount } = useFacultyContext();

  const menuItems: MenuItem[] = [
    {
      path: '/faculty/faq',
    //   icon: <MessageSquare size={20} />,
      label: 'Quản lý FAQ',
      badge: null,
      description: 'Quản lý câu hỏi thường gặp'
    },
    {
      path: '/faculty/conversations',
    //   icon: <Flag size={20} />,
      label: 'Hội thoại gắn cờ',
      badge: flaggedConversationsCount > 0 ? flaggedConversationsCount : null,
      description: 'Các hội thoại cần xem xét'
    },
    {
      path: '/faculty/materials',
    //   icon: <BookOpen size={20} />,
      label: 'Tài liệu học tập',
      badge: null,
      description: 'Quản lý tài liệu và bài giảng'
    },
    {
      path: '/faculty/analytics',
    //   icon: <BarChart3 size={20} />,
      label: 'Thống kê câu hỏi',
      badge: null,
      description: 'Phân tích xu hướng câu hỏi'
    }
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GraduationCap size={28} className="logo-icon" />
          <div className="logo-text">
            <h2 className="sidebar-title">Hannah</h2>
            <p className="sidebar-subtitle">Faculty Portal</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">MENU</span>
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className="sidebar-link"
              title={item.description}
            >
              <span className="sidebar-label">{item.label}</span>
              <div style={{display: 'flex', justifyContent: 'right'}}>
                {item.badge !== null && (
                    <span className="sidebar-badge">{item.badge}</span>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <p className="user-name">Faculty User</p>
            <p className="user-role">Giảng viên</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Đăng xuất">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
