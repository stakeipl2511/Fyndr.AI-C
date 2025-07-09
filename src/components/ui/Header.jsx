import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('job-seeker'); // job-seeker, recruiter, admin
  
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user role detection - in real app, this would come from auth context
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('recruiter') || path.includes('candidate-discovery') || path.includes('application-tracking')) {
      setUserRole('recruiter');
    } else if (path.includes('admin')) {
      setUserRole('admin');
    } else {
      setUserRole('job-seeker');
    }
  }, [location.pathname]);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'New course available', message: 'Advanced React Development is now live', type: 'info', time: '2 min ago' },
      { id: 2, title: 'Application update', message: 'Your application status has changed', type: 'success', time: '1 hour ago' },
      { id: 3, title: 'System maintenance', message: 'Scheduled maintenance tonight', type: 'warning', time: '3 hours ago' }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    setIsNotificationOpen(false);
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'recruiter':
        return [
          { label: 'Post New Job', icon: 'Plus', action: () => console.log('Post job') },
          { label: 'Add Candidate', icon: 'UserPlus', action: () => console.log('Add candidate') },
          { label: 'Schedule Interview', icon: 'Calendar', action: () => console.log('Schedule interview') }
        ];
      case 'admin':
        return [
          { label: 'Add User', icon: 'UserPlus', action: () => console.log('Add user') },
          { label: 'System Settings', icon: 'Settings', action: () => console.log('System settings') },
          { label: 'Generate Report', icon: 'FileText', action: () => console.log('Generate report') }
        ];
      default:
        return [
          { label: 'Enroll in Course', icon: 'BookOpen', action: () => console.log('Enroll course') },
          { label: 'Update Profile', icon: 'User', action: () => console.log('Update profile') },
          { label: 'Schedule Coaching', icon: 'MessageCircle', action: () => console.log('Schedule coaching') }
        ];
    }
  };

  const getRoleDisplayName = () => {
    switch (userRole) {
      case 'recruiter': return 'Recruiter';
      case 'admin': return 'Administrator';
      default: return 'Job Seeker';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'recruiter': return 'Briefcase';
      case 'admin': return 'Shield';
      default: return 'User';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 h-16 glass-card border-b border-white/20">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover-lift"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold gradient-text">HireHub AI</h1>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-1">
          {userRole === 'job-seeker' && (
            <>
              <Button
                variant={location.pathname === '/course-detail-learning' ? 'primary' : 'ghost'}
                onClick={() => navigate('/course-detail-learning')}
                iconName="BookOpen"
                className="text-sm"
              >
                Learning
              </Button>
              <Button
                variant={location.pathname === '/ai-career-coach-chat' ? 'primary' : 'ghost'}
                onClick={() => navigate('/ai-career-coach-chat')}
                iconName="MessageCircle"
                className="text-sm"
              >
                AI Coach
              </Button>
            </>
          )}
          
          {userRole === 'recruiter' && (
            <>
              <Button
                variant={location.pathname === '/recruiter-dashboard' ? 'primary' : 'ghost'}
                onClick={() => navigate('/recruiter-dashboard')}
                iconName="BarChart3"
                className="text-sm"
              >
                Dashboard
              </Button>
              <Button
                variant={location.pathname === '/candidate-discovery-sourcing' ? 'primary' : 'ghost'}
                onClick={() => navigate('/candidate-discovery-sourcing')}
                iconName="Search"
                className="text-sm"
              >
                Candidates
              </Button>
              <Button
                variant={location.pathname === '/application-tracking-pipeline' ? 'primary' : 'ghost'}
                onClick={() => navigate('/application-tracking-pipeline')}
                iconName="GitBranch"
                className="text-sm"
              >
                Pipeline
              </Button>
            </>
          )}
          
          {userRole === 'admin' && (
            <Button
              variant={location.pathname === '/admin-dashboard-system-management' ? 'primary' : 'ghost'}
              onClick={() => navigate('/admin-dashboard-system-management')}
              iconName="Settings"
              className="text-sm"
            >
              System Management
            </Button>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Role Context Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
            <Icon name={getRoleIcon()} size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">{getRoleDisplayName()}</span>
          </div>

          {/* Search */}
          <div className="relative">
            {isSearchExpanded ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9 text-sm"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery('');
                  }}
                  iconName="X"
                  className="ml-2 h-9 w-9 p-0"
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsSearchExpanded(true)}
                iconName="Search"
                className="h-9 w-9 p-0"
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              iconName="Plus"
              className="h-9 w-9 p-0"
            />
            
            {isQuickActionsOpen && (
              <div className="absolute right-0 top-12 w-56 glass-card border border-white/20 rounded-xl shadow-lg z-1010">
                <div className="p-2">
                  <div className="text-xs font-medium text-text-secondary px-3 py-2 border-b border-white/10">
                    Quick Actions
                  </div>
                  {getQuickActions().map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Icon name={action.icon} size={16} />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              iconName="Bell"
              className="h-9 w-9 p-0 relative"
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 glass-card border border-white/20 rounded-xl shadow-lg z-1010">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-text-primary">Notifications</h3>
                    <Button
                      variant="text"
                      onClick={() => setUnreadCount(0)}
                      className="text-xs text-primary"
                    >
                      Mark all read
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-success' :
                            notification.type === 'warning'? 'bg-warning' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-text-tertiary mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
            iconName="User"
            className="h-9 w-9 p-0"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 glass-card border-t border-white/20 z-1010">
          <nav className="p-4 space-y-2">
            {userRole === 'job-seeker' && (
              <>
                <Button
                  variant={location.pathname === '/course-detail-learning' ? 'primary' : 'ghost'}
                  onClick={() => {
                    navigate('/course-detail-learning');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="BookOpen"
                  className="w-full justify-start"
                >
                  Learning
                </Button>
                <Button
                  variant={location.pathname === '/ai-career-coach-chat' ? 'primary' : 'ghost'}
                  onClick={() => {
                    navigate('/ai-career-coach-chat');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="MessageCircle"
                  className="w-full justify-start"
                >
                  AI Coach
                </Button>
              </>
            )}
            
            {userRole === 'recruiter' && (
              <>
                <Button
                  variant={location.pathname === '/recruiter-dashboard' ? 'primary' : 'ghost'}
                  onClick={() => {
                    navigate('/recruiter-dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="BarChart3"
                  className="w-full justify-start"
                >
                  Dashboard
                </Button>
                <Button
                  variant={location.pathname === '/candidate-discovery-sourcing' ? 'primary' : 'ghost'}
                  onClick={() => {
                    navigate('/candidate-discovery-sourcing');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="Search"
                  className="w-full justify-start"
                >
                  Candidates
                </Button>
                <Button
                  variant={location.pathname === '/application-tracking-pipeline' ? 'primary' : 'ghost'}
                  onClick={() => {
                    navigate('/application-tracking-pipeline');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="GitBranch"
                  className="w-full justify-start"
                >
                  Pipeline
                </Button>
              </>
            )}
            
            {userRole === 'admin' && (
              <Button
                variant={location.pathname === '/admin-dashboard-system-management' ? 'primary' : 'ghost'}
                onClick={() => {
                  navigate('/admin-dashboard-system-management');
                  setIsMobileMenuOpen(false);
                }}
                iconName="Settings"
                className="w-full justify-start"
              >
                System Management
              </Button>
            )}

            <div className="border-t border-white/20 pt-2 mt-4">
              <div className="flex items-center space-x-2 px-3 py-2">
                <Icon name={getRoleIcon()} size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">{getRoleDisplayName()}</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;