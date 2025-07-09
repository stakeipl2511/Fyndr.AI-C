import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CourseInfo = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [showAllObjectives, setShowAllObjectives] = useState(false);

  const courseData = {
    title: "Advanced React Development",
    instructor: {
      name: "Sarah Chen",
      title: "Senior Frontend Engineer at Meta",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8b1?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      students: 12847,
      courses: 8
    },
    rating: 4.8,
    totalRatings: 2341,
    students: 15420,
    duration: "12 hours",
    level: "Advanced",
    language: "English",
    lastUpdated: "November 2024",
    description: `Master the latest React 18 features and advanced patterns to build production-ready applications. This comprehensive course covers concurrent features, performance optimization, and modern development practices.

You'll learn through hands-on projects and real-world examples, gaining practical experience with Suspense, automatic batching, server components, and advanced state management patterns.

Perfect for developers who want to take their React skills to the next level and build scalable, performant applications that meet industry standards.`,
    
    objectives: [
      "Master React 18\'s concurrent features and automatic batching",
      "Implement Suspense for data fetching and code splitting",
      "Build custom hooks for complex state management",
      "Optimize performance with React.memo and useMemo",
      "Create reusable component libraries with TypeScript",
      "Implement advanced patterns like render props and compound components",
      "Handle error boundaries and loading states effectively",
      "Deploy React applications with modern CI/CD practices"
    ],

    requirements: [
      "Solid understanding of JavaScript ES6+ features",
      "Basic React knowledge (components, props, state)",
      "Familiarity with modern development tools",
      "Node.js and npm installed on your machine"
    ],

    reviews: [
      {
        id: 1,
        user: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent course! Sarah explains complex concepts clearly and the hands-on projects really help solidify the learning. The section on Suspense was particularly valuable."
      },
      {
        id: 2,
        user: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        rating: 5,
        date: "1 week ago",
        comment: "This course took my React skills to the next level. The performance optimization techniques alone were worth the investment. Highly recommended!"
      },
      {
        id: 3,
        user: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        rating: 4,
        date: "2 weeks ago",
        comment: "Great content and well-structured lessons. Would love to see more examples with TypeScript integration throughout the course."
      }
    ]
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'objectives', label: 'Learning Objectives', icon: 'Target' },
    { id: 'instructor', label: 'Instructor', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">About This Course</h3>
              <div className="prose prose-sm max-w-none text-text-secondary">
                {courseData.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-3">Requirements</h4>
              <ul className="space-y-2">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'objectives':
        const displayedObjectives = showAllObjectives 
          ? courseData.objectives 
          : courseData.objectives.slice(0, 4);

        return (
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">What You'll Learn</h3>
            <div className="grid gap-3">
              {displayedObjectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 glass-surface rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm text-text-secondary leading-relaxed">{objective}</span>
                </div>
              ))}
            </div>
            
            {courseData.objectives.length > 4 && (
              <Button
                variant="text"
                onClick={() => setShowAllObjectives(!showAllObjectives)}
                className="mt-4 text-primary"
                iconName={showAllObjectives ? 'ChevronUp' : 'ChevronDown'}
                iconPosition="right"
              >
                {showAllObjectives ? 'Show Less' : `Show ${courseData.objectives.length - 4} More`}
              </Button>
            )}
          </div>
        );

      case 'instructor':
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Image
                src={courseData.instructor.avatar}
                alt={courseData.instructor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary">{courseData.instructor.name}</h3>
                <p className="text-text-secondary mb-2">{courseData.instructor.title}</p>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                    <span>{courseData.instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{courseData.instructor.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={14} />
                    <span>{courseData.instructor.courses} courses</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-surface p-4 rounded-lg">
              <p className="text-sm text-text-secondary leading-relaxed">
                Sarah is a Senior Frontend Engineer at Meta with over 8 years of experience building 
                large-scale React applications. She's passionate about teaching and has helped thousands 
                of developers advance their careers through her comprehensive courses and mentorship programs.
              </p>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-text-primary">{courseData.rating}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(courseData.rating)}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  {courseData.totalRatings.toLocaleString()} ratings
                </p>
              </div>
              
              <Button variant="outline" iconName="MessageSquare">
                Write Review
              </Button>
            </div>

            <div className="space-y-4">
              {courseData.reviews.map((review) => (
                <div key={review.id} className="glass-surface p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={review.avatar}
                      alt={review.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-text-primary">{review.user}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-text-secondary">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      {/* Course Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-3">{courseData.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium">{courseData.rating}</span>
            <span>({courseData.totalRatings.toLocaleString()} ratings)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{courseData.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{courseData.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BarChart" size={16} />
            <span>{courseData.level}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
            {courseData.language}
          </span>
          <span className="px-3 py-1 bg-success/20 text-success text-xs rounded-full">
            Updated {courseData.lastUpdated}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/20 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CourseInfo;