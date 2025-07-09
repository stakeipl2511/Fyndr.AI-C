import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PipelineStats = ({ stats, isLoading }) => {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: 'Clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Interviews Scheduled',
      value: stats.interviewsScheduled,
      icon: 'Calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Offers Extended',
      value: stats.offersExtended,
      icon: 'Gift',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Hired This Month',
      value: stats.hiredThisMonth,
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+20%',
      changeType: 'positive'
    },
    {
      title: 'Avg. Time to Hire',
      value: `${stats.avgTimeToHire} days`,
      icon: 'TrendingDown',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: '-3 days',
      changeType: 'positive'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card border border-white/20 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded w-20" />
                <div className="h-8 bg-white/20 rounded w-12" />
                <div className="h-3 bg-white/20 rounded w-16" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card border border-white/20 rounded-2xl p-6 hover-lift"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-text-primary mb-2">
                {stat.value}
              </p>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'} 
                />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-text-tertiary">vs last month</span>
              </div>
            </div>
            
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PipelineStats;