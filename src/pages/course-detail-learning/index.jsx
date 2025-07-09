import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import VideoPlayer from './components/VideoPlayer';
import TranscriptPanel from './components/TranscriptPanel';
import CourseInfo from './components/CourseInfo';
import ModuleAccordion from './components/ModuleAccordion';
import ProgressTracker from './components/ProgressTracker';
import QuizAssessment from './components/QuizAssessment';
import DiscussionThread from './components/DiscussionThread';

const CourseDetailLearning = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('modules');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState('');
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);

  // Mock current lesson data
  useEffect(() => {
    setCurrentLesson({
      id: 1,
      title: "Introduction to React 18",
      moduleTitle: "Getting Started with React 18",
      duration: "15:30",
      type: "video",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      isCompleted: false
    });
  }, []);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentTime(0);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleTranscriptToggle = () => {
    setIsTranscriptOpen(!isTranscriptOpen);
  };

  const handleSeekTo = (time) => {
    setCurrentTime(time);
  };

  const handleAddBookmark = () => {
    const bookmark = {
      id: Date.now(),
      time: currentTime,
      title: currentLesson?.title || 'Unknown Lesson',
      note: `Bookmark at ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`
    };
    setBookmarks(prev => [...prev, bookmark]);
  };

  const handleSaveNotes = () => {
    console.log('Notes saved:', notes);
    // In a real app, this would save to backend
  };

  const tabs = [
    { id: 'modules', label: 'Course Content', icon: 'BookOpen' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'discussion', label: 'Discussion', icon: 'MessageSquare' },
    { id: 'info', label: 'Course Info', icon: 'Info' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'modules':
        return (
          <ModuleAccordion 
            onLessonSelect={handleLessonSelect}
            currentLesson={currentLesson}
          />
        );
      case 'progress':
        return <ProgressTracker />;
      case 'discussion':
        return <DiscussionThread lessonId={currentLesson?.id} />;
      case 'info':
        return <CourseInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hover:text-text-primary transition-colors"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <button 
              onClick={() => navigate('/courses')}
              className="hover:text-text-primary transition-colors"
            >
              Courses
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary">Advanced React Development</span>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-6">
              {/* Video Player Section */}
              <div className="glass-card border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-semibold text-text-primary">
                      {currentLesson?.title || 'Select a lesson to start learning'}
                    </h1>
                    {currentLesson && (
                      <p className="text-sm text-text-secondary mt-1">
                        {currentLesson.moduleTitle} • {currentLesson.duration}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={handleAddBookmark}
                      iconName="Bookmark"
                      className="h-9 w-9 p-0"
                      disabled={!currentLesson}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                      iconName="FileText"
                      className="h-9 w-9 p-0"
                    />
                    {currentLesson?.type === 'quiz' && (
                      <Button
                        variant="primary"
                        onClick={() => setIsQuizOpen(true)}
                        iconName="HelpCircle"
                      >
                        Start Quiz
                      </Button>
                    )}
                  </div>
                </div>

                {currentLesson ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className={`${isTranscriptOpen ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                      <VideoPlayer
                        videoUrl={currentLesson.videoUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onTranscriptToggle={handleTranscriptToggle}
                        isTranscriptOpen={isTranscriptOpen}
                      />
                    </div>
                    
                    {isTranscriptOpen && (
                      <div className="lg:col-span-1">
                        <TranscriptPanel
                          currentTime={currentTime}
                          onSeekTo={handleSeekTo}
                          isOpen={isTranscriptOpen}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Play" size={48} className="text-text-tertiary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">Ready to Learn?</h3>
                      <p className="text-text-secondary">Select a lesson from the course content to begin</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              {isNotesExpanded && (
                <div className="glass-card border border-white/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                      <Icon name="FileText" size={20} className="text-primary" />
                      <span>My Notes</span>
                    </h3>
                    <Button
                      variant="primary"
                      onClick={handleSaveNotes}
                      iconName="Save"
                      iconPosition="right"
                    >
                      Save Notes
                    </Button>
                  </div>
                  
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes while learning..."
                    className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-lg text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              )}

              {/* Bookmarks */}
              {bookmarks.length > 0 && (
                <div className="glass-card border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                    <Icon name="Bookmark" size={20} className="text-primary" />
                    <span>Bookmarks</span>
                  </h3>
                  
                  <div className="space-y-2">
                    {bookmarks.map((bookmark) => (
                      <button
                        key={bookmark.id}
                        onClick={() => handleSeekTo(bookmark.time)}
                        className="w-full flex items-center justify-between p-3 glass-surface rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="text-left">
                          <p className="text-sm font-medium text-text-primary">{bookmark.title}</p>
                          <p className="text-xs text-text-secondary">{bookmark.note}</p>
                        </div>
                        <Icon name="Play" size={16} className="text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1">
              <div className="glass-card border border-white/20 rounded-xl overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-white/20">
                  <nav className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'border-primary text-primary bg-primary/10' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quiz Modal */}
      <QuizAssessment
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lessonData={currentLesson}
      />
    </div>
  );
};

export default CourseDetailLearning;