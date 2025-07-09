import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuggestionChips = ({ suggestions, onSuggestionClick, isVisible = true }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative mb-4"
    >
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={scrollLeft}
          className="h-8 w-8 p-0 flex-shrink-0 hidden sm:flex"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
        
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide flex-1 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => onSuggestionClick(suggestion.text)}
                className="whitespace-nowrap glass-surface border border-white/20 hover:border-primary/50 transition-all duration-300 text-sm px-4 py-2 h-auto"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={suggestion.icon} size={14} />
                  <span>{suggestion.text}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          onClick={scrollRight}
          className="h-8 w-8 p-0 flex-shrink-0 hidden sm:flex"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default SuggestionChips;