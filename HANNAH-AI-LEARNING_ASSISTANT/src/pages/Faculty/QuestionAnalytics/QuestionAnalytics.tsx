import { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';

// Knowledge Gap Analytics - Based on Quiz Performance from Learn Studio
interface QuizAttempt {
  id: number;
  studentName: string;
  studentId: string;
  topic: string;
  course: string;
  score: number;
  maxScore: number;
  percentage: number;
  questionsCount: number;
  timestamp: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TopicGapData {
  topic: string;
  course: string;
  attemptCount: number;
  avgScore: number;
  studentCount: number;
  trend: 'up' | 'down' | 'stable';
}

interface KnowledgeGapData {
  topTopics: TopicGapData[];
  recentQuizzes: QuizAttempt[];
  totalAttempts: number;
  averageScore: number;
}

interface KnowledgeGapData {
  topTopics: TopicGapData[];
  recentQuizzes: QuizAttempt[];
  totalAttempts: number;
  averageScore: number;
}

const KnowledgeGapAnalysis = () => {
  const { setLoading, showNotification } = useApp();
  const [gapData, setGapData] = useState<KnowledgeGapData | null>(null);
  const [dateRange, setDateRange] = useState('30');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizAttempt | null>(null);

  // Mock data - Replace with API call
  const mockData: KnowledgeGapData = {
    topTopics: [
      { topic: 'Recursion', course: 'Software Engineering', attemptCount: 45, avgScore: 65, studentCount: 28, trend: 'down' },
      { topic: 'SQL Joins', course: 'Database Systems', attemptCount: 38, avgScore: 72, studentCount: 25, trend: 'stable' },
      { topic: 'Sorting Algorithms', course: 'Data Structures', attemptCount: 32, avgScore: 78, studentCount: 22, trend: 'up' },
      { topic: 'OOP Principles', course: 'Software Engineering', attemptCount: 29, avgScore: 69, studentCount: 20, trend: 'down' },
      { topic: 'Normalization', course: 'Database Systems', attemptCount: 24, avgScore: 74, studentCount: 18, trend: 'stable' }
    ],
    recentQuizzes: [
      { id: 1, studentName: 'Nguyễn Văn A', studentId: 'SE123456', topic: 'Recursion', course: 'Software Engineering', score: 7, maxScore: 10, percentage: 70, questionsCount: 10, timestamp: '2024-10-22T14:30:00', difficulty: 'hard' },
      { id: 2, studentName: 'Trần Thị B', studentId: 'SE123457', topic: 'SQL Joins', course: 'Database Systems', score: 8, maxScore: 10, percentage: 80, questionsCount: 10, timestamp: '2024-10-22T13:15:00', difficulty: 'medium' },
      { id: 3, studentName: 'Lê Văn C', studentId: 'SE123458', topic: 'Sorting Algorithms', course: 'Data Structures', score: 6, maxScore: 10, percentage: 60, questionsCount: 10, timestamp: '2024-10-22T11:45:00', difficulty: 'medium' },
      { id: 4, studentName: 'Phạm Thị D', studentId: 'SE123459', topic: 'OOP Principles', course: 'Software Engineering', score: 5, maxScore: 10, percentage: 50, questionsCount: 10, timestamp: '2024-10-21T16:20:00', difficulty: 'hard' },
      { id: 5, studentName: 'Hoàng Văn E', studentId: 'SE123460', topic: 'Normalization', course: 'Database Systems', score: 9, maxScore: 10, percentage: 90, questionsCount: 10, timestamp: '2024-10-21T15:00:00', difficulty: 'easy' }
    ],
    totalAttempts: 168,
    averageScore: 71.5
  };

  useEffect(() => {
    loadGapData();
  }, [dateRange, scoreFilter]);

  const loadGapData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await getKnowledgeGapAnalytics({ dateRange: parseInt(dateRange), scoreFilter });
      setTimeout(() => {
        setGapData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      showNotification('Lỗi khi tải dữ liệu phân tích', 'error');
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return '#10b981'; // green
    if (percentage >= 60) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const getScoreBadgeClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const filterQuizzes = (quizzes: QuizAttempt[]) => {
    if (scoreFilter === 'all') return quizzes;
    if (scoreFilter === 'low') return quizzes.filter(q => q.percentage < 60);
    if (scoreFilter === 'medium') return quizzes.filter(q => q.percentage >= 60 && q.percentage < 80);
    if (scoreFilter === 'high') return quizzes.filter(q => q.percentage >= 80);
    return quizzes;
  };

  if (!gapData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredQuizzes = filterQuizzes(gapData.recentQuizzes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">📊 Phân tích Lỗ hổng Kiến thức</h1>
          <p className="text-slate-600">Theo dõi điểm quiz theo chủ đề từ Learn Studio</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Tổng số lượt làm Quiz</p>
                <p className="text-4xl font-bold">{gapData.totalAttempts}</p>
              </div>
              <div className="text-6xl opacity-20">📝</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Điểm trung bình</p>
                <p className="text-4xl font-bold">{gapData.averageScore.toFixed(1)}%</p>
              </div>
              <div className="text-6xl opacity-20">📈</div>
            </div>
          </div>
        </div>

        {/* Top Topics Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">🎯 Chủ đề được làm Quiz nhiều nhất</h2>
            <div className="text-sm text-slate-600">Sắp xếp theo số lượt làm quiz</div>
          </div>

          <div className="space-y-4">
            {gapData.topTopics.map((topic, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{topic.topic}</h3>
                    {topic.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {topic.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-slate-600">{topic.course}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{topic.attemptCount}</div>
                  <div className="text-xs text-slate-500">lượt làm</div>
                </div>

                <div className="text-right">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: getScoreColor(topic.avgScore) }}
                  >
                    {topic.avgScore}%
                  </div>
                  <div className="text-xs text-slate-500">điểm TB</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-700">{topic.studentCount}</div>
                  <div className="text-xs text-slate-500">sinh viên</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Khoảng thời gian:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">7 ngày qua</option>
                <option value="30">30 ngày qua</option>
                <option value="90">3 tháng qua</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Lọc theo điểm:</span>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả</option>
                <option value="low">Thấp (&lt; 60%)</option>
                <option value="medium">Trung bình (60-79%)</option>
                <option value="high">Cao (≥ 80%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Quizzes List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">📋 Quiz được làm gần đây</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Sinh viên</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Chủ đề</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Môn học</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Điểm số</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Thời gian</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Độ khó</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-800">{quiz.studentName}</div>
                        <div className="text-sm text-slate-500">{quiz.studentId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700">{quiz.topic}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{quiz.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-lg" style={{ color: getScoreColor(quiz.percentage) }}>
                          {quiz.score}/{quiz.maxScore}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getScoreBadgeClass(quiz.percentage)}`}>
                          {quiz.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        {new Date(quiz.timestamp).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                        <div className="text-xs text-slate-400">
                          {new Date(quiz.timestamp).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty === 'easy' ? 'Dễ' : quiz.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedQuiz(quiz)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg">Không có quiz nào phù hợp với bộ lọc</p>
            </div>
          )}
        </div>

        {/* Quiz Detail Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-800">Chi tiết Quiz</h3>
                  <button
                    onClick={() => setSelectedQuiz(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Sinh viên</p>
                    <p className="font-semibold text-slate-800">{selectedQuiz.studentName}</p>
                    <p className="text-sm text-slate-500">{selectedQuiz.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Chủ đề</p>
                    <p className="font-semibold text-slate-800">{selectedQuiz.topic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Môn học</p>
                    <p className="font-semibold text-slate-800">{selectedQuiz.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Điểm số</p>
                    <p className="font-bold text-2xl" style={{ color: getScoreColor(selectedQuiz.percentage) }}>
                      {selectedQuiz.score}/{selectedQuiz.maxScore} ({selectedQuiz.percentage}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Số câu hỏi</p>
                    <p className="font-semibold text-slate-800">{selectedQuiz.questionsCount} câu</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Độ khó</p>
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedQuiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      selectedQuiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedQuiz.difficulty === 'easy' ? 'Dễ' : selectedQuiz.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Thời gian làm bài</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(selectedQuiz.timestamp).toLocaleString('vi-VN')}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500 italic">
                    💡 Quiz này được tạo bởi sinh viên trong Learn Studio
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGapAnalysis;
