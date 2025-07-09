import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, isUser, isTyping = false, onFeedback }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!isUser && !isTyping && message.content) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.content.length) {
          setDisplayedText(message.content.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setShowFeedback(true);
        }
      }, 20);

      return () => clearInterval(timer);
    } else if (isUser) {
      setDisplayedText(message.content);
    }
  }, [message.content, isUser, isTyping]);

  const handleFeedback = (type) => {
    setFeedback(type);
    onFeedback?.(message.id, type);
  };

  const formatContent = (content) => {
    // Handle bullet points
    const bulletPoints = content.split('\n').map((line, index) => {
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.replace(/^[•-]\s*/, '')}
          </li>
        );
      }
      return line && <p key={index} className="mb-2">{line}</p>;
    });

    return bulletPoints.some(item => item?.type === 'li') ? (
      <ul className="list-disc list-inside space-y-1">{bulletPoints}</ul>
    ) : (
      <div>{bulletPoints}</div>
    );
  };

  if (isTyping) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start space-x-3 mb-6"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="glass-card p-4 rounded-2xl rounded-tl-sm max-w-xs">
          <div className="flex space-x-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <Icon name="Bot" size={16} color="white" />
          </div>
        )}
        
        <div className="flex flex-col">
          <div className={`p-4 rounded-2xl ${
            isUser 
              ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-sm' :'glass-card rounded-tl-sm'
          }`}>
            <div className="text-sm leading-relaxed">
              {isUser ? message.content : formatContent(displayedText)}
            </div>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg">
                    <Icon name={attachment.type === 'file' ? 'FileText' : 'Link'} size={16} />
                    <span className="text-xs">{attachment.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            {message.actionItems && message.actionItems.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="text-xs font-medium text-text-secondary mb-2">Action Items:</div>
                {message.actionItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                    <Icon name="CheckSquare" size={14} />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-xs text-text-tertiary">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            
            {!isUser && showFeedback && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => handleFeedback('helpful')}
                  className={`h-6 w-6 p-0 ${feedback === 'helpful' ? 'text-success' : 'text-text-tertiary'}`}
                >
                  <Icon name="ThumbsUp" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleFeedback('not-helpful')}
                  className={`h-6 w-6 p-0 ${feedback === 'not-helpful' ? 'text-error' : 'text-text-tertiary'}`}
                >
                  <Icon name="ThumbsDown" size={12} />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={16} color="white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;