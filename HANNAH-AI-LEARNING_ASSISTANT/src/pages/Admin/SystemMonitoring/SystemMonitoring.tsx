import React, { useState } from 'react';
import { Info, TrendingUp, AlertCircle, Activity, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';
import './SystemMonitoring.css';

interface LogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  project: string;
}

const SystemMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'usage' | 'rateLimit' | 'billing'>('usage');
  const [selectedProject, setSelectedProject] = useState('test');
  const [timeRange, setTimeRange] = useState('28Days');

  // Mock log data
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2025-10-19 14:32:15',
      endpoint: '/api/v1/generate',
      method: 'POST',
      status: 200,
      responseTime: 245,
      project: 'Test Environment'
    },
    {
      id: '2',
      timestamp: '2025-10-19 14:31:42',
      endpoint: '/api/v1/models',
      method: 'GET',
      status: 200,
      responseTime: 123,
      project: 'Test Environment'
    },
    {
      id: '3',
      timestamp: '2025-10-19 14:30:18',
      endpoint: '/api/v1/generate',
      method: 'POST',
      status: 429,
      responseTime: 89,
      project: 'Production'
    },
    {
      id: '4',
      timestamp: '2025-10-19 14:29:55',
      endpoint: '/api/v1/embeddings',
      method: 'POST',
      status: 500,
      responseTime: 1024,
      project: 'Test Environment'
    },
    {
      id: '5',
      timestamp: '2025-10-19 14:28:33',
      endpoint: '/api/v1/generate',
      method: 'POST',
      status: 200,
      responseTime: 198,
      project: 'Development'
    }
  ]);

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <span className="status-badge success"><CheckCircle size={14} /> {status}</span>;
    } else if (status >= 400 && status < 500) {
      return <span className="status-badge warning"><AlertCircle size={14} /> {status}</span>;
    } else if (status >= 500) {
      return <span className="status-badge error"><XCircle size={14} /> {status}</span>;
    }
    return <span className="status-badge">{status}</span>;
  };

  const getMethodBadge = (method: string) => {
    const methodClass = method.toLowerCase();
    return <span className={`method-badge ${methodClass}`}>{method}</span>;
  };

  return (
    <div className="system-monitoring">
      {/* <div className="monitoring-header">
        <div className="header-content">
          <div className="header-icon">
            <Activity size={32} strokeWidth={2} />
          </div>
          <div className="header-text">
            <h1>Gemini API Usage</h1>
            <p className="header-subtitle">Monitor your API usage and performance metrics</p>
          </div>
        </div>
        <span className="tier-badge">
          <span className="badge-dot"></span>
          Free tier
        </span>
      </div> */}

      {/* <div className="monitoring-tabs">
        <button 
          className={`tab ${activeTab === 'usage' ? 'active' : ''}`}
          onClick={() => setActiveTab('usage')}
        >
          <TrendingUp size={16} />
          Usage
        </button>
        <button 
          className={`tab ${activeTab === 'rateLimit' ? 'active' : ''}`}
          onClick={() => setActiveTab('rateLimit')}
        >
          <BarChart3 size={16} />
          Rate Limit
        </button>
        <button 
          className={`tab ${activeTab === 'billing' ? 'active' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <Activity size={16} />
          Billing
        </button>
      </div> */}

      <div className="monitoring-controls">
        <div className="control-group">
          <label>Name</label>
          <div className="select-wrapper">
            <select 
              value={selectedProject} 
              onChange={(e) => setSelectedProject(e.target.value)}
              className="select-input"
            >
              <option value="test">Test Environment</option>
              <option value="production">Production</option>
              <option value="development">Development</option>
            </select>
          </div>
        </div>
        <div className="control-group">
          <label>Time Range</label>
          <div className="select-wrapper">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="select-input"
            >
              <option value="24Hours">Last 24 Hours</option>
              <option value="7Days">Last 7 Days</option>
              <option value="28Days">Last 28 Days</option>
              <option value="90Days">Last 90 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overview-section">
        <div className="overview-header">
          <h2>Overview</h2>
          <button className="info-button">
            <Info size={16} />
          </button>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Total API Requests per day</h3>
              <div className="chart-badge success">
                <TrendingUp size={14} />
                Active
              </div>
            </div>
            <div className="chart-placeholder">
              <div className="no-data-container">
                <BarChart3 size={48} className="no-data-icon" />
                <p className="no-data-title">No Data Available</p>
                <p className="no-data-subtitle">Start making API requests to see your usage statistics</p>
              </div>
            </div>
            <div className="chart-footer">
              <span className="footer-label">Time series:</span>
              <span className="footer-value">0</span>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Total API Errors per day</h3>
              <div className="chart-badge warning">
                <AlertCircle size={14} />
                Monitoring
              </div>
            </div>
            <div className="chart-placeholder">
              <div className="no-data-container">
                <AlertCircle size={48} className="no-data-icon" />
                <p className="no-data-title">No Data Available</p>
                <p className="no-data-subtitle">Error tracking will appear here when available</p>
              </div>
            </div>
            <div className="chart-footer">
              <span className="footer-label">Time series:</span>
              <span className="footer-value">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Report Section */}
      <div className="log-report-section">
        <div className="log-header">
          <h2>API Request Logs</h2>
          <div className="log-controls">
            <span className="log-count">{logs.length} requests</span>
            <button className="refresh-btn">
              <Activity size={16} />
              Refresh
            </button>
          </div>
        </div>

        <div className="log-table-container">
          <table className="log-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Response Time</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <span className="timestamp">{log.timestamp}</span>
                  </td>
                  <td>
                    {getMethodBadge(log.method)}
                  </td>
                  <td>
                    <code className="endpoint">{log.endpoint}</code>
                  </td>
                  <td>
                    {getStatusBadge(log.status)}
                  </td>
                  <td>
                    <span className="response-time">
                      {log.responseTime}ms
                    </span>
                  </td>
                  <td>
                    <span className="project-name">{log.project}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="no-logs">
            <Activity size={48} className="no-logs-icon" />
            <p>No API requests logged yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMonitoring;
