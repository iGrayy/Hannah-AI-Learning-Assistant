import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { FacultyProvider } from '../../contexts/FacultyContext';
import './FacultyLayout.css';

const FacultyLayout: React.FC = () => {
  return (
    <FacultyProvider>
      <div className="faculty-layout">
        <Sidebar />
        <main className="faculty-content">
          <Outlet />
        </main>
      </div>
    </FacultyProvider>
  );
};

export default FacultyLayout;
