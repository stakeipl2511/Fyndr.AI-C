import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showBadges, setShowBadges] = useState(false);

  const skillsData = [
    {
      id: 1,
      name: "React Fundamentals",
      progress: 85,
      level: "Advanced",
      color: "#a78bfa",
      description: "Core React concepts and patterns",
      milestones: [
        { name: "Components & Props", completed: true },
        { name: "State Management", completed: true },
        { name: "Event Handling", completed: true },
        { name: "Lifecycle Methods", completed: false }
      ]
    },
    {
      id: 2,
      name: "Hooks Mastery",
      progress: 65,
      level: "Intermediate",
      color: "#5eead4",
      description: "Advanced hooks and custom implementations",
      milestones: [
        { name: "useState & useEffect", completed: true },
        { name: "useContext & useReducer", completed: true },
        { name: "Custom Hooks", completed: false },
        { name: "Performance Hooks", completed: false }
      ]
    },
    {
      id: 3,
      name: "Performance Optimization",
      progress: 40,
      level: "Beginner",
      color: "#fbcfe8",
      description: "React performance best practices",
      milestones: [
        { name: "React.memo", completed: true },
        { name: "useMemo & useCallback", completed: false },
        { name: "Code Splitting", completed: false },
        { name: "Bundle Analysis", completed: false }
      ]
    },
    {
      id: 4,
      name: "Testing",
      progress: 20,
      level: "Beginner",
      color: "#fbbf24",
      description: "Unit and integration testing",
      milestones: [
        { name: "Jest Basics", completed: true },
        { name: "React Testing Library", completed: false },
        { name: "Component Testing", completed: false },
        { name: "E2E Testing", completed: false }
      ]
    }
  ];

  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first lesson",
      icon: "Award",
      earned: true,
      earnedDate: "2024-11-15"
    },
    {
      id: 2,
      name: "Quick Learner",
      description: "Completed 5 lessons in one day",
      icon: "Zap",
      earned: true,
      earnedDate: "2024-11-18"
    },
    {
      id: 3,
      name: "Code Master",
      description: "Completed all coding exercises",
      icon: "Code",
      earned: false,
      earnedDate: null
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Scored 100% on a quiz",
      icon: "Target",
      earned: true,
      earnedDate: "2024-11-20"
    },
    {
      id: 5,
      name: "Consistent Learner",
      description: "7-day learning streak",
      icon: "Calendar",
      earned: false,
      earnedDate: null
    },
    {
      id: 6,
      name: "Course Completion",
      description: "Completed the entire course",
      icon: "Trophy",
      earned: false,
      earnedDate: null
    }
  ];

  const overallProgress = {
    completed: 23,
    total: 31,
    percentage: Math.round((23 / 31) * 100),
    timeSpent: "18h 45m",
    streak: 5,
    nextMilestone: "Complete React Hooks module"
  };

  const createCircularProgress = (progress, size = 120, strokeWidth = 8) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return {
      size,
      strokeWidth,
      radius,
      circumference,
      strokeDasharray,
      strokeDashoffset
    };
  };

  const renderSkillRing = (skill, index) => {
    const { size, strokeWidth, radius, strokeDasharray, strokeDashoffset } = createCircularProgress(skill.progress, 100, 6);
    const isSelected = selectedSkill?.id === skill.id;

    return (
      <div
        key={skill.id}
        className={`relative cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-110' : 'hover:scale-105'
        }`}
        onClick={() => setSelectedSkill(isSelected ? null : skill)}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={skill.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: isSelected ? `drop-shadow(0 0 10px ${skill.color})` : 'none'
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-text-primary">{skill.progress}%</span>
          <span className="text-xs text-text-secondary text-center px-2">{skill.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="glass-card border border-white/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Learning Progress</h2>
          <Button
            variant="outline"
            iconName="BarChart3"
            onClick={() => console.log('View detailed analytics')}
          >
            Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Main Progress Circle */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex justify-center">
            <div className="relative">
              {(() => {
                const { size, strokeWidth, radius, strokeDasharray, strokeDashoffset } = createCircularProgress(overallProgress.percentage, 140, 10);
                return (
                  <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="url(#gradient)"
                      strokeWidth={strokeWidth}
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#5eead4" />
                      </linearGradient>
                    </defs>
                  </svg>
                );
              })()}
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold gradient-text">{overallProgress.percentage}%</span>
                <span className="text-sm text-text-secondary">Complete</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-surface p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="BookOpen" size={24} className="text-primary" />
              </div>
              <div className="text-lg font-semibold text-text-primary">
                {overallProgress.completed}/{overallProgress.total}
              </div>
              <div className="text-sm text-text-secondary">Lessons Completed</div>
            </div>

            <div className="glass-surface p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Clock" size={24} className="text-secondary" />
              </div>
              <div className="text-lg font-semibold text-text-primary">{overallProgress.timeSpent}</div>
              <div className="text-sm text-text-secondary">Time Spent</div>
            </div>

            <div className="glass-surface p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Flame" size={24} className="text-orange-500" />
              </div>
              <div className="text-lg font-semibold text-text-primary">{overallProgress.streak}</div>
              <div className="text-sm text-text-secondary">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="mt-6 p-4 glass-surface rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={20} className="text-primary" />
            <div>
              <span className="text-sm font-medium text-text-primary">Next Milestone:</span>
              <span className="text-sm text-text-secondary ml-2">{overallProgress.nextMilestone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="glass-card border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Skill Development</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {skillsData.map((skill, index) => renderSkillRing(skill, index))}
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <div className="glass-surface p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-text-primary">{selectedSkill.name}</h4>
                <p className="text-sm text-text-secondary">{selectedSkill.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedSkill.level === 'Advanced' ? 'bg-success/20 text-success' :
                selectedSkill.level === 'Intermediate'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
              }`}>
                {selectedSkill.level}
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-text-primary mb-3">Milestones</h5>
              {selectedSkill.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon 
                    name={milestone.completed ? 'CheckCircle' : 'Circle'} 
                    size={16} 
                    className={milestone.completed ? 'text-success' : 'text-text-tertiary'}
                  />
                  <span className={`text-sm ${
                    milestone.completed ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {milestone.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Badges & Achievements */}
      <div className="glass-card border border-white/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Achievements</h3>
          <Button
            variant="text"
            onClick={() => setShowBadges(!showBadges)}
            iconName={showBadges ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showBadges ? 'Hide' : 'Show All'}
          </Button>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${
          showBadges ? '' : 'max-h-32 overflow-hidden'
        }`}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                badge.earned 
                  ? 'glass-surface hover:scale-105 cursor-pointer' :'bg-white/5 opacity-60'
              }`}
              title={badge.description}
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                badge.earned ? 'bg-primary/20' : 'bg-white/10'
              }`}>
                <Icon 
                  name={badge.icon} 
                  size={20} 
                  className={badge.earned ? 'text-primary' : 'text-text-tertiary'}
                />
              </div>
              <h4 className={`text-sm font-medium mb-1 ${
                badge.earned ? 'text-text-primary' : 'text-text-tertiary'
              }`}>
                {badge.name}
              </h4>
              {badge.earned && badge.earnedDate && (
                <p className="text-xs text-text-secondary">
                  {new Date(badge.earnedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;