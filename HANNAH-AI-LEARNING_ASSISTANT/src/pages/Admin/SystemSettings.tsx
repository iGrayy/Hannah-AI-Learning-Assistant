import React, { useState } from 'react';
import { 
  Settings, Globe, Shield, Brain, Database, Key, 
  Save, RotateCcw, TestTube, Clock, Zap, Link2,
  Eye, EyeOff, CheckCircle, XCircle, Loader, AlertCircle
} from 'lucide-react';

export default function SystemSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(null);
  
  // General Settings
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [autoLogout, setAutoLogout] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // Integration Settings
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSy...');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [geminiModel, setGeminiModel] = useState('gemini-pro');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [elasticsearchHost, setElasticsearchHost] = useState('localhost:9200');
  
  // AI Configuration
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(40);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8);

  const timezones = [
    { value: 'Asia/Ho_Chi_Minh', label: '(GMT+7) Ho Chi Minh City' },
    { value: 'Asia/Bangkok', label: '(GMT+7) Bangkok' },
    { value: 'Asia/Singapore', label: '(GMT+8) Singapore' },
    { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
    { value: 'America/New_York', label: '(GMT-5) New York' },
    { value: 'Europe/London', label: '(GMT+0) London' },
    { value: 'UTC', label: '(GMT+0) UTC' }
  ];

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = async (service:any) => {
    setTesting(service);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTesting(null);
  };

  const handleReset = () => {
    setTimezone('Asia/Ho_Chi_Minh');
    setSessionTimeout(30);
    setAutoLogout(true);
    setRememberMe(true);
    setMaintenanceMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex h-screen">
      

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-5xl">
            {/* Success Alert */}
            {saved && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Settings saved successfully!</span>
              </div>
            )}

            {/* General Settings Section */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">General Settings</h3>
                  <p className="text-slate-600">Configure basic system preferences</p>
                </div>

                {/* Timezone & Session Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-slate-800">Timezone & Session</h4>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default Timezone
                    </label>
                    <select 
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      {timezones.map(tz => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-2">
                      Current: {new Date().toLocaleString('en-US', { timeZone: timezone })}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Session Timeout
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(Number(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg min-w-[100px] justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 font-semibold">{sessionTimeout} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <span className="text-sm font-medium text-slate-700">Auto Logout on Inactivity</span>
                      <input
                        type="checkbox"
                        checked={autoLogout}
                        onChange={(e) => setAutoLogout(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <span className="text-sm font-medium text-slate-700">Allow "Remember Me"</span>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* System Status Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-slate-800">System Status</h4>
                  </div>

                  <label className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <div>
                      <p className="font-medium text-slate-800">Maintenance Mode</p>
                      <p className="text-sm text-slate-500 mt-1">Temporarily disable access for all users</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </div>
                  </label>

                  <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">System Version:</span>
                      <span className="font-medium text-slate-800">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Updated:</span>
                      <span className="font-medium text-slate-800">Oct 19, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

      

           
          </div>
        </div>
      </div>
    </div>
  );
}