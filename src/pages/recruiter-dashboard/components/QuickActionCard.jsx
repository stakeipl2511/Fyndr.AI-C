import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, color, onClick, count, trend }) => {
  return (
    <div className="glass-card p-6 hover-lift cursor-pointer group" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend.type === 'up' ? 'text-success' : 'text-error'}`}>
            <Icon name={trend.type === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      
      {count && (
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-text-primary">{count}</span>
          <Button variant="ghost" iconName="ArrowRight" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
};

export default QuickActionCard;