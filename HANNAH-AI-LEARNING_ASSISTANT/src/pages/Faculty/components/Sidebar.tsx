import React from "react";
import { NavLink } from "react-router-dom";
import { MessageSquare, FileText, BarChart3 } from "lucide-react";
import { useFacultyContext } from "../../../contexts/FacultyContext";
import ReusableSidebar from "../../../components/Sidebar/Sidebar";

interface MenuItem {
  path: string;
  label: string;
  badge: number | null;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface FacultySidebarContentProps {
  isCollapsed?: boolean;
}

const FacultySidebarContent: React.FC<FacultySidebarContentProps> = ({
  isCollapsed = false,
}) => {
  const { flaggedConversationsCount } = useFacultyContext();

  const menuItems: MenuItem[] = [
    // {
    //   path: '/faculty/faq',
    //   label: 'Quản lý FAQ',
    //   badge: null,
    //   description: 'Quản lý câu hỏi thường gặp',
    //   icon: HelpCircle
    // },
    {
      path: "/faculty/conversations",
      label: "Giám sát hội thoại",
      badge: flaggedConversationsCount > 0 ? flaggedConversationsCount : null,
      description: "Các hội thoại cần xem xét",
      icon: MessageSquare,
    },
    {
      path: "/faculty/materials",
      label: "Quản lý tài liệu",
      badge: null,
      description: "Quản lý tài liệu và bài giảng",
      icon: FileText,
    },
    {
      path: "/faculty/analytics",
      label: "Thống kê câu hỏi",
      badge: null,
      description: "Phân tích xu hướng câu hỏi",
      icon: BarChart3,
    },
  ];

  return (
    <div className="nav-section">
      {!isCollapsed && <span className="nav-section-title">MENU</span>}
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className="sidebar-link"
            title={isCollapsed ? item.label : item.description}
          >
            <IconComponent size={20} />
            {!isCollapsed && (
              <span className="sidebar-label">{item.label}</span>
            )}
            {!isCollapsed && (
              <div style={{ display: "flex", justifyContent: "right" }}>
                {item.badge !== null && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

const FacultySidebar: React.FC = () => {
  return (
    <ReusableSidebar title="Hannah" subtitle="Trang giảng viên">
      <FacultySidebarContent />
    </ReusableSidebar>
  );
};

export default FacultySidebar;
