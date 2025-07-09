import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeMessage = ({ onQuickStart, userName = 'there' }) => {
  const quickStartOptions = [
    {
      title: 'Resume Review',
      description: 'Get feedback on your resume and improve it',
      icon: 'FileText',
      action: () => onQuickStart('resume-review')
    },
    {
      title: 'Interview Prep',
      description: 'Practice common interview questions',
      icon: 'MessageCircle',
      action: () => onQuickStart('interview-prep')
    },
    {
      title: 'Career Planning',
      description: 'Discuss your career goals and next steps',
      icon: 'Compass',
      action: () => onQuickStart('career-planning')
    },
    {
      title: 'Skill Assessment',
      description: 'Identify skills to develop for your goals',
      icon: 'TrendingUp',
      action: () => onQuickStart('skill-assessment')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 px-4"
    >
      {/* AI Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
      >
        <Icon name="Bot" size={32} color="white" />
      </motion.div>
      
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Hi {userName}! 👋
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          I'm your AI Career Coach, here to help you navigate your professional journey. 
          What would you like to work on today?
        </p>
      </motion.div>
      
      {/* Quick Start Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
      >
        {quickStartOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              onClick={option.action}
              className="w-full h-auto p-4 glass-surface border border-white/20 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={option.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {option.description}
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 pt-6 border-t border-white/10"
      >
        <div className="flex items-center justify-center space-x-6 text-xs text-text-tertiary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Confidential</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>Instant Responses</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Brain" size={12} />
            <span>AI-Powered</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeMessage;