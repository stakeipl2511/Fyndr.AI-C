import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatusIndicator = ({ status = 'online', className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'text-success',
          bgColor: 'bg-success',
          icon: 'Zap',
          label: 'AI Coach is online',
          pulse: true
        };
      case 'processing':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning',
          icon: 'Brain',
          label: 'Processing your request...',
          pulse: true
        };
      case 'offline':
        return {
          color: 'text-text-tertiary',
          bgColor: 'bg-text-tertiary',
          icon: 'Moon',
          label: 'AI Coach is offline',
          pulse: false
        };
      default:
        return {
          color: 'text-success',
          bgColor: 'bg-success',
          icon: 'Zap',
          label: 'AI Coach is online',
          pulse: true
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <motion.div
          className={`w-2 h-2 rounded-full ${config.bgColor}`}
          animate={config.pulse ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {config.pulse && (
          <motion.div
            className={`absolute inset-0 w-2 h-2 rounded-full ${config.bgColor} opacity-30`}
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <Icon name={config.icon} size={14} className={config.color} />
        <span className={`text-xs ${config.color}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
};

export default StatusIndicator;