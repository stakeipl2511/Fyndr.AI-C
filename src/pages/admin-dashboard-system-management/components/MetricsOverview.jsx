import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      title: "Daily Active Users",
      value: "12,847",
      change: "+8.2%",
      trend: "up",
      icon: "Users",
      color: "text-success"
    },
    {
      title: "Learning Completion Rate",
      value: "78.5%",
      change: "+3.1%",
      trend: "up",
      icon: "BookOpen",
      color: "text-primary"
    },
    {
      title: "Job Postings (24h)",
      value: "234",
      change: "-2.4%",
      trend: "down",
      icon: "Briefcase",
      color: "text-warning"
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: "0.0%",
      trend: "stable",
      icon: "Activity",
      color: "text-success"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
              <Icon name={getTrendIcon(metric.trend)} size={16} />
              <span className="text-sm font-medium">{metric.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{metric.value}</h3>
            <p className="text-sm text-text-secondary">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;