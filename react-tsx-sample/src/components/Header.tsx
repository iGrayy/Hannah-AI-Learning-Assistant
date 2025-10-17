import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout }) => {
  return (
    <header style={headerStyle}>
      <div className="container">
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>React TypeScript Sample</h1>
          <div style={userSectionStyle}>
            {user ? (
              <div style={userInfoStyle}>
                <span>Xin chào, {user.name}!</span>
                <button className="button" onClick={onLogout} style={logoutButtonStyle}>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button className="button" onClick={onLogin}>
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '1rem 0',
  marginBottom: '2rem',
};

const headerContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
};

const userSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const userInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoutButtonStyle: React.CSSProperties = {
  backgroundColor: '#dc3545',
};

export default Header;
