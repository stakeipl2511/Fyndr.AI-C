import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ChatHistory = ({ isOpen, onClose, conversations, onResumeConversation, onDeleteConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Conversations', count: conversations.length },
    { id: 'career-advice', label: 'Career Advice', count: conversations.filter(c => c.category === 'career-advice').length },
    { id: 'resume-review', label: 'Resume Review', count: conversations.filter(c => c.category === 'resume-review').length },
    { id: 'interview-prep', label: 'Interview Prep', count: conversations.filter(c => c.category === 'interview-prep').length },
    { id: 'skill-development', label: 'Skill Development', count: conversations.filter(c => c.category === 'skill-development').length }
  ];

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conversation.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || conversation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'career-advice': return 'Compass';
      case 'resume-review': return 'FileText';
      case 'interview-prep': return 'MessageCircle';
      case 'skill-development': return 'TrendingUp';
      default: return 'MessageSquare';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1020"
          />
          
          {/* Slide Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-card border-l border-white/20 z-1030 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-text-primary">Chat History</h2>
              <Button
                variant="ghost"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            
            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <Input
                type="search"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Categories */}
            <div className="p-4 border-b border-white/10">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary/20 text-primary border border-primary/30' :'hover:bg-white/5 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={getCategoryIcon(category.id)} size={16} />
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="MessageSquare" size={48} className="mx-auto text-text-tertiary mb-4" />
                  <p className="text-text-secondary">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-surface p-4 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={getCategoryIcon(conversation.category)} size={14} className="text-primary" />
                        <h3 className="font-medium text-sm text-text-primary truncate">
                          {conversation.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          onClick={() => onResumeConversation(conversation.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Icon name="Play" size={12} />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDeleteConversation(conversation.id)}
                          className="h-6 w-6 p-0 text-error hover:text-error"
                        >
                          <Icon name="Trash2" size={12} />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                      {conversation.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-tertiary">
                        {formatDate(conversation.lastActivity)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-tertiary">
                          {conversation.messageCount} messages
                        </span>
                        {conversation.hasActionItems && (
                          <Icon name="CheckSquare" size={12} className="text-success" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => console.log('Export conversations')}
                className="w-full"
                iconName="Download"
              >
                Export Conversations
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatHistory;