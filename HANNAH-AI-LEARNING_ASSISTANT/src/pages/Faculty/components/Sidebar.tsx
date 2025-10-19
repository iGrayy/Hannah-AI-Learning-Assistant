import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFacultyContext } from '../../../contexts/FacultyContext';
import ReusableSidebar from '../../../components/Sidebar/Sidebar';

interface MenuItem {
  path: string;
  label: string;
  badge: number | null;
  description: string;
}

const FacultySidebar: React.FC = () => {
  const { flaggedConversationsCount } = useFacultyContext();

  const menuItems: MenuItem[] = [
    {
      path: '/faculty/faq',
      label: 'Quản lý FAQ',
      badge: null,
      description: 'Quản lý câu hỏi thường gặp'
    },
    {
      path: '/faculty/conversations',
      label: 'Giám sát hội thoại',
      badge: flaggedConversationsCount > 0 ? flaggedConversationsCount : null,
      description: 'Các hội thoại cần xem xét'
    },
    {
      path: '/faculty/materials',
      label: 'Quản lý tài liệu',
      badge: null,
      description: 'Quản lý tài liệu và bài giảng'
    },
    {
      path: '/faculty/analytics',
      label: 'Thống kê câu hỏi',
      badge: null,
      description: 'Phân tích xu hướng câu hỏi'
    }
  ];

  return (
    <ReusableSidebar title="Hannah" subtitle="Faculty Portal">
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
    </ReusableSidebar>
  );
};

export default FacultySidebar;
