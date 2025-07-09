import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsOverview from './components/MetricsOverview';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import UserManagementTable from './components/UserManagementTable';
import ContentManagementPanel from './components/ContentManagementPanel';
import SecurityLogsPanel from './components/SecurityLogsPanel';
import AnalyticsReporting from './components/AnalyticsReporting';

const AdminDashboardSystemManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', message: 'High CPU usage detected on server-01', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Multiple failed login attempts from IP 203.0.113.45', time: '5 min ago' },
    { id: 3, type: 'info', message: 'System backup completed successfully', time: '1 hour ago' }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'content', label: 'Content Management', icon: 'BookOpen' },
    { id: 'security', label: 'Security Logs', icon: 'Shield' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical': return 'border-error/30 bg-error/10';
      case 'warning': return 'border-warning/30 bg-warning/10';
      case 'info': return 'border-primary/30 bg-primary/10';
      default: return 'border-white/20 bg-white/10';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SystemHealthMonitor />
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 glass-surface rounded-lg">
                    <Icon name="UserPlus" size={16} className="text-success" />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">New user registered</p>
                      <p className="text-xs text-text-secondary">sarah.johnson@email.com</p>
                    </div>
                    <span className="text-xs text-text-secondary">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 glass-surface rounded-lg">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">Course published</p>
                      <p className="text-xs text-text-secondary">Advanced React Development</p>
                    </div>
                    <span className="text-xs text-text-secondary">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 glass-surface rounded-lg">
                    <Icon name="Briefcase" size={16} className="text-secondary" />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">Job posting approved</p>
                      <p className="text-xs text-text-secondary">Senior Frontend Developer</p>
                    </div>
                    <span className="text-xs text-text-secondary">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagementTable />;
      case 'content':
        return <ContentManagementPanel />;
      case 'security':
        return <SecurityLogsPanel />;
      case 'analytics':
        return <AnalyticsReporting />;
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
              <p className="text-text-secondary">Comprehensive platform oversight and system management</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="RefreshCw">
                Refresh
              </Button>
              <Button variant="primary" iconName="Settings">
                System Settings
              </Button>
            </div>
          </div>

          {/* Critical Notifications */}
          {notifications.length > 0 && (
            <div className="mb-6 space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`glass-card p-4 border ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getNotificationIcon(notification.type)} 
                        size={20} 
                        className={
                          notification.type === 'critical' ? 'text-error' :
                          notification.type === 'warning' ? 'text-warning' : 'text-primary'
                        }
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{notification.message}</p>
                        <p className="text-xs text-text-secondary">{notification.time}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismissNotification(notification.id)}
                      iconName="X"
                      className="h-8 w-8 p-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg neon-glow-purple'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardSystemManagement;