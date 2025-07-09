import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('job-seeker'); // job-seeker, recruiter, admin
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  
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

  const getNavigationItems = () => {
    switch (userRole) {
      case 'recruiter':
        return [
          {
            label: 'Dashboard',
            icon: 'BarChart3',
            path: '/recruiter-dashboard',
            description: 'Overview & Analytics'
          },
          {
            label: 'Candidates',
            icon: 'Users',
            path: '/candidate-discovery-sourcing',
            description: 'Discovery & Sourcing'
          },
          {
            label: 'Pipeline',
            icon: 'GitBranch',
            path: '/application-tracking-pipeline',
            description: 'Application Tracking'
          },
          {
            label: 'Jobs',
            icon: 'Briefcase',
            path: '/jobs',
            description: 'Job Management',
            submenu: [
              { label: 'Active Jobs', path: '/jobs/active' },
              { label: 'Draft Jobs', path: '/jobs/drafts' },
              { label: 'Archived Jobs', path: '/jobs/archived' }
            ]
          },
          {
            label: 'Reports',
            icon: 'FileText',
            path: '/reports',
            description: 'Analytics & Insights'
          }
        ];
      
      case 'admin':
        return [
          {
            label: 'System Management',
            icon: 'Settings',
            path: '/admin-dashboard-system-management',
            description: 'Platform Overview'
          },
          {
            label: 'User Management',
            icon: 'Users',
            path: '/users',
            description: 'Manage Users',
            submenu: [
              { label: 'All Users', path: '/users/all' },
              { label: 'Job Seekers', path: '/users/job-seekers' },
              { label: 'Recruiters', path: '/users/recruiters' },
              { label: 'Administrators', path: '/users/admins' }
            ]
          },
          {
            label: 'Content Management',
            icon: 'BookOpen',
            path: '/content',
            description: 'Courses & Resources'
          },
          {
            label: 'System Health',
            icon: 'Activity',
            path: '/system-health',
            description: 'Monitoring & Logs'
          },
          {
            label: 'Analytics',
            icon: 'TrendingUp',
            path: '/analytics',
            description: 'Platform Analytics'
          }
        ];
      
      default: // job-seeker
        return [
          {
            label: 'Dashboard',
            icon: 'Home',
            path: '/dashboard',
            description: 'Your Progress'
          },
          {
            label: 'Learning',
            icon: 'BookOpen',
            path: '/course-detail-learning',
            description: 'Courses & Skills'
          },
          {
            label: 'AI Career Coach',
            icon: 'MessageCircle',
            path: '/ai-career-coach-chat',
            description: 'Personalized Guidance'
          },
          {
            label: 'Job Search',
            icon: 'Search',
            path: '/job-search',
            description: 'Find Opportunities',
            submenu: [
              { label: 'Browse Jobs', path: '/job-search/browse' },
              { label: 'Saved Jobs', path: '/job-search/saved' },
              { label: 'Applications', path: '/job-search/applications' }
            ]
          },
          {
            label: 'Profile',
            icon: 'User',
            path: '/profile',
            description: 'Manage Profile'
          }
        ];
    }
  };

  const handleNavigation = (item) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
    } else {
      navigate(item.path);
      setActiveSubmenu(null);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.submenu) {
      return item.submenu.some(subItem => location.pathname === subItem.path);
    }
    return isActive(item.path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-1000 glass-card border-r border-white/20 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden lg:block`}>
        
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-4 border-b border-white/10">
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            className="h-8 w-8 p-0"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {getNavigationItems().map((item, index) => (
            <div key={index}>
              <button
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                  isParentActive(item)
                    ? 'bg-primary/20 text-primary neon-glow-purple' :'hover:bg-white/10 text-text-primary hover:text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${isParentActive(item) ? 'text-primary' : 'group-hover:text-primary'}`}
                />
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-text-secondary mt-0.5">{item.description}</div>
                    </div>
                    
                    {item.submenu && (
                      <Icon 
                        name={activeSubmenu === item.label ? 'ChevronDown' : 'ChevronRight'} 
                        size={16}
                        className="flex-shrink-0 transition-transform duration-200"
                      />
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {!isCollapsed && item.submenu && activeSubmenu === item.label && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => navigate(subItem.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(subItem.path)
                          ? 'bg-primary/10 text-primary' :'hover:bg-white/5 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="glass-surface p-3 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {userRole === 'recruiter' ? 'Sarah Johnson' : 
                     userRole === 'admin' ? 'Admin User' : 'John Doe'}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {userRole === 'recruiter' ? 'Senior Recruiter' : 
                     userRole === 'admin' ? 'System Administrator' : 'Software Developer'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Spacer - Hidden on desktop */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;