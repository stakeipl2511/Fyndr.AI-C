import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ModuleAccordion = ({ onLessonSelect, currentLesson }) => {
  const [expandedModules, setExpandedModules] = useState([1]);
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3]);

  const courseModules = [
    {
      id: 1,
      title: "Getting Started with React 18",
      duration: "2h 30m",
      lessons: 8,
      completed: 3,
      isLocked: false,
      lessons: [
        { id: 1, title: "Introduction to React 18", duration: "15:30", type: "video", isCompleted: true },
        { id: 2, title: "Setting up Development Environment", duration: "12:45", type: "video", isCompleted: true },
        { id: 3, title: "Understanding Concurrent Features", duration: "18:20", type: "video", isCompleted: true },
        { id: 4, title: "Automatic Batching Deep Dive", duration: "22:15", type: "video", isCompleted: false },
        { id: 5, title: "Quiz: React 18 Basics", duration: "10:00", type: "quiz", isCompleted: false },
        { id: 6, title: "Project Setup", duration: "16:40", type: "project", isCompleted: false },
        { id: 7, title: "Code Review and Best Practices", duration: "14:25", type: "video", isCompleted: false },
        { id: 8, title: "Module Assessment", duration: "15:00", type: "assessment", isCompleted: false }
      ]
    },
    {
      id: 2,
      title: "Suspense and Data Fetching",
      duration: "3h 15m",
      lessons: 10,
      completed: 0,
      isLocked: false,
      lessons: [
        { id: 9, title: "Introduction to Suspense", duration: "20:30", type: "video", isCompleted: false },
        { id: 10, title: "Suspense for Code Splitting", duration: "18:45", type: "video", isCompleted: false },
        { id: 11, title: "Data Fetching with Suspense", duration: "25:20", type: "video", isCompleted: false },
        { id: 12, title: "Error Boundaries", duration: "16:15", type: "video", isCompleted: false },
        { id: 13, title: "Loading States and UX", duration: "19:40", type: "video", isCompleted: false },
        { id: 14, title: "Hands-on: Building a Data Fetcher", duration: "35:25", type: "project", isCompleted: false },
        { id: 15, title: "Advanced Suspense Patterns", duration: "22:15", type: "video", isCompleted: false },
        { id: 16, title: "Quiz: Suspense Concepts", duration: "12:00", type: "quiz", isCompleted: false },
        { id: 17, title: "Performance Optimization", duration: "28:30", type: "video", isCompleted: false },
        { id: 18, title: "Module Project", duration: "45:00", type: "project", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "Advanced Hooks and Patterns",
      duration: "2h 45m",
      lessons: 7,
      completed: 0,
      isLocked: true,
      lessons: [
        { id: 19, title: "Custom Hooks Deep Dive", duration: "24:30", type: "video", isCompleted: false },
        { id: 20, title: "useCallback and useMemo", duration: "18:45", type: "video", isCompleted: false },
        { id: 21, title: "Context API Best Practices", duration: "22:20", type: "video", isCompleted: false },
        { id: 22, title: "Render Props Pattern", duration: "16:15", type: "video", isCompleted: false },
        { id: 23, title: "Compound Components", duration: "20:40", type: "video", isCompleted: false },
        { id: 24, title: "Advanced Project", duration: "38:25", type: "project", isCompleted: false },
        { id: 25, title: "Final Assessment", duration: "25:00", type: "assessment", isCompleted: false }
      ]
    },
    {
      id: 4,
      title: "Performance Optimization",
      duration: "2h 20m",
      lessons: 6,
      completed: 0,
      isLocked: true,
      lessons: [
        { id: 26, title: "React DevTools Profiler", duration: "18:30", type: "video", isCompleted: false },
        { id: 27, title: "Bundle Splitting Strategies", duration: "22:45", type: "video", isCompleted: false },
        { id: 28, title: "Memory Leak Prevention", duration: "16:20", type: "video", isCompleted: false },
        { id: 29, title: "Virtual Scrolling", duration: "25:15", type: "video", isCompleted: false },
        { id: 30, title: "Performance Monitoring", duration: "19:40", type: "video", isCompleted: false },
        { id: 31, title: "Optimization Project", duration: "42:25", type: "project", isCompleted: false }
      ]
    }
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleLessonClick = (lesson, module) => {
    if (module.isLocked) return;
    
    onLessonSelect({
      ...lesson,
      moduleTitle: module.title
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'quiz': return 'HelpCircle';
      case 'project': return 'Code';
      case 'assessment': return 'FileCheck';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-500';
      case 'quiz': return 'text-yellow-500';
      case 'project': return 'text-green-500';
      case 'assessment': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const calculateProgress = (module) => {
    return (module.completed / module.lessons.length) * 100;
  };

  return (
    <div className="space-y-4">
      {courseModules.map((module) => {
        const isExpanded = expandedModules.includes(module.id);
        const progress = calculateProgress(module);
        
        return (
          <div key={module.id} className="glass-card border border-white/20 rounded-xl overflow-hidden">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              disabled={module.isLocked}
              className={`w-full p-4 text-left transition-colors ${
                module.isLocked 
                  ? 'opacity-60 cursor-not-allowed' :'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    module.isLocked 
                      ? 'bg-gray-400/20' 
                      : progress === 100 
                      ? 'bg-success/20' :'bg-primary/20'
                  }`}>
                    <Icon 
                      name={module.isLocked ? 'Lock' : progress === 100 ? 'CheckCircle' : 'BookOpen'} 
                      size={16} 
                      className={
                        module.isLocked 
                          ? 'text-gray-400' 
                          : progress === 100 
                          ? 'text-success' :'text-primary'
                      }
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{module.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{module.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="FileText" size={14} />
                        <span>{module.lessons.length} lessons</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={14} />
                        <span>{module.completed}/{module.lessons.length} completed</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {!module.isLocked && (
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  
                  <Icon 
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                    size={20} 
                    className="text-text-secondary"
                  />
                </div>
              </div>
            </button>

            {/* Module Content */}
            {isExpanded && !module.isLocked && (
              <div className="border-t border-white/10">
                <div className="p-4 space-y-2">
                  {module.lessons.map((lesson) => {
                    const isActive = currentLesson?.id === lesson.id;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson, module)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary/20 border border-primary/30 neon-glow-purple' :'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.isCompleted 
                            ? 'bg-success/20' 
                            : isActive 
                            ? 'bg-primary/20' :'bg-white/10'
                        }`}>
                          <Icon 
                            name={lesson.isCompleted ? 'Check' : getTypeIcon(lesson.type)} 
                            size={12} 
                            className={
                              lesson.isCompleted 
                                ? 'text-success' 
                                : isActive 
                                ? 'text-primary' 
                                : getTypeColor(lesson.type)
                            }
                          />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              isActive ? 'text-primary' : 'text-text-primary'
                            }`}>
                              {lesson.title}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                        
                        {isActive && (
                          <Icon name="Play" size={16} className="text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Locked Module Message */}
            {isExpanded && module.isLocked && (
              <div className="border-t border-white/10 p-4">
                <div className="text-center py-8">
                  <Icon name="Lock" size={32} className="text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-text-primary mb-2">Module Locked</h4>
                  <p className="text-sm text-text-secondary">
                    Complete the previous module to unlock this content
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModuleAccordion;