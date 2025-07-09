import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TranscriptPanel = ({ currentTime, onSeekTo, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const transcriptRef = useRef(null);

  const mockTranscript = [
    { id: 1, startTime: 0, endTime: 15, text: "Welcome to Advanced React Development. In this comprehensive course, we'll explore the latest features and best practices for building modern React applications." },
    { id: 2, startTime: 15, endTime: 35, text: "Today we'll start with React 18's new concurrent features, including Suspense, automatic batching, and the new useId hook for generating unique identifiers." },
    { id: 3, startTime: 35, endTime: 55, text: "Understanding these concepts is crucial for building performant applications that can handle complex user interactions and data fetching scenarios." },
    { id: 4, startTime: 55, endTime: 75, text: "Let's begin by examining how automatic batching works in React 18 and how it differs from the previous versions of React." },
    { id: 5, startTime: 75, endTime: 95, text: "Automatic batching means that React will group multiple state updates into a single re-render for better performance." },
    { id: 6, startTime: 95, endTime: 115, text: "This applies to updates inside event handlers, promises, timeouts, and native event handlers." },
    { id: 7, startTime: 115, endTime: 135, text: "Next, we'll explore Suspense for data fetching and how it can improve the user experience by showing loading states." },
    { id: 8, startTime: 135, endTime: 155, text: "Suspense allows components to 'wait' for something before they can render, making async operations more declarative." },
    { id: 9, startTime: 155, endTime: 175, text: "We\'ll also cover error boundaries and how they work with Suspense to handle loading and error states gracefully." },
    { id: 10, startTime: 175, endTime: 195, text: "Finally, we'll implement a practical example using these concepts to build a real-world application feature." }
  ];

  const getCurrentSegment = () => {
    return mockTranscript.find(segment => 
      currentTime >= segment.startTime && currentTime < segment.endTime
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
    
    if (query.length > 0) {
      const foundIndex = mockTranscript.findIndex(segment =>
        segment.text.toLowerCase().includes(query.toLowerCase())
      );
      setHighlightedIndex(foundIndex);
    } else {
      setHighlightedIndex(-1);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleSegmentClick = (startTime) => {
    onSeekTo(startTime);
  };

  const currentSegment = getCurrentSegment();

  useEffect(() => {
    if (currentSegment && transcriptRef.current) {
      const activeElement = transcriptRef.current.querySelector(`[data-segment-id="${currentSegment.id}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSegment]);

  if (!isOpen) return null;

  return (
    <div className="w-full lg:w-96 glass-card border border-white/20 rounded-xl p-4 h-full max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>Transcript</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Download"
            className="h-8 w-8 p-0"
            onClick={() => console.log('Download transcript')}
          />
          <Button
            variant="ghost"
            iconName="Copy"
            className="h-8 w-8 p-0"
            onClick={() => {
              const fullText = mockTranscript.map(s => s.text).join('\n\n');
              navigator.clipboard.writeText(fullText);
            }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
        
        {isSearching && (
          <div className="mt-2 text-sm text-text-secondary">
            {highlightedIndex >= 0 ? (
              <span className="text-success">Found in segment {highlightedIndex + 1}</span>
            ) : (
              <span className="text-error">No results found</span>
            )}
          </div>
        )}
      </div>

      {/* Transcript Content */}
      <div 
        ref={transcriptRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        {mockTranscript.map((segment, index) => {
          const isActive = currentSegment?.id === segment.id;
          const isHighlighted = highlightedIndex === index;
          
          return (
            <div
              key={segment.id}
              data-segment-id={segment.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/20 border border-primary/30 neon-glow-purple' 
                  : isHighlighted
                  ? 'bg-yellow-100/20 border border-yellow-300/30' :'hover:bg-white/10 border border-transparent'
              }`}
              onClick={() => handleSegmentClick(segment.startTime)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    isActive ? 'bg-primary text-white' : 'bg-white/20 text-text-secondary'
                  }`}>
                    {Math.floor(segment.startTime / 60)}:{(segment.startTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed ${
                    isActive ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}>
                    {highlightText(segment.text, searchQuery)}
                  </p>
                </div>
                
                {isActive && (
                  <div className="flex-shrink-0">
                    <Icon name="Play" size={16} className="text-primary" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="glass-surface p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sparkles" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-text-primary">AI Summary</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            This lesson introduces React 18's concurrent features including automatic batching, 
            Suspense for data fetching, and error boundaries. Key concepts covered include 
            performance optimization and declarative async operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPanel;