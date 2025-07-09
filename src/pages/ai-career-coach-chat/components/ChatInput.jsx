import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Ask me anything about your career..." }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Handle voice recording logic here
    console.log('Voice recording:', !isRecording ? 'started' : 'stopped');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card border border-white/20 rounded-2xl p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full resize-none bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary text-sm leading-relaxed min-h-[40px] max-h-[120px]"
            rows={1}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* File Upload */}
          <Button
            type="button"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="h-10 w-10 p-0"
            disabled={disabled}
          >
            <Icon name="Paperclip" size={18} />
          </Button>
          
          {/* Voice Recording */}
          <Button
            type="button"
            variant="ghost"
            onClick={toggleRecording}
            className={`h-10 w-10 p-0 ${isRecording ? 'text-error' : ''}`}
            disabled={disabled}
          >
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
            >
              <Icon name={isRecording ? 'MicOff' : 'Mic'} size={18} />
            </motion.div>
          </Button>
          
          {/* Send Button */}
          <Button
            type="submit"
            variant={message.trim() ? 'primary' : 'ghost'}
            disabled={!message.trim() || disabled}
            className="h-10 w-10 p-0"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon name="Send" size={18} />
            </motion.div>
          </Button>
        </div>
      </form>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center mt-3 text-error text-sm"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-error rounded-full"
            />
            <span>Recording... Tap to stop</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatInput;