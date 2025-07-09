import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamActivityFeed = ({ activities }) => {
  const [expandedActivity, setExpandedActivity] = useState(null);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return 'FileText';
      case 'interview': return 'Calendar';
      case 'hire': return 'UserCheck';
      case 'reject': return 'UserX';
      case 'note': return 'MessageSquare';
      case 'job_posted': return 'Plus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'application': return 'text-blue-500';
      case 'interview': return 'text-purple-500';
      case 'hire': return 'text-green-500';
      case 'reject': return 'text-red-500';
      case 'note': return 'text-yellow-500';
      case 'job_posted': return 'text-indigo-500';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Team Activity</h3>
        <Button variant="ghost" iconName="MoreHorizontal" className="h-8 w-8 p-0" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-text-secondary ml-1">{activity.action}</span>
                    {activity.target && (
                      <span className="font-medium text-primary ml-1">{activity.target}</span>
                    )}
                  </p>
                  <span className="text-xs text-text-tertiary flex-shrink-0">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                {activity.description && (
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                )}
                
                {activity.details && (
                  <button
                    onClick={() => setExpandedActivity(
                      expandedActivity === activity.id ? null : activity.id
                    )}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    {expandedActivity === activity.id ? 'Show less' : 'Show details'}
                  </button>
                )}
                
                {expandedActivity === activity.id && activity.details && (
                  <div className="mt-2 p-3 glass-surface rounded-lg">
                    <p className="text-sm text-text-secondary">{activity.details}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Timeline connector */}
            <div className="absolute left-4 top-8 w-px h-4 bg-border" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <Button variant="ghost" className="w-full text-sm">
          View All Activity
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TeamActivityFeed;