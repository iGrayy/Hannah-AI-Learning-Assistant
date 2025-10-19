import React, { useState } from 'react';
import { FileText, Key, Copy, DollarSign, BarChart2, MoreVertical, Sparkles, Edit2, AlertCircle, EyeOff, Eye } from 'lucide-react';
import './APIKeys.css';

interface APIKeyItem {
  id: string;
  name: string;
  keyPreview: string;
  project: string;
  projectId: string;
  createdOn: string;
  quotaTier: string;
}

const APIKeys: React.FC = () => {
  const [groupBy, setGroupBy] = useState<'api-key' | 'project'>('api-key');
  const [selectedFilter, setSelectedFilter] = useState('all-projects');
  
  // Integration Configuration States
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSy...');
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [maxResults, setMaxResults] = useState('50');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showYoutubeKey, setShowYoutubeKey] = useState(false);
  
  // Mock usage data
  const apiCallsToday = 1247;
  const apiLimit = 10000;

  const [apiKeys] = useState<APIKeyItem[]>([
    {
      id: '1',
      name: 'test',
      keyPreview: '...ft98',
      project: 'test',
      projectId: 'gen-lang-client-0451440085',
      createdOn: 'Oct 19, 2025',
      quotaTier: 'Free tier'
    }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="api-keys-page">
      {/* Existing API Keys Table Section */}

      {/* <div className="controls-section">
        <div className="group-by-section">
          <span className="control-label">Group by</span>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${groupBy === 'api-key' ? 'active' : ''}`}
              onClick={() => setGroupBy('api-key')}
            >
              <div className="radio-dot"></div>
              API key
            </button> */}
            {/* <button
              className={`toggle-btn ${groupBy === 'project' ? 'active' : ''}`}
              onClick={() => setGroupBy('project')}
            >
              <div className="radio-dot"></div>
              Project
            </button> */}
          {/* </div>
        </div> */}

        {/* <div className="filter-section">
          <span className="control-label">Filter by</span>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all-projects">All projects</option>
            <option value="test">Test</option>
            <option value="production">Production</option>
          </select>
        </div> */}

        {/* <button className="btn-primary-gradient">
          <Key size={18} />
          Add API key
        </button>
      </div> */}

      {/* <div className="table-container">
        <table className="keys-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Created on</th>
              <th>Quota tier</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id}>
                <td>
                  <div className="key-cell">
                    <a href="#" className="key-link">{key.keyPreview}</a>
                    <div className="key-name">{key.name}</div>
                  </div>
                </td>
                <td>
                  <div className="project-cell">
                    <a href="#" className="project-link">{key.project}</a>
                    <div className="project-id">{key.projectId}</div>
                  </div>
                </td>
                <td>
                  <span className="date-text">{key.createdOn}</span>
                </td>
                <td>
                  <div className="quota-cell">
                    <a href="#" className="quota-link">Set up billing</a>
                    <div className="quota-tier">{key.quotaTier}</div>
                  </div>
                </td>
                <td>
                  <div className="action-icons">
                    <button className="icon-btn" title="Copy key">
                      <Copy size={16} />
                    </button>
                    <button className="icon-btn" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn" title="Usage">
                      <BarChart2 size={16} />
                    </button>
                    <button className="icon-btn" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* Integration Configuration Section */}
      <div className="integration-config-section">
        <div className="config-header">
          <h2>Integration Configuration</h2>
          <p className="config-subtitle">Configure external services and APIs</p>
        </div>

        {/* Google Gemini API Configuration */}
        <div className="config-card">
          <div className="config-card-header">
            <div className="config-title-wrapper">
              <Sparkles size={20} className="config-icon gemini-icon" />
              <h3>Google Gemini API</h3>
            </div>
            <button className="test-btn">
              <BarChart2 size={16} />
              Test Connection
            </button>
          </div>

          <div className="config-content">
            <div className="form-group">
              <label htmlFor="gemini-api-key">API Key</label>
              <div className="input-with-toggle">
                <input
                  id="gemini-api-key"
                  type={showGeminiKey ? 'text' : 'password'}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="config-input"
                  placeholder="Enter your Gemini API key"
                />
                <button
                  className="toggle-visibility-btn"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                >
                  {showGeminiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="model-selection">Model Selection</label>
              <select
                id="model-selection"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="config-select"
              >
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-pro-vision">Gemini Pro Vision</option>
                <option value="gemini-ultra">Gemini Ultra</option>
              </select>
            </div>

            <div className="usage-status">
              <div className="usage-header">
                <AlertCircle size={16} />
                <span>Usage Status</span>
              </div>
              <div className="usage-info">
                <span className="usage-text">API Calls Today: {apiCallsToday} / {apiLimit.toLocaleString()}</span>
                <div className="usage-bar">
                  <div 
                    className="usage-fill" 
                    style={{ width: `${(apiCallsToday / apiLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* External APIs Configuration */}
        <div className="config-card">
          <div className="config-card-header">
            <div className="config-title-wrapper">
              <Key size={20} className="config-icon external-icon" />
              <h3>External APIs</h3>
            </div>
          </div>

          <div className="config-content">
            <div className="form-group">
              <label htmlFor="youtube-api-key">YouTube API Key</label>
              <div className="input-with-toggle">
                <input
                  id="youtube-api-key"
                  type={showYoutubeKey ? 'text' : 'password'}
                  value={youtubeApiKey}
                  onChange={(e) => setYoutubeApiKey(e.target.value)}
                  className="config-input"
                  placeholder="Enter YouTube API key"
                />
                <button
                  className="toggle-visibility-btn"
                  onClick={() => setShowYoutubeKey(!showYoutubeKey)}
                >
                  {showYoutubeKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="max-results">Max Results Per Query</label>
              <input
                id="max-results"
                type="number"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
                className="config-input"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="config-actions">
          <button className="btn-save-changes">
            <Copy size={16} />
            Save Changes
          </button>
          <button className="btn-reset">
            <AlertCircle size={16} />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* <div className="empty-state">
        <div className="empty-icon">
          <Sparkles size={80} strokeWidth={1} />
        </div>
        <h2 className="empty-title">Can't find your API keys here?</h2>
        <p className="empty-description">
          You'll only see API keys for projects imported into Google AI Studio. Import<br />
          projects from Google Cloud to manage their associated API keys. Or you can<br />
          create a new API key here.
        </p>
        <a href="#" className="learn-more-link">Learn more</a>
        <button className="btn-import">Import projects</button>
      </div> */}
    </div>
  );
};

export default APIKeys;
