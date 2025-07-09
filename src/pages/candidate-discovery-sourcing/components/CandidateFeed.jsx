import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CandidateCard from './CandidateCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CandidateFeed = ({ 
  candidates, 
  loading, 
  hasMore, 
  onLoadMore, 
  viewMode,
  selectedCandidates,
  onCandidateSelect,
  onShortlist,
  onMessage,
  onRequestProfile,
  onAddNote
}) => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Auto-enable selection mode when candidates are selected
  useEffect(() => {
    setIsSelectionMode(selectedCandidates.length > 0);
  }, [selectedCandidates.length]);

  const handleCandidateSelect = (candidateId) => {
    onCandidateSelect(candidateId);
  };

  const handleSelectAll = () => {
    const allIds = candidates.map(c => c.id);
    const allSelected = allIds.every(id => selectedCandidates.includes(id));
    
    if (allSelected) {
      // Deselect all
      allIds.forEach(id => {
        if (selectedCandidates.includes(id)) {
          onCandidateSelect(id);
        }
      });
    } else {
      // Select all
      allIds.forEach(id => {
        if (!selectedCandidates.includes(id)) {
          onCandidateSelect(id);
        }
      });
    }
  };

  const SkeletonCard = () => (
    <div className="glass-card border border-white/20 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full" />
          <div>
            <div className="w-32 h-4 bg-white/20 rounded mb-2" />
            <div className="w-24 h-3 bg-white/20 rounded mb-1" />
            <div className="w-20 h-3 bg-white/20 rounded" />
          </div>
        </div>
        <div className="w-12 h-8 bg-white/20 rounded" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="glass-surface p-3 rounded-xl">
          <div className="w-20 h-3 bg-white/20 rounded mb-2" />
          <div className="w-16 h-3 bg-white/20 rounded" />
        </div>
        <div className="glass-surface p-3 rounded-xl">
          <div className="w-20 h-3 bg-white/20 rounded mb-2" />
          <div className="w-16 h-3 bg-white/20 rounded" />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="w-20 h-3 bg-white/20 rounded" />
            <div className="w-24 h-2 bg-white/20 rounded" />
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <div className="flex-1 h-10 bg-white/20 rounded-lg" />
        <div className="flex-1 h-10 bg-white/20 rounded-lg" />
        <div className="w-10 h-10 bg-white/20 rounded-lg" />
      </div>
    </div>
  );

  if (candidates.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="Users" size={48} className="text-text-tertiary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No candidates found</h3>
        <p className="text-text-secondary text-center max-w-md">
          Try adjusting your search criteria or filters to find more candidates that match your requirements.
        </p>
        <Button variant="primary" className="mt-4">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selection Controls */}
      {candidates.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant={isSelectionMode ? 'primary' : 'ghost'}
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              iconName="CheckSquare"
              className="text-sm"
            >
              {isSelectionMode ? 'Exit Selection' : 'Select Multiple'}
            </Button>
            
            {isSelectionMode && (
              <Button
                variant="ghost"
                onClick={handleSelectAll}
                className="text-sm"
              >
                {candidates.every(c => selectedCandidates.includes(c.id)) ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </div>
          
          {selectedCandidates.length > 0 && (
            <span className="text-sm text-primary">
              {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      )}

      {/* Candidates Grid/List */}
      <div className={`${
        viewMode === 'grid' ?'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
      }`}>
        <AnimatePresence>
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Selection Checkbox */}
              {isSelectionMode && (
                <div className="absolute top-4 left-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleCandidateSelect(candidate.id)}
                    className="w-5 h-5 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                </div>
              )}
              
              <CandidateCard
                candidate={candidate}
                onShortlist={onShortlist}
                onMessage={onMessage}
                onRequestProfile={onRequestProfile}
                onAddNote={onAddNote}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Skeletons */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            iconName="ChevronDown"
            className="px-8"
          >
            Load More Candidates
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && candidates.length > 0 && (
        <div className="flex justify-center pt-8">
          <div className="text-center">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              You've viewed all available candidates matching your criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateFeed;