import { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { getAnalytics } from '../../../service/mockApi';

import TrendChart from './TrendChart';

interface AnalyticsData {
  overview: {
    totalQuestions: number;
    topCourse: string;
    topTopic: string;
  };
  courseStats: {
    course: string;
    count: number;
  }[];
  trendData: {
    date: string;
    count: number;
    topQuestion: string;
  }[];
  recentQuestions: {
    id: number;
    student: string;
    content: string;
    course: string;
    timestamp: string;
  }[];
}

const QuestionAnalytics = () => {
  const { setLoading, showNotification } = useApp();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState('7');

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getAnalytics({ dateRange: parseInt(dateRange) });
      if (response.success) {
        setAnalyticsData(response.data);
      }
    } catch (error) {
      showNotification('Lỗi khi tải dữ liệu thống kê', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (newRange: string) => {
    setDateRange(newRange);
  };

  if (!analyticsData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="question-analytics" style={{ padding: '24px', background: '#f5f7fa' }}>
      {/* Header Section */}
      <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Thống kê câu hỏi</h1>
          <p className="text-slate-600">Phân tích và theo dõi các câu hỏi của sinh viên</p>
        </div>

      {/* Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.25)';
          }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}>
              📊
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {analyticsData.overview.totalQuestions.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              Tổng số câu hỏi trong kỳ
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(240, 147, 251, 0.25)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(240, 147, 251, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 147, 251, 0.25)';
          }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}>
              🏆
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {analyticsData.overview.topCourse}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              Môn học được hỏi nhiều nhất
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(79, 172, 254, 0.25)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 172, 254, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 172, 254, 0.25)';
          }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}>
              🔥
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {analyticsData.overview.topTopic}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              Chủ đề phổ biến nhất
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '32px',
        transition: 'all 0.3s ease'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📈
            </div>
            <h3 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: '#262626'
            }}>
              Xu hướng câu hỏi theo thời gian
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ color: '#595959', margin: 0, fontSize: '14px', fontWeight: '500' }}>
              📅 Khoảng thời gian:
            </label>
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                background: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                outline: 'none'
              }}
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">3 tháng qua</option>
            </select>
          </div>
        </div>
        <TrendChart data={analyticsData.trendData} />
      </div>

      {/* Recent Questions Table */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '24px 28px',
          borderBottom: '2px solid #f0f0f0',
          background: 'linear-gradient(to right, #f5f7fa, #ffffff)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            💬
          </div>
          <h3 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '700',
            color: '#262626'
          }}>
            Câu hỏi gần đây
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={{
                  padding: '16px 28px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8c8c8c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sinh viên
                </th>
                <th style={{
                  padding: '16px 28px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8c8c8c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Nội dung câu hỏi
                </th>
                <th style={{
                  padding: '16px 28px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8c8c8c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.recentQuestions.map((question, index) => (
                <tr
                  key={question.id}
                  style={{
                    borderBottom: index < analyticsData.recentQuestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f5f7fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <td style={{ padding: '20px 28px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {question.student.charAt(0).toUpperCase()}
                      </div>
                      <span style={{
                        fontWeight: '600',
                        color: '#262626',
                        fontSize: '14px'
                      }}>
                        {question.student}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 28px', maxWidth: '400px' }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#595959',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {question.content}
                    </div>
                  </td>
                  <td style={{ padding: '20px 28px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      background: '#f5f7fa',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#595959',
                      fontWeight: '500'
                    }}>
                      🕐 {new Date(question.timestamp).toLocaleDateString('vi-VN', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnalytics;
