import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, value, change, icon, color, chart }) => {
  const isPositive = change && change.startsWith('+');
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon name={icon} size={20} color="white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
      <p className="text-2xl font-bold text-text-primary mb-4">{value}</p>
      
      {chart && (
        <div className="h-16 w-full">
          {chart}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;