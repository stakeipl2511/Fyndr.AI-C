import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthMonitor = () => {
  const [systemStatus, setSystemStatus] = useState({
    server: 'healthy',
    database: 'healthy',
    api: 'warning',
    storage: 'healthy'
  });

  const [metrics, setMetrics] = useState({
    serverLoad: 45,
    databaseConnections: 78,
    apiResponseTime: 245,
    storageUsage: 62
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        serverLoad: Math.max(20, Math.min(90, prev.serverLoad + (Math.random() - 0.5) * 10)),
        databaseConnections: Math.max(30, Math.min(95, prev.databaseConnections + (Math.random() - 0.5) * 8)),
        apiResponseTime: Math.max(100, Math.min(500, prev.apiResponseTime + (Math.random() - 0.5) * 50)),
        storageUsage: Math.max(40, Math.min(85, prev.storageUsage + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getMetricColor = (value, thresholds) => {
    if (value >= thresholds.error) return 'text-error';
    if (value >= thresholds.warning) return 'text-warning';
    return 'text-success';
  };

  const systemComponents = [
    {
      name: 'Application Server',
      status: systemStatus.server,
      metric: `${metrics.serverLoad}%`,
      description: 'CPU Load',
      thresholds: { warning: 70, error: 85 }
    },
    {
      name: 'Database',
      status: systemStatus.database,
      metric: `${metrics.databaseConnections}%`,
      description: 'Connection Pool',
      thresholds: { warning: 80, error: 90 }
    },
    {
      name: 'API Gateway',
      status: systemStatus.api,
      metric: `${metrics.apiResponseTime}ms`,
      description: 'Avg Response Time',
      thresholds: { warning: 300, error: 400 }
    },
    {
      name: 'File Storage',
      status: systemStatus.storage,
      metric: `${metrics.storageUsage}%`,
      description: 'Disk Usage',
      thresholds: { warning: 75, error: 85 }
    }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">Live Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systemComponents.map((component, index) => (
          <div key={index} className="glass-surface p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`${getStatusColor(component.status)} transition-colors duration-300`}>
                  <Icon name={getStatusIcon(component.status)} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{component.name}</h4>
                  <p className="text-xs text-text-secondary">{component.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getMetricColor(
                  parseFloat(component.metric), 
                  component.thresholds
                )}`}>
                  {component.metric}
                </div>
              </div>
            </div>
            
            {/* Progress bar for visual representation */}
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  parseFloat(component.metric) >= component.thresholds.error ? 'bg-error' :
                  parseFloat(component.metric) >= component.thresholds.warning ? 'bg-warning': 'bg-success'
                }`}
                style={{ 
                  width: `${Math.min(100, parseFloat(component.metric))}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Thresholds */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <h4 className="text-sm font-medium text-text-primary mb-3">Alert Thresholds</h4>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-text-secondary">Healthy (&lt; 70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-text-secondary">Warning (70-85%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-text-secondary">Critical (&gt; 85%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;