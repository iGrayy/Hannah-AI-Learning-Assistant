import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Learn from './pages/Learn/Learn'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import AdminLayout from './pages/Admin/AdminLayout'
import UserManagement from './pages/Admin/UserManagement'
import SystemMonitoring from './pages/Admin/SystemMonitoring'
import SystemSettings from './pages/Admin/SystemSettings'
import CourseManagement from './pages/Admin/CourseManagement'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<UserManagement />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="system-monitoring" element={<SystemMonitoring />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="course-management" element={<CourseManagement />} />
      </Route>
    </Routes>
  )
}

export default App
