import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock data for different charts
  const userActivityData = [
    { date: '2024-01-09', users: 1200, sessions: 1800, pageViews: 4500 },
    { date: '2024-01-10', users: 1350, sessions: 2100, pageViews: 5200 },
    { date: '2024-01-11', users: 1180, sessions: 1950, pageViews: 4800 },
    { date: '2024-01-12', users: 1420, sessions: 2300, pageViews: 5800 },
    { date: '2024-01-13', users: 1680, sessions: 2650, pageViews: 6400 },
    { date: '2024-01-14', users: 1550, sessions: 2400, pageViews: 6100 },
    { date: '2024-01-15', users: 1720, sessions: 2800, pageViews: 6900 }
  ];

  const learningProgressData = [
    { course: 'React Dev', completed: 85, inProgress: 45, notStarted: 20 },
    { course: 'ML Basics', completed: 62, inProgress: 38, notStarted: 35 },
    { course: 'UI/UX Design', completed: 94, inProgress: 28, notStarted: 15 },
    { course: 'Data Science', completed: 71, inProgress: 42, notStarted: 28 },
    { course: 'DevOps', completed: 56, inProgress: 35, notStarted: 42 }
  ];

  const userRoleDistribution = [
    { name: 'Job Seekers', value: 65, color: '#a78bfa' },
    { name: 'Recruiters', value: 25, color: '#5eead4' },
    { name: 'Admins', value: 10, color: '#fbcfe8' }
  ];

  const platformMetrics = [
    { metric: 'Total Users', value: '24,847', change: '+12.5%', trend: 'up' },
    { metric: 'Active Courses', value: '156', change: '+8.2%', trend: 'up' },
    { metric: 'Job Postings', value: '1,234', change: '-2.1%', trend: 'down' },
    { metric: 'Success Rate', value: '78.9%', change: '+5.3%', trend: 'up' }
  ];

  const handleExportReport = (format) => {
    console.log(`Exporting report in ${format} format`);
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h3 className="text-lg font-semibold text-text-primary">Analytics & Reporting</h3>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 glass-surface rounded-lg border border-white/20 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportReport('pdf')}
              iconName="FileText"
            >
              Export PDF
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportReport('csv')}
              iconName="Download"
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformMetrics.map((metric, index) => (
            <div key={index} className="glass-surface p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-text-secondary">{metric.metric}</h4>
                <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                  <Icon name={getTrendIcon(metric.trend)} size={14} />
                  <span className="text-xs">{metric.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium text-text-primary">User Activity Trends</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedMetric('users')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedMetric === 'users' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setSelectedMetric('sessions')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedMetric === 'sessions' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sessions
            </button>
            <button
              onClick={() => setSelectedMetric('pageViews')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedMetric === 'pageViews' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Page Views
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userActivityData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke="#a78bfa"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <div className="glass-card p-6">
          <h4 className="text-lg font-medium text-text-primary mb-6">Course Completion Rates</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="course" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)'
                  }}
                />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
                <Bar dataKey="notStarted" stackId="a" fill="#6b7280" name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="glass-card p-6">
          <h4 className="text-lg font-medium text-text-primary mb-6">User Role Distribution</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRoleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-medium text-text-primary mb-6">Detailed Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('user-engagement')}
          >
            <Icon name="Users" size={24} />
            <span>User Engagement Report</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('learning-analytics')}
          >
            <Icon name="BookOpen" size={24} />
            <span>Learning Analytics</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('recruitment-metrics')}
          >
            <Icon name="Briefcase" size={24} />
            <span>Recruitment Metrics</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('system-performance')}
          >
            <Icon name="Activity" size={24} />
            <span>System Performance</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('financial-summary')}
          >
            <Icon name="DollarSign" size={24} />
            <span>Financial Summary</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            onClick={() => handleExportReport('custom-report')}
          >
            <Icon name="Settings" size={24} />
            <span>Custom Report</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReporting;