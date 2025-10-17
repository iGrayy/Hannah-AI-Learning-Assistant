import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, Send, ThumbsUp, ThumbsDown, Share2, Upload, Book, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight, Wand2, GitBranch, FileText, ClipboardCheck, StickyNote, Loader2, MoreVertical, Trash2 } from 'lucide-react'
import './Chat.css'

interface StudioItem {
    id: string
    type: 'mindmap' | 'report' | 'notecard' | 'quiz'
    title: string
    subtitle: string
    status: 'loading' | 'completed'
    timestamp: string
}

export default function Chat() {
    const location = useLocation()
    const navigate = useNavigate()
    const initialQuery = location.state?.query || ''

    const [inputValue, setInputValue] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isStudioOpen, setIsStudioOpen] = useState(true)
    const [studioItems, setStudioItems] = useState<StudioItem[]>([])
    const [showReportModal, setShowReportModal] = useState(false)
    const [showReportFormatModal, setShowReportFormatModal] = useState(false)
    const [showMindmapModal, setShowMindmapModal] = useState(false)
    const [showNotecardModal, setShowNotecardModal] = useState(false)
    const [showQuizModal, setShowQuizModal] = useState(false)
    const [selectedMindmapId, setSelectedMindmapId] = useState<string | null>(null)
    const [selectedNotecardId, setSelectedNotecardId] = useState<string | null>(null)
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null)
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isCardFlipped, setIsCardFlipped] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({})
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [messages, setMessages] = useState([
        {
            type: 'user',
            content: initialQuery
        },
        {
            type: 'assistant',
            content: `**Lập trình Hướng đối tượng (OOP)** là một mô hình lập trình cấu trúc phần mềm xung quanh **các đối tượng**, thay vì các hàm hoặc logic. Hãy nghĩ về nó như việc mô hình hóa các thực thể trong thế giới thực và các tương tác của chúng trong code của bạn.

### Bức tranh toàn cảnh

#### Hiểu khái niệm cốt lõi của OOP và lợi ích của nó

**Chuyển đổi mô hình**
OOP đại diện cho một cách suy nghĩ khác về lập trình - tập trung vào dữ liệu và hành vi cùng nhau.

**Mô hình hóa thực tế**
Các đối tượng phản ánh các thực thể trong thế giới thực, làm cho code trở nên trực quan và dễ bảo trì hơn.

**Lợi ích của OOP**
- Tổ chức code tốt hơn
- Khả năng tái sử dụng thông qua kế thừa
- Bảo trì và cập nhật dễ dàng hơn
- Thiết kế trực quan hơn`,
            isStreaming: false
        }
    ])

    const bigPictureTopics = [
        {
            title: 'Hiểu khái niệm cốt lõi của OOP và lợi ích của nó',
            subtopics: [
                'Chuyển đổi mô hình',
                'Mô hình hóa thực tế',
                'Lợi ích của OOP'
            ]
        },
        {
            title: 'Mô tả các khối xây dựng cơ bản của OOP: Đối tượng và Lớp',
            subtopics: [
                'Đối tượng',
                'Lớp',
                'Thực thể'
            ]
        },
        {
            title: 'Giải thích các nguyên tắc chính của OOP',
            subtopics: [
                'Đóng gói',
                'Trừu tượng hóa',
                'Kế thừa',
                'Đa hình'
            ]
        }
    ]

    const studioFeatures = [
        { icon: GitBranch, title: 'Bản đồ tư duy', description: 'Mind map', type: 'mindmap' as const, note: 'Tạo bản đồ tư duy dựa vào nội dung cuộc trò chuyện' },
        { icon: FileText, title: 'Báo cáo', description: 'Report', type: 'report' as const, note: 'Tạo báo cáo dựa vào nội dung cuộc trò chuyện' },
        { icon: StickyNote, title: 'Thẻ ghi nhớ', description: 'Note cards', type: 'notecard' as const, note: 'Tạo thẻ ghi nhớ dựa vào nội dung cuộc trò chuyện' },
        { icon: ClipboardCheck, title: 'Bài kiểm tra', description: 'Quiz', type: 'quiz' as const, note: 'Tạo bài kiểm tra dựa vào nội dung cuộc trò chuyện' }
    ]

    const getIconForType = (type: string) => {
        switch (type) {
            case 'mindmap': return GitBranch
            case 'report': return FileText
            case 'notecard': return StickyNote
            case 'quiz': return ClipboardCheck
            default: return FileText
        }
    }

    const handleStudioFeatureClick = (type: 'mindmap' | 'report' | 'notecard' | 'quiz', title: string) => {
        if (type === 'report') {
            setShowReportFormatModal(true)
        } else {
            createStudioItem(type, title)
        }
    }

    const createStudioItem = (type: 'mindmap' | 'report' | 'notecard' | 'quiz', title: string) => {
        const newItem: StudioItem = {
            id: Date.now().toString(),
            type,
            title,
            subtitle: 'Hãy quay lại sau vài phút',
            status: 'loading',
            timestamp: '1 phút trước'
        }

        setStudioItems(prev => [newItem, ...prev])

        // Simulate completion after 3 seconds
        setTimeout(() => {
            setStudioItems(prev => prev.map(item =>
                item.id === newItem.id
                    ? { ...item, status: 'completed' as const, subtitle: 'Đã tạo xong' }
                    : item
            ))
        }, 3000)
    }

    const handleReportFormatSelect = (format: string) => {
        createStudioItem('report', `Báo cáo - ${format}`)
        setShowReportFormatModal(false)
    }

    const handleDeleteItem = (itemId: string) => {
        setStudioItems(prev => prev.filter(item => item.id !== itemId))
        setOpenMenuId(null)
    }

    const toggleMenu = (itemId: string) => {
        setOpenMenuId(openMenuId === itemId ? null : itemId)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.studio-item-menu-container')) {
                setOpenMenuId(null)
            }
        }

        if (openMenuId) {
            document.addEventListener('click', handleClickOutside)
            return () => document.removeEventListener('click', handleClickOutside)
        }
    }, [openMenuId])

    // Handle keyboard navigation for notecards
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!showNotecardModal) return

            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault()
                setIsCardFlipped(prev => !prev)
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault()
                setCurrentCardIndex(prev => Math.max(0, prev - 1))
                setIsCardFlipped(false)
            } else if (event.key === 'ArrowRight') {
                event.preventDefault()
                setCurrentCardIndex(prev => Math.min(104, prev + 1))
                setIsCardFlipped(false)
            }
        }

        if (showNotecardModal) {
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }
    }, [showNotecardModal])

    const handleSend = () => {
        if (!inputValue.trim()) return

        // Add user message
        setMessages(prev => [...prev, {
            type: 'user',
            content: inputValue
        }])

        // Simulate assistant response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: 'Đây là phản hồi mô phỏng. Trong ứng dụng thực tế, nội dung này sẽ được thay thế bằng lời gọi API đến dịch vụ AI.',
                isStreaming: false
            }])
        }, 500)

        setInputValue('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="chat-container">
            {/* Header */}
            <header className="chat-header">
                <div className="chat-header-left">
                    <div className="chat-logo" onClick={() => navigate('/learn')}>
                        <Sparkles size={24} color="#4285F4" />
                        <span className="chat-logo-text">Hannah Assistant</span>
                    </div>
                </div>
                <div className="chat-header-right">
                    <button className="avatar-btn" aria-label="Hồ sơ người dùng">
                        <img
                            src="https://ui-avatars.com/api/?name=User&background=4285F4&color=fff&size=32"
                            alt="Ảnh đại diện"
                            className="avatar-image"
                        />
                    </button>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="chat-main">
                {/* Sidebar - The Big Picture */}
                <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <Book size={20} color="#5f6368" />
                            <h3 className="sidebar-title">Bức tranh toàn cảnh</h3>
                            {/* Sidebar Toggle Button */}
                            <button
                                className="sidebar-toggle-btn"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                aria-label={isSidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
                            >
                                {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
                            </button>
                        </div>
                        <h4 className="sidebar-main-title">Lập trình Hướng đối tượng (OOP)</h4>

                        <div className="topics-list">
                            {bigPictureTopics.map((topic, index) => (
                                <div key={index} className="topic-item">
                                    <button className="topic-button">
                                        <span className="topic-title">{topic.title}</span>
                                    </button>
                                    <div className="subtopics-list">
                                        {topic.subtopics.map((subtopic, subIndex) => (
                                            <button key={subIndex} className="subtopic-button">
                                                {subtopic}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="chat-content">
                    {/* Welcome Banner */}
                    <div className="welcome-banner">
                        <div className="welcome-banner-icon">
                            <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Học về" />
                        </div>
                        <div className="welcome-banner-content">
                            <h2 className="welcome-banner-title">Chào mừng đến với Hannah Assistant</h2>
                            <p className="welcome-banner-description">
                                Nắm bắt các chủ đề mới và hiểu sâu hơn với công cụ học tập đàm thoại
                            </p>
                            <button className="topic-badge">OOP</button>
                        </div>
                        <button className="close-banner-btn" aria-label="Đóng">×</button>
                    </div>

                    {/* Messages */}
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}-message`}>
                                {message.type === 'assistant' && (
                                    <div className="message-avatar">
                                        <Sparkles size={20} color="#4285F4" />
                                    </div>
                                )}
                                <div className="message-content">
                                    <div className="message-text">
                                        {message.content.split('\n').map((line: string, i: number) => {
                                            // Handle bold text
                                            if (line.includes('**')) {
                                                const parts = line.split('**')
                                                return (
                                                    <p key={i}>
                                                        {parts.map((part: string, j: number) =>
                                                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                                        )}
                                                    </p>
                                                )
                                            }
                                            // Handle headings
                                            if (line.startsWith('### ')) {
                                                return <h3 key={i}>{line.replace('### ', '')}</h3>
                                            }
                                            if (line.startsWith('#### ')) {
                                                return <h4 key={i}>{line.replace('#### ', '')}</h4>
                                            }
                                            // Handle list items
                                            if (line.startsWith('- ')) {
                                                return <li key={i}>{line.replace('- ', '')}</li>
                                            }
                                            // Regular paragraph
                                            if (line.trim()) {
                                                return <p key={i}>{line}</p>
                                            }
                                            return null
                                        })}
                                    </div>
                                    {message.type === 'assistant' && (
                                        <div className="message-actions">
                                            <button className="action-btn" aria-label="Phản hồi tốt">
                                                <ThumbsUp size={16} />
                                            </button>
                                            <button className="action-btn" aria-label="Phản hồi không tốt">
                                                <ThumbsDown size={16} />
                                            </button>
                                            <button className="action-btn" aria-label="Chia sẻ">
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Notice */}
                    <div className="chat-notice">
                        Học về hiện chỉ khả dụng bằng tiếng Việt.
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-container">
                        <div className="chat-input-wrapper">
                            <input
                                type="text"
                                placeholder="Nhập hoặc chia sẻ tệp tin..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="chat-input"
                            />
                            <button className="upload-file-btn" aria-label="Tải lên tệp tin">
                                <Upload size={20} />
                            </button>
                            <button
                                className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                aria-label="Gửi tin nhắn"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="chat-disclaimer">
                            Phản hồi từ AI có thể không chính xác hoặc gây hiểu lầm. Hãy kiểm tra kỹ để đảm bảo độ chính xác.
                        </p>
                    </div>
                </div>

                {/* Studio Sidebar - Right */}
                <aside className={`studio-sidebar ${isStudioOpen ? 'open' : 'closed'}`}>
                    <div className="studio-content">
                        <div className="studio-header">
                            <Wand2 size={20} color="#5f6368" />
                            <h3 className="studio-title">Studio</h3>
                            {/* Studio Toggle Button */}
                            <button
                                className="studio-toggle-btn"
                                onClick={() => setIsStudioOpen(!isStudioOpen)}
                                aria-label={isStudioOpen ? 'Ẩn studio' : 'Hiện studio'}
                            >
                                {isStudioOpen ? <PanelRightClose size={18} /> : <PanelRight size={18} />}
                            </button>
                        </div>

                        <div className="studio-features">
                            {studioFeatures.map((feature, index) => {
                                const IconComponent = feature.icon
                                return (
                                    <button
                                        key={index}
                                        className="studio-feature-card"
                                        onClick={() => handleStudioFeatureClick(feature.type, feature.title)}
                                        title={feature.note}
                                    >
                                        <IconComponent size={24} color="#5f6368" />
                                        <span className="feature-title">{feature.title}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Studio Items List or Empty State */}
                        {studioItems.length > 0 ? (
                            <div className="studio-items-list">
                                {studioItems.map((item) => {
                                    const IconComponent = getIconForType(item.type)
                                    return (
                                        <div key={item.id} className="studio-item">
                                            <div 
                                                className="studio-item-clickable"
                                                onClick={() => {
                                                    if (item.status === 'completed') {
                                                        if (item.type === 'mindmap') {
                                                            setSelectedMindmapId(item.id)
                                                            setShowMindmapModal(true)
                                                        } else if (item.type === 'notecard') {
                                                            setSelectedNotecardId(item.id)
                                                            setCurrentCardIndex(0)
                                                            setIsCardFlipped(false)
                                                            setShowNotecardModal(true)
                                                        } else if (item.type === 'quiz') {
                                                            setSelectedQuizId(item.id)
                                                            setCurrentQuestionIndex(0)
                                                            setSelectedAnswers({})
                                                            setShowQuizModal(true)
                                                        } else if (item.type === 'report') {
                                                            setSelectedReportId(item.id)
                                                            setShowReportModal(true)
                                                        }
                                                    }
                                                }}
                                                style={{ cursor: item.status === 'completed' && (item.type === 'mindmap' || item.type === 'notecard' || item.type === 'quiz' || item.type === 'report') ? 'pointer' : 'default' }}
                                            >
                                                <div className="studio-item-icon">
                                                    {item.status === 'loading' ? (
                                                        <Loader2 size={20} color="#5f6368" className="spinning" />
                                                    ) : (
                                                        <IconComponent size={20} color="#5f6368" />
                                                    )}
                                                </div>
                                                <div className="studio-item-content">
                                                    <h4 className="studio-item-title">{item.title}</h4>
                                                    <p className="studio-item-subtitle">
                                                        {item.subtitle} • {item.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="studio-item-menu-container">
                                                <button
                                                    className="studio-item-menu"
                                                    aria-label="Thêm tùy chọn"
                                                    onClick={() => toggleMenu(item.id)}
                                                >
                                                    <MoreVertical size={20} color="#5f6368" />
                                                </button>
                                                {openMenuId === item.id && (
                                                    <div className="studio-item-dropdown">
                                                        <button
                                                            className="dropdown-item delete-item"
                                                            onClick={() => handleDeleteItem(item.id)}
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>Xóa</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="studio-description">
                                <Wand2 size={40} color="#9aa0a6" className="studio-icon" />
                                <p className="studio-subtitle">Đầu ra của Studio sẽ được lưu ở đây.</p>
                                <p className="studio-text">
                                    Sau khi thêm nguồn, hãy nhập để thêm Tổng quan bảng âm thanh, Hướng dẫn học tập, Bản đồ tư duy và nhiều thông tin khác!
                                </p>
                            </div>
                        )}
                    </div>
                </aside>
            </main>

            {/* Report Format Selection Modal */}
            {showReportFormatModal && (
                <div className="modal-overlay" onClick={() => setShowReportFormatModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Chọn định dạng báo cáo</h3>
                        <div className="report-formats">
                            <button
                                className="format-option"
                                onClick={() => handleReportFormatSelect('Tổng quan')}
                            >
                                <FileText size={24} />
                                <span>Tổng quan</span>
                            </button>
                            <button
                                className="format-option"
                                onClick={() => handleReportFormatSelect('Chi tiết')}
                            >
                                <FileText size={24} />
                                <span>Chi tiết</span>
                            </button>
                            <button
                                className="format-option"
                                onClick={() => handleReportFormatSelect('Tóm tắt')}
                            >
                                <FileText size={24} />
                                <span>Tóm tắt</span>
                            </button>
                        </div>
                        <button className="modal-close" onClick={() => setShowReportFormatModal(false)}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {/* Report Display Modal */}
            {showReportModal && (
                <div className="report-modal-overlay" onClick={() => setShowReportModal(false)}>
                    <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="report-modal-header">
                            <h2 className="report-modal-title">Báo cáo - Tổng quan</h2>
                            <p className="report-modal-subtitle">Dựa trên 1 nguồn</p>
                            <button 
                                className="report-modal-close" 
                                onClick={() => setShowReportModal(false)}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        <div className="report-content-container">
                            <div className="report-section">
                                <h3 className="report-section-title">Tóm tắt chính</h3>
                                <p className="report-text">
                                    Lập trình hướng đối tượng (OOP) là một mô hình lập trình cấu trúc phần mềm xung quanh các đối tượng, 
                                    thay vì các hàm hoặc logic. Đây là cách mô hình hóa các thực thể trong thế giới thực và các tương tác 
                                    của chúng trong code của bạn.
                                </p>
                            </div>

                            <div className="report-section">
                                <h3 className="report-section-title">Khái niệm cốt lõi</h3>
                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">1. Chuyển đổi mô hình (Paradigm Shift)</h4>
                                    <p className="report-text">
                                        OOP đại diện cho một cách suy nghĩ khác về lập trình - tập trung vào dữ liệu và hành vi cùng nhau. 
                                        Thay vì viết các hàm riêng lẻ xử lý dữ liệu, OOP kết hợp dữ liệu và các phương thức hoạt động 
                                        trên dữ liệu đó thành các đơn vị độc lập gọi là đối tượng.
                                    </p>
                                </div>

                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">2. Mô hình hóa thực tế (Modeling Reality)</h4>
                                    <p className="report-text">
                                        Các đối tượng phản ánh các thực thể trong thế giới thực, làm cho code trở nên trực quan và dễ bảo trì hơn. 
                                        Ví dụ, một đối tượng "Xe" có thể có thuộc tính như màu sắc, tốc độ và các phương thức như khởi động, dừng.
                                    </p>
                                </div>

                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">3. Lợi ích của OOP</h4>
                                    <ul className="report-list">
                                        <li>Tổ chức code tốt hơn: Mã nguồn được cấu trúc rõ ràng và logic</li>
                                        <li>Tái sử dụng thông qua kế thừa: Giảm thiểu code trùng lặp</li>
                                        <li>Dễ bảo trì và cập nhật: Thay đổi cục bộ không ảnh hưởng toàn hệ thống</li>
                                        <li>Thiết kế trực quan hơn: Dễ hiểu và phát triển</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="report-section">
                                <h3 className="report-section-title">Các khối xây dựng cơ bản</h3>
                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">Objects (Đối tượng)</h4>
                                    <p className="report-text">
                                        Đối tượng là các thực thể có trạng thái (thuộc tính) và hành vi (phương thức). 
                                        Chúng đại diện cho các khái niệm cụ thể trong chương trình của bạn.
                                    </p>
                                </div>

                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">Classes (Lớp)</h4>
                                    <p className="report-text">
                                        Lớp là bản thiết kế hoặc mẫu để tạo đối tượng. Chúng định nghĩa cấu trúc và hành vi 
                                        mà các đối tượng của lớp đó sẽ có.
                                    </p>
                                </div>

                                <div className="report-subsection">
                                    <h4 className="report-subsection-title">Instances (Thực thể)</h4>
                                    <p className="report-text">
                                        Thực thể là các đối tượng cụ thể được tạo ra từ một lớp. Mỗi thực thể có giá trị 
                                        riêng cho các thuộc tính của nó.
                                    </p>
                                </div>
                            </div>

                            <div className="report-section">
                                <h3 className="report-section-title">Các nguyên tắc chính</h3>
                                <div className="report-principles">
                                    <div className="report-principle-card">
                                        <h4 className="report-principle-title">Encapsulation</h4>
                                        <p className="report-principle-text">
                                            Đóng gói dữ liệu và phương thức trong một đơn vị, ẩn chi tiết bên trong
                                        </p>
                                    </div>
                                    <div className="report-principle-card">
                                        <h4 className="report-principle-title">Abstraction</h4>
                                        <p className="report-principle-text">
                                            Ẩn các chi tiết phức tạp, chỉ hiển thị các tính năng cần thiết
                                        </p>
                                    </div>
                                    <div className="report-principle-card">
                                        <h4 className="report-principle-title">Inheritance</h4>
                                        <p className="report-principle-text">
                                            Lớp con kế thừa thuộc tính và phương thức từ lớp cha
                                        </p>
                                    </div>
                                    <div className="report-principle-card">
                                        <h4 className="report-principle-title">Polymorphism</h4>
                                        <p className="report-principle-text">
                                            Các đối tượng khác nhau có thể phản hồi cùng một thông điệp theo cách khác nhau
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="report-section">
                                <h3 className="report-section-title">Kết luận</h3>
                                <p className="report-text">
                                    OOP là một mô hình lập trình mạnh mẽ giúp tạo ra code dễ hiểu, dễ bảo trì và có thể mở rộng. 
                                    Bằng cách tổ chức code xung quanh các đối tượng và áp dụng các nguyên tắc cốt lõi, 
                                    lập trình viên có thể xây dựng các hệ thống phần mềm phức tạp một cách hiệu quả hơn.
                                </p>
                            </div>
                        </div>

                        <div className="report-modal-footer">
                            <button className="report-action-btn">
                                <ThumbsUp size={18} />
                                Nội dung hữu ích
                            </button>
                            <button className="report-action-btn">
                                <ThumbsDown size={18} />
                                Nội dung không phù hợp
                            </button>
                        </div>

                        <p className="report-modal-notice">
                            AI có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ nội dung báo cáo
                        </p>
                    </div>
                </div>
            )}

            {/* Mindmap Modal */}
            {showMindmapModal && (
                <div className="mindmap-modal-overlay" onClick={() => setShowMindmapModal(false)}>
                    <div className="mindmap-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="mindmap-modal-header">
                            <h2 className="mindmap-modal-title">NỘI DUNG</h2>
                            <p className="mindmap-modal-subtitle">Dựa trên 1 nguồn</p>
                            <button 
                                className="mindmap-modal-close" 
                                onClick={() => setShowMindmapModal(false)}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>
                        <div className="mindmap-container">
                            <div className="mindmap-canvas">
                                {/* Central Node */}
                                <div className="mindmap-central-node">
                                    <div className="mindmap-node mindmap-node-central">
                                        NỘI DUNG
                                    </div>
                                </div>

                                {/* Branch 1 - Top */}
                                <div className="mindmap-branch mindmap-branch-top">
                                    <div className="mindmap-connector mindmap-connector-top"></div>
                                    <div className="mindmap-node mindmap-node-primary">
                                        NỘI DUNG
                                        <button className="mindmap-expand-btn">›</button>
                                    </div>
                                </div>

                                {/* Branch 2 - Middle */}
                                <div className="mindmap-branch mindmap-branch-middle">
                                    <div className="mindmap-connector mindmap-connector-middle"></div>
                                    <div className="mindmap-node mindmap-node-primary">
                                        NỘI DUNG
                                        <button className="mindmap-expand-btn">›</button>
                                    </div>
                                </div>

                                {/* Branch 3 - Bottom */}
                                <div className="mindmap-branch mindmap-branch-bottom">
                                    <div className="mindmap-connector mindmap-connector-bottom"></div>
                                    <div className="mindmap-node mindmap-node-primary">
                                        NỘI DUNG
                                        <button className="mindmap-expand-btn">›</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mindmap-modal-footer">
                            <button className="mindmap-action-btn">
                                <ThumbsUp size={18} />
                                Nội dung hay
                            </button>
                            <button className="mindmap-action-btn">
                                <ThumbsDown size={18} />
                                Nội dung không phù hợp
                            </button>
                        </div>
                        {/* <p className="mindmap-modal-notice">
                            Notebook.M có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ cảu trả lời mà bạn nhận được
                        </p> */}
                    </div>
                </div>
            )}

            {/* Notecard (Flashcard) Modal */}
            {showNotecardModal && (
                <div className="notecard-modal-overlay" onClick={() => setShowNotecardModal(false)}>
                    <div className="notecard-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="notecard-modal-header">
                            <h2 className="notecard-modal-title">Triết học Bộ thể</h2>
                            <p className="notecard-modal-subtitle">Dựa trên 1 nguồn</p>
                            <button 
                                className="notecard-modal-close" 
                                onClick={() => setShowNotecardModal(false)}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        <div className="notecard-instruction">
                            Nhấn phím cách để lật thẻ, nhấn phím mũi tên ←/→ để đi chuyển
                        </div>

                        <div className="notecard-container">
                            <button 
                                className="notecard-nav-btn notecard-nav-prev"
                                onClick={() => {
                                    setCurrentCardIndex(prev => Math.max(0, prev - 1))
                                    setIsCardFlipped(false)
                                }}
                                disabled={currentCardIndex === 0}
                            >
                                ←
                            </button>

                            <div 
                                className={`notecard ${isCardFlipped ? 'flipped' : ''}`}
                                onClick={() => setIsCardFlipped(!isCardFlipped)}
                            >
                                <div className="notecard-inner">
                                    <div className="notecard-front">
                                        <p className="notecard-text">
                                            CÂU HỎI?
                                        </p>
                                        <button className="notecard-flip-hint">Xem câu trả lời</button>
                                    </div>
                                    <div className="notecard-back">
                                        <p className="notecard-text">
                                            TRẢ LỜI
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="notecard-nav-btn notecard-nav-next"
                                onClick={() => {
                                    setCurrentCardIndex(prev => Math.min(104, prev + 1))
                                    setIsCardFlipped(false)
                                }}
                                disabled={currentCardIndex === 104}
                            >
                                →
                            </button>
                        </div>

                        <div className="notecard-progress">
                            <button className="notecard-shuffle-btn">
                                <span>🔄</span>
                                Bắt đầu lại
                            </button>
                            <span className="notecard-counter">{currentCardIndex + 1} / 105 thẻ</span>
                        </div>

                        <div className="notecard-modal-footer">
                            <button className="notecard-action-btn">
                                <ThumbsUp size={18} />
                                Nội dung hữu ích
                            </button>
                            <button className="notecard-action-btn">
                                <ThumbsDown size={18} />
                                Nội dung không phù hợp
                            </button>
                        </div>

                        <p className="notecard-modal-notice">
                            Notebook.M có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được
                        </p>
                    </div>
                </div>
            )}

            {/* Quiz Modal */}
            {showQuizModal && (
                <div className="quiz-modal-overlay" onClick={() => setShowQuizModal(false)}>
                    <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="quiz-modal-header">
                            <h2 className="quiz-modal-title">Triết học Trắc nghiệm</h2>
                            <p className="quiz-modal-subtitle">Dựa trên 1 nguồn</p>
                            <button 
                                className="quiz-modal-close" 
                                onClick={() => setShowQuizModal(false)}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        <div className="quiz-progress-bar">
                            <div className="quiz-progress-indicator">
                                {currentQuestionIndex + 1} / 15
                            </div>
                        </div>

                        <div className="quiz-container">
                            <div className="quiz-question">
                                <p className="quiz-question-text">
                                    CÂU HỎI?
                                </p>
                            </div>

                            <div className="quiz-answers">
                                <button 
                                    className={`quiz-answer-option ${selectedAnswers[currentQuestionIndex] === 'A' ? 'selected' : ''}`}
                                    onClick={() => setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: 'A'})}
                                >
                                    <span className="quiz-answer-label">A.</span>
                                    <span className="quiz-answer-text">
                                        TRẢ LỜI.
                                    </span>
                                </button>

                                <button 
                                    className={`quiz-answer-option ${selectedAnswers[currentQuestionIndex] === 'B' ? 'selected' : ''}`}
                                    onClick={() => setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: 'B'})}
                                >
                                    <span className="quiz-answer-label">B.</span>
                                    <span className="quiz-answer-text">
                                        TRẢ LỜI.
                                    </span>
                                </button>

                                <button 
                                    className={`quiz-answer-option ${selectedAnswers[currentQuestionIndex] === 'C' ? 'selected' : ''}`}
                                    onClick={() => setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: 'C'})}
                                >
                                    <span className="quiz-answer-label">C.</span>
                                    <span className="quiz-answer-text">
                                        TRẢ LỜI.
                                    </span>
                                </button>

                                <button 
                                    className={`quiz-answer-option ${selectedAnswers[currentQuestionIndex] === 'D' ? 'selected' : ''}`}
                                    onClick={() => setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: 'D'})}
                                >
                                    <span className="quiz-answer-label">D.</span>
                                    <span className="quiz-answer-text">
                                        TRẢ LỜI.
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="quiz-navigation">
                            <button 
                                className="quiz-nav-btn quiz-hint-btn"
                                onClick={() => {
                                    // Toggle hint functionality
                                }}
                            >
                                Gợi ý
                            </button>
                            <button 
                                className="quiz-nav-btn quiz-next-btn"
                                onClick={() => {
                                    if (currentQuestionIndex < 14) {
                                        setCurrentQuestionIndex(prev => prev + 1)
                                    }
                                }}
                            >
                                Tiếp theo
                            </button>
                        </div>

                        <div className="quiz-modal-footer">
                            <button className="quiz-feedback-btn">
                                <ThumbsUp size={18} />
                                Nội dung hữu ích
                            </button>
                            <button className="quiz-feedback-btn">
                                <ThumbsDown size={18} />
                                Nội dung không phù hợp
                            </button>
                        </div>

                        {/* <p className="quiz-modal-notice">
                            Notebook.M có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được
                        </p> */}
                    </div>
                </div>
            )}
        </div>
    )
}
