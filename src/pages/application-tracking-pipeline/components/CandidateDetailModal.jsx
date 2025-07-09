import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const CandidateDetailModal = ({ 
  candidate, 
  isOpen, 
  onClose, 
  onMove, 
  onReject,
  onSaveNotes 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState(candidate?.notes || '');
  const [rating, setRating] = useState(candidate?.rating || 0);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!candidate) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'skills', label: 'Skills', icon: 'Code' },
    { id: 'notes', label: 'Notes & Feedback', icon: 'MessageSquare' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const handleSaveNotes = () => {
    onSaveNotes(candidate.id, notes, rating);
    setIsEditingNotes(false);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="flex items-start space-x-6">
        <Image
          src={candidate.avatar}
          alt={candidate.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-text-primary">{candidate.name}</h2>
          <p className="text-lg text-text-secondary mt-1">{candidate.position}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-text-tertiary">
            <span className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{candidate.location}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Mail" size={16} />
              <span>{candidate.email}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Phone" size={16} />
              <span>{candidate.phone}</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            candidate.skillMatch >= 90 ? 'bg-green-100 text-green-800' :
            candidate.skillMatch >= 70 ? 'bg-yellow-100 text-yellow-800': 'bg-red-100 text-red-800'
          }`}>
            {candidate.skillMatch}% Skill Match
          </div>
          <div className="mt-2">
            {renderStarRating()}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-surface p-4 rounded-xl text-center">
          <Icon name="Briefcase" size={24} className="mx-auto text-primary mb-2" />
          <div className="text-2xl font-bold text-text-primary">{candidate.experience}</div>
          <div className="text-sm text-text-secondary">Years Experience</div>
        </div>
        <div className="glass-surface p-4 rounded-xl text-center">
          <Icon name="GraduationCap" size={24} className="mx-auto text-secondary mb-2" />
          <div className="text-lg font-bold text-text-primary">{candidate.education}</div>
          <div className="text-sm text-text-secondary">Education</div>
        </div>
        <div className="glass-surface p-4 rounded-xl text-center">
          <Icon name="Calendar" size={24} className="mx-auto text-accent mb-2" />
          <div className="text-lg font-bold text-text-primary">
            {new Date(candidate.appliedDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-text-secondary">Applied Date</div>
        </div>
        <div className="glass-surface p-4 rounded-xl text-center">
          <Icon name="Globe" size={24} className="mx-auto text-primary mb-2" />
          <div className="text-lg font-bold text-text-primary">{candidate.source}</div>
          <div className="text-sm text-text-secondary">Source</div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-surface p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Professional Summary</h3>
        <p className="text-text-secondary leading-relaxed">
          {candidate.summary || `Experienced ${candidate.position} with ${candidate.experience} years of expertise in software development. Strong background in modern web technologies and agile methodologies. Proven track record of delivering high-quality solutions and leading cross-functional teams.`}
        </p>
      </div>
    </div>
  );

  const renderExperienceTab = () => (
    <div className="space-y-6">
      {candidate.workExperience?.map((job, index) => (
        <div key={index} className="glass-surface p-6 rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary">{job.title}</h3>
              <p className="text-primary font-medium">{job.company}</p>
              <p className="text-sm text-text-tertiary mt-1">{job.duration}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-text-secondary">{job.location}</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-text-secondary">{job.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.technologies?.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )) || (
        <div className="text-center py-8">
          <Icon name="Briefcase" size={48} className="mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary">No work experience data available</p>
        </div>
      )}
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="glass-surface p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Technical Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {candidate.skills?.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-text-primary">{skill.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">{skill.level}%</span>
              </div>
            </div>
          )) || (
            <div className="col-span-2 text-center py-4">
              <p className="text-text-secondary">No skill data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-surface p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Certifications</h3>
        <div className="space-y-3">
          {candidate.certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="Award" size={20} className="text-secondary" />
              <div className="flex-1">
                <p className="font-medium text-text-primary">{cert.name}</p>
                <p className="text-sm text-text-secondary">{cert.issuer} • {cert.date}</p>
              </div>
            </div>
          )) || (
            <div className="text-center py-4">
              <p className="text-text-secondary">No certifications available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-6">
      {/* Rating */}
      <div className="glass-surface p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Overall Rating</h3>
        {renderStarRating()}
      </div>

      {/* Notes */}
      <div className="glass-surface p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Interview Notes</h3>
          <Button
            variant={isEditingNotes ? 'success' : 'primary'}
            iconName={isEditingNotes ? 'Check' : 'Edit'}
            onClick={isEditingNotes ? handleSaveNotes : () => setIsEditingNotes(true)}
          >
            {isEditingNotes ? 'Save' : 'Edit'}
          </Button>
        </div>
        
        {isEditingNotes ? (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes about this candidate..."
            className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        ) : (
          <div className="min-h-32 p-4 bg-white/5 rounded-lg">
            <p className="text-text-secondary whitespace-pre-wrap">
              {notes || 'No notes added yet. Click Edit to add your feedback.'}
            </p>
          </div>
        )}
      </div>

      {/* Team Feedback */}
      <div className="glass-surface p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Team Feedback</h3>
        <div className="space-y-4">
          {candidate.teamFeedback?.map((feedback, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Image
                src={feedback.avatar}
                alt={feedback.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-text-primary">{feedback.name}</span>
                  <span className="text-sm text-text-tertiary">{feedback.role}</span>
                  <span className="text-sm text-text-tertiary">•</span>
                  <span className="text-sm text-text-tertiary">{feedback.date}</span>
                </div>
                <p className="text-text-secondary mt-1">{feedback.comment}</p>
              </div>
            </div>
          )) || (
            <div className="text-center py-4">
              <p className="text-text-secondary">No team feedback yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-4">
      {candidate.timeline?.map((event, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name={event.icon} size={16} className="text-primary" />
          </div>
          <div className="flex-1 glass-surface p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">{event.title}</h4>
              <span className="text-sm text-text-tertiary">{event.date}</span>
            </div>
            <p className="text-text-secondary mt-1">{event.description}</p>
          </div>
        </div>
      )) || (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary">No timeline events available</p>
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] glass-card border border-white/20 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h1 className="text-2xl font-bold text-text-primary">Candidate Details</h1>
              <Button
                variant="ghost"
                iconName="X"
                onClick={onClose}
                className="h-10 w-10 p-0"
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'experience' && renderExperienceTab()}
              {activeTab === 'skills' && renderSkillsTab()}
              {activeTab === 'notes' && renderNotesTab()}
              {activeTab === 'timeline' && renderTimelineTab()}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <Button
                  variant="success"
                  iconName="ArrowRight"
                  onClick={() => onMove(candidate.id, 'current', 'next')}
                >
                  Move to Next Stage
                </Button>
                <Button
                  variant="outline"
                  iconName="Calendar"
                  onClick={() => console.log('Schedule interview')}
                >
                  Schedule Interview
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="danger"
                  iconName="X"
                  onClick={() => onReject(candidate.id)}
                >
                  Reject
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CandidateDetailModal;