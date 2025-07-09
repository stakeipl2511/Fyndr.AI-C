import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CandidateCard = ({ candidate, onShortlist, onMessage, onRequestProfile, onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [note, setNote] = useState(candidate.notes || '');
  const [isShortlisted, setIsShortlisted] = useState(candidate.isShortlisted || false);

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
    onShortlist(candidate.id, !isShortlisted);
  };

  const handleSaveNote = () => {
    onAddNote(candidate.id, note);
    setShowNotes(false);
  };

  const getSkillColor = (proficiency) => {
    if (proficiency >= 90) return 'bg-success';
    if (proficiency >= 70) return 'bg-primary';
    if (proficiency >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card border border-white/20 rounded-2xl p-6 hover-lift"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={candidate.avatar}
              alt={`${candidate.name} avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              candidate.isOnline ? 'bg-success' : 'bg-text-tertiary'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{candidate.name}</h3>
            <p className="text-sm text-text-secondary">{candidate.title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="MapPin" size={14} className="text-text-tertiary" />
              <span className="text-xs text-text-secondary">{candidate.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`text-2xl font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
            {candidate.matchScore}%
          </div>
          <Button
            variant={isShortlisted ? 'primary' : 'ghost'}
            onClick={handleShortlist}
            iconName={isShortlisted ? 'Heart' : 'Heart'}
            className="h-8 w-8 p-0"
          />
        </div>
      </div>

      {/* Experience & Availability */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="glass-surface p-3 rounded-xl">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Briefcase" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Experience</span>
          </div>
          <p className="text-sm text-text-secondary">{candidate.experience}</p>
        </div>
        
        <div className="glass-surface p-3 rounded-xl">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-text-primary">Availability</span>
          </div>
          <p className="text-sm text-text-secondary">{candidate.availability}</p>
        </div>
      </div>

      {/* Top Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Top Skills</h4>
        <div className="space-y-2">
          {candidate.topSkills.slice(0, isExpanded ? candidate.topSkills.length : 3).map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-text-primary">{skill.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getSkillColor(skill.proficiency)} transition-all duration-500`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary w-8">{skill.proficiency}%</span>
              </div>
            </div>
          ))}
        </div>
        
        {candidate.topSkills.length > 3 && (
          <Button
            variant="text"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary mt-2"
          >
            {isExpanded ? 'Show less' : `Show ${candidate.topSkills.length - 3} more skills`}
          </Button>
        )}
      </div>

      {/* Portfolio Preview */}
      {candidate.portfolio && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Portfolio Highlights</h4>
          <div className="grid grid-cols-2 gap-2">
            {candidate.portfolio.slice(0, 2).map((project, index) => (
              <div key={index} className="glass-surface p-3 rounded-xl">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="ExternalLink" size={14} className="text-primary" />
                  <span className="text-xs font-medium text-text-primary truncate">{project.name}</span>
                </div>
                <p className="text-xs text-text-secondary">{project.description}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salary Expectation */}
      <div className="flex items-center justify-between mb-4 p-3 glass-surface rounded-xl">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} className="text-success" />
          <span className="text-sm font-medium text-text-primary">Salary Expectation</span>
        </div>
        <span className="text-sm text-text-primary font-medium">{candidate.salaryExpectation}</span>
      </div>

      {/* Notes Section */}
      {showNotes && (
        <div className="mb-4 p-3 glass-surface rounded-xl">
          <h4 className="text-sm font-medium text-text-primary mb-2">Notes</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes about this candidate..."
            className="w-full h-20 p-2 bg-white/10 border border-white/20 rounded-lg text-sm text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex space-x-2 mt-2">
            <Button variant="primary" onClick={handleSaveNote} className="text-xs">
              Save Note
            </Button>
            <Button variant="ghost" onClick={() => setShowNotes(false)} className="text-xs">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="primary"
          onClick={() => onRequestProfile(candidate.id)}
          iconName="Eye"
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          variant="secondary"
          onClick={() => onMessage(candidate.id)}
          iconName="MessageCircle"
          className="flex-1"
        >
          Message
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowNotes(!showNotes)}
          iconName="FileText"
          className="h-10 w-10 p-0"
        />
      </div>

      {/* Last Activity */}
      <div className="flex items-center justify-center mt-3 pt-3 border-t border-white/10">
        <span className="text-xs text-text-tertiary">
          Last active {candidate.lastActive}
        </span>
      </div>
    </motion.div>
  );
};

export default CandidateCard;