import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityLogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(true);

  const securityLogs = [
    {
      id: 1,
      timestamp: "2024-01-15T10:30:15Z",
      level: "warning",
      event: "Multiple failed login attempts",
      user: "john.doe@email.com",
      ip: "192.168.1.100",
      location: "San Francisco, CA",
      details: "5 consecutive failed login attempts detected",
      action: "Account temporarily locked"
    },
    {
      id: 2,
      timestamp: "2024-01-15T10:25:42Z",
      level: "info",
      event: "Admin login successful",
      user: "admin@hirehub.ai",
      ip: "10.0.0.50",
      location: "New York, NY",
      details: "Administrator successfully logged in",
      action: "Session created"
    },
    {
      id: 3,
      timestamp: "2024-01-15T10:20:33Z",
      level: "critical",
      event: "Suspicious API activity",
      user: "api_user_12345",
      ip: "203.0.113.45",
      location: "Unknown",
      details: "Unusual API request pattern detected - 1000+ requests in 1 minute",
      action: "API key suspended"
    },
    {
      id: 4,
      timestamp: "2024-01-15T10:15:28Z",
      level: "info",
      event: "Password changed",
      user: "sarah.johnson@email.com",
      ip: "192.168.1.75",
      location: "Austin, TX",
      details: "User successfully changed password",
      action: "Password updated"
    },
    {
      id: 5,
      timestamp: "2024-01-15T10:10:19Z",
      level: "warning",
      event: "Unauthorized access attempt",
      user: "unknown",
      ip: "198.51.100.23",
      location: "Moscow, Russia",
      details: "Attempt to access admin panel without proper credentials",
      action: "IP blocked temporarily"
    }
  ];

  useEffect(() => {
    setLogs(securityLogs);
  }, []);

  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        // Simulate new log entries
        const newLog = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          level: ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)],
          event: "New security event",
          user: "system@hirehub.ai",
          ip: "10.0.0.1",
          location: "System",
          details: "Automated security check completed",
          action: "No action required"
        };
        
        setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep only latest 50 logs
      }, 10000); // Add new log every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-text-secondary bg-white/10 border-white/20';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleExportLogs = () => {
    console.log('Exporting security logs...');
    // Implement export functionality
  };

  const handleClearLogs = () => {
    console.log('Clearing old logs...');
    // Implement clear logs functionality
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Security Logs</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-success animate-pulse' : 'bg-text-secondary'}`}></div>
            <span className="text-sm text-text-secondary">
              {isLiveMode ? 'Live Monitoring' : 'Paused'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={isLiveMode ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsLiveMode(!isLiveMode)}
            iconName={isLiveMode ? 'Pause' : 'Play'}
          >
            {isLiveMode ? 'Pause' : 'Resume'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportLogs}
            iconName="Download"
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearLogs}
            iconName="Trash2"
          >
            Clear Old
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <Input
          type="search"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
        
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-3 py-2 glass-surface rounded-lg border border-white/20 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Levels</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Logs List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredLogs.map((log) => (
          <div key={log.id} className={`glass-surface p-4 rounded-xl border ${getLevelColor(log.level)}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon name={getLevelIcon(log.level)} size={20} className={getLevelColor(log.level).split(' ')[0]} />
                <div>
                  <h4 className="font-medium text-text-primary">{log.event}</h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                    <span>{log.user}</span>
                    <span>{log.ip}</span>
                    <span>{log.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                {formatTimestamp(log.timestamp)}
              </div>
            </div>
            
            <div className="ml-8">
              <p className="text-sm text-text-secondary mb-2">{log.details}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-tertiary">Action: {log.action}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  className="h-6 text-xs"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-surface p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-error/20 flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-error" />
            </div>
            <div>
              <div className="text-lg font-bold text-text-primary">
                {filteredLogs.filter(log => log.level === 'critical').length}
              </div>
              <div className="text-sm text-text-secondary">Critical Events</div>
            </div>
          </div>
        </div>
        
        <div className="glass-surface p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
              <Icon name="AlertCircle" size={16} className="text-warning" />
            </div>
            <div>
              <div className="text-lg font-bold text-text-primary">
                {filteredLogs.filter(log => log.level === 'warning').length}
              </div>
              <div className="text-sm text-text-secondary">Warnings</div>
            </div>
          </div>
        </div>
        
        <div className="glass-surface p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name="Info" size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-text-primary">
                {filteredLogs.filter(log => log.level === 'info').length}
              </div>
              <div className="text-sm text-text-secondary">Info Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogsPanel;