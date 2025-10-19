import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Learn from './pages/Learn/Learn'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import AdminLayout from './pages/Admin/AdminLayout'
import UserManagement from './pages/Admin/UserManagement'
import SystemMonitoring from './pages/Admin/SystemMonitoring/SystemMonitoring'
import APIKeys from './pages/Admin/SystemMonitoring/APIKeys/APIKeys'
import SystemSettings from './pages/Admin/SystemSettings'
import CourseManagement from './pages/Admin/CourseManagement/CourseManagement'
import FacultyLayout from './pages/Faculty/FacultyLayout'
import FAQManagement from './pages/Faculty/FAQ/FAQManagement'
import ConversationMonitoring from './pages/Faculty/ConversationMonitoring'
import KnowledgeManagement from './pages/Faculty/KnowledgeManagement'
import QuestionAnalytics from './pages/Faculty/QuestionAnalytics/QuestionAnalytics'

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
        <Route path="system-monitoring/usage" element={<SystemMonitoring />} />
        <Route path="system-monitoring/api-keys" element={<APIKeys />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="course-management" element={<CourseManagement />} />
      </Route>

      {/* Faculty Routes */}
      <Route path="/faculty" element={<FacultyLayout />}>
        <Route index element={<FAQManagement />} />
        <Route path="faq" element={<FAQManagement />} />
        <Route path="conversations" element={<ConversationMonitoring />} />
        <Route path="materials" element={<KnowledgeManagement />} />
        <Route path="analytics" element={<QuestionAnalytics />} />
      </Route>
    </Routes>
  )
}

export default App
