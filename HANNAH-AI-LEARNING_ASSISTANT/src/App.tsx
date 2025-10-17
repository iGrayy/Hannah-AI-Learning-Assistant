import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Learn from './pages/Learn/Learn'
import Chat from './pages/Chat/Chat'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App
