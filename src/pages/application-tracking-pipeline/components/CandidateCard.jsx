import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CandidateCard = ({ 
  candidate, 
  stage, 
  onMove, 
  onSelect, 
  onReject, 
  isSelected 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('candidateId', candidate.id);
    e.dataTransfer.setData('sourceStage', stage);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getNextStage = () => {
    const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
    const currentIndex = stages.indexOf(stage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  };

  const getPreviousStage = () => {
    const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
    const currentIndex = stages.indexOf(stage);
    return currentIndex > 0 ? stages[currentIndex - 1] : null;
  };

  const getSkillMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const nextStage = getNextStage();
  const previousStage = getPreviousStage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isDragging ? 0.5 : 1, 
        scale: isDragging ? 0.95 : 1 
      }}
      whileHover={{ scale: 1.02 }}
      className={`glass-surface border border-white/20 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary neon-glow-purple' : ''
      } ${isDragging ? 'shadow-2xl' : 'hover:shadow-lg'}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onSelect(candidate)}
    >
      {/* Selection Checkbox */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(candidate);
            }}
            className="w-4 h-4 text-primary bg-white/20 border-white/30 rounded focus:ring-primary focus:ring-2"
          />
        </div>

        {/* Candidate Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={candidate.avatar}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
          />
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-text-primary truncate">
              {candidate.name}
            </h4>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillMatchColor(candidate.skillMatch)}`}>
              {candidate.skillMatch}% match
            </div>
          </div>
          
          <p className="text-sm text-text-secondary truncate mt-1">
            {candidate.position}
          </p>
          
          <div className="flex items-center space-x-4 mt-2 text-xs text-text-tertiary">
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Applied {formatDate(candidate.appliedDate)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{candidate.location}</span>
            </span>
          </div>

          {/* Experience & Skills */}
          <div className="mt-3">
            <div className="flex items-center space-x-2 text-xs">
              <Icon name="Briefcase" size={12} className="text-text-tertiary" />
              <span className="text-text-secondary">{candidate.experience} years</span>
              <span className="text-text-tertiary">•</span>
              <span className="text-text-secondary">{candidate.education}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {candidate.topSkills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {candidate.topSkills.length > 3 && (
                <span className="px-2 py-1 bg-white/10 text-text-tertiary text-xs rounded-full">
                  +{candidate.topSkills.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Notes Preview */}
          {candidate.notes && (
            <div className="mt-3 p-2 bg-white/5 rounded-lg">
              <p className="text-xs text-text-secondary line-clamp-2">
                {candidate.notes}
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showActions ? 1 : 0, 
              height: showActions ? 'auto' : 0 
            }}
            className="mt-3 flex items-center space-x-2 overflow-hidden"
          >
            {previousStage && (
              <Button
                variant="ghost"
                size="xs"
                iconName="ChevronLeft"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(candidate.id, stage, previousStage);
                }}
                className="text-xs"
              >
                {previousStage}
              </Button>
            )}
            
            {nextStage && (
              <Button
                variant="primary"
                size="xs"
                iconName="ChevronRight"
                iconPosition="right"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(candidate.id, stage, nextStage);
                }}
                className="text-xs"
              >
                {nextStage}
              </Button>
            )}
            
            <Button
              variant="danger"
              size="xs"
              iconName="X"
              onClick={(e) => {
                e.stopPropagation();
                onReject(candidate.id);
              }}
              className="text-xs"
            >
              Reject
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Drag Indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="Move" size={24} className="text-primary" />
        </div>
      )}
    </motion.div>
  );
};

export default CandidateCard;