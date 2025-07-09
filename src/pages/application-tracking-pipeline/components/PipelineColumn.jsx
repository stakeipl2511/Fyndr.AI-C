import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import CandidateCard from './CandidateCard';

const PipelineColumn = ({ 
  stage, 
  candidates, 
  onCandidateMove, 
  onCandidateSelect,
  onCandidateReject,
  selectedCandidates,
  isLoading 
}) => {
  const getStageColor = (stageName) => {
    switch (stageName) {
      case 'Applied': return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'Screening': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'Interview': return 'bg-purple-100 border-purple-200 text-purple-800';
      case 'Offer': return 'bg-green-100 border-green-200 text-green-800';
      case 'Hired': return 'bg-emerald-100 border-emerald-200 text-emerald-800';
      case 'Rejected': return 'bg-red-100 border-red-200 text-red-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getStageIcon = (stageName) => {
    switch (stageName) {
      case 'Applied': return 'FileText';
      case 'Screening': return 'Search';
      case 'Interview': return 'MessageCircle';
      case 'Offer': return 'Gift';
      case 'Hired': return 'CheckCircle';
      case 'Rejected': return 'XCircle';
      default: return 'Circle';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('candidateId');
    const sourceStage = e.dataTransfer.getData('sourceStage');
    
    if (sourceStage !== stage.name) {
      onCandidateMove(candidateId, sourceStage, stage.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 min-w-80 max-w-sm"
    >
      <div
        className="h-full glass-card border border-white/20 rounded-2xl overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Column Header */}
        <div className={`p-4 border-b border-white/10 ${getStageColor(stage.name)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name={getStageIcon(stage.name)} size={20} />
              <h3 className="font-semibold text-lg">{stage.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                {candidates.length}
              </span>
              {stage.name === 'Hired' && candidates.length > 0 && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Icon name="Trophy" size={16} className="text-yellow-600" />
                </motion.div>
              )}
            </div>
          </div>
          {stage.description && (
            <p className="text-sm opacity-80 mt-1">{stage.description}</p>
          )}
        </div>

        {/* Candidates List */}
        <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-surface p-4 rounded-xl animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/20 rounded w-3/4" />
                      <div className="h-3 bg-white/20 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-text-tertiary mb-4" />
              <p className="text-text-secondary">No candidates in this stage</p>
              <p className="text-sm text-text-tertiary mt-1">
                Drag candidates here to move them to {stage.name}
              </p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                stage={stage.name}
                onMove={onCandidateMove}
                onSelect={onCandidateSelect}
                onReject={onCandidateReject}
                isSelected={selectedCandidates.includes(candidate.id)}
              />
            ))
          )}
        </div>

        {/* Column Footer */}
        {candidates.length > 0 && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>Total: {candidates.length}</span>
              {stage.name === 'Hired' && (
                <span className="text-success font-medium">
                  🎉 Success Rate: {Math.round((candidates.length / 10) * 100)}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PipelineColumn;