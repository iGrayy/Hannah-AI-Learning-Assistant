import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Upload, Send, FileText, Book, Database, Server } from 'lucide-react'
import './Learn.css'

export default function Learn() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/chat', { state: { query: searchQuery } })
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="learn-container">
            {/* Header */}
            <header className="learn-header">
                <div className="learn-header-left">
                    {/* <button className="menu-icon-btn back-btn" aria-label="Back to Home" onClick={() => navigate('/')}>
                        <ArrowLeft size={24} />
                    </button> */}
                    <div className="learn-logo">
                        <Sparkles size={24} color="#4285F4" />
                        <span className="learn-logo-text">Hannah</span>
                    </div>
                </div>
                <div className="learn-header-right">
                    <button className="avatar-btn" aria-label="User profile">
                        <img
                            src="https://ui-avatars.com/api/?name=User&background=4285F4&color=fff&size=32"
                            alt="User avatar"
                            className="avatar-image"
                        />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="learn-main">
                <div className="learn-content">
                    <h1 className="learn-title">What would you like to learn about?</h1>
                    
                    {/* Search Box */}
                    <div className="learn-search-container">
                        <div className="learn-search-box">
                            <input
                                type="text"
                                placeholder="Ask Learn About"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="learn-search-input"
                            />
                            <button 
                                className={`upload-btn ${searchQuery.trim() ? 'has-content' : ''}`}
                                aria-label={searchQuery.trim() ? 'Send' : 'Upload'}
                                onClick={searchQuery.trim() ? handleSearch : undefined}
                            >
                                {searchQuery.trim() ? (
                                    <Send size={24} />
                                ) : (
                                    <Upload size={24} />
                                )}
                            </button>
                        </div>

                        {/* PDF Reading Companion Card */}
                        <div className="pdf-companion-card">
                            <div className="pdf-companion-icon">
                                <svg viewBox="0 0 100 100" className="illustration">
                                    <defs>
                                        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 0.6 }} />
                                        </linearGradient>
                                    </defs>
                                    {/* Book */}
                                    <rect x="30" y="20" width="40" height="55" fill="url(#bookGradient)" rx="2"/>
                                    <rect x="30" y="20" width="5" height="55" fill="#F59E0B" opacity="0.5"/>
                                    <line x1="45" y1="35" x2="60" y2="35" stroke="#F59E0B" strokeWidth="2"/>
                                    <line x1="45" y1="45" x2="60" y2="45" stroke="#F59E0B" strokeWidth="2"/>
                                    <line x1="45" y1="55" x2="55" y2="55" stroke="#F59E0B" strokeWidth="2"/>
                                    {/* Person */}
                                    <circle cx="50" cy="65" r="8" fill="#FBBF24"/>
                                    <path d="M 42 73 Q 50 78, 58 73 L 58 85 L 42 85 Z" fill="#F59E0B"/>
                                </svg>
                            </div>
                            <div className="pdf-companion-content">
                                <h3 className="pdf-companion-title">PDF Reading Companion</h3>
                                <p className="pdf-companion-description">
                                    Upload a PDF or type the URL to use a new reading tool that helps analysis and guide you through your questions and concepts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="learn-footer">
                <div className="reading-nook-section">
                    <h2 className="reading-nook-title">The Reading Nook</h2>
                    <p className="reading-nook-subtitle">Some PDFs to try out</p>
                    
                    <div className="pdf-cards-grid">
                        {/* PDF Card 1 */}
                        <div className="pdf-card">
                            <div className="pdf-card-icon">
                                <FileText size={40} color="#DC2626" />
                            </div>
                            <h4 className="pdf-card-title">React Documentation</h4>
                            <p className="pdf-card-description">Học về React hooks và components</p>
                        </div>

                        {/* PDF Card 2 */}
                        <div className="pdf-card">
                            <div className="pdf-card-icon">
                                <Book size={40} color="#2563EB" />
                            </div>
                            <h4 className="pdf-card-title">TypeScript Handbook</h4>
                            <p className="pdf-card-description">Tìm hiểu về TypeScript types</p>
                        </div>

                        {/* PDF Card 3 */}
                        <div className="pdf-card">
                            <div className="pdf-card-icon">
                                <Server size={40} color="#059669" />
                            </div>
                            <h4 className="pdf-card-title">Node.js Guide</h4>
                            <p className="pdf-card-description">Backend development với Node.js</p>
                        </div>

                        {/* PDF Card 4 */}
                        <div className="pdf-card">
                            <div className="pdf-card-icon">
                                <Database size={40} color="#7C3AED" />
                            </div>
                            <h4 className="pdf-card-title">Database Design</h4>
                            <p className="pdf-card-description">SQL và NoSQL databases</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
