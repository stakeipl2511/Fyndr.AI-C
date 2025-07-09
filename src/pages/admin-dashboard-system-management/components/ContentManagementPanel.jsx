import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContentManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      students: 1247,
      status: "published",
      lastUpdated: "2024-01-10",
      rating: 4.8,
      duration: "12 hours"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chen",
      students: 892,
      status: "draft",
      lastUpdated: "2024-01-12",
      rating: 4.6,
      duration: "16 hours"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emily Rodriguez",
      students: 2156,
      status: "published",
      lastUpdated: "2024-01-08",
      rating: 4.9,
      duration: "8 hours"
    }
  ];

  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "active",
      applications: 45,
      posted: "2024-01-12"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      status: "pending",
      applications: 23,
      posted: "2024-01-14"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataFlow Solutions",
      location: "New York, NY",
      type: "Contract",
      status: "active",
      applications: 67,
      posted: "2024-01-11"
    }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Best practices for React performance optimization",
      author: "john_dev",
      category: "Development",
      replies: 23,
      status: "approved",
      flagged: false,
      posted: "2024-01-14"
    },
    {
      id: 2,
      title: "Career transition from marketing to tech",
      author: "career_changer",
      category: "Career Advice",
      replies: 15,
      status: "flagged",
      flagged: true,
      posted: "2024-01-13"
    },
    {
      id: 3,
      title: "Salary negotiation tips for developers",
      author: "tech_recruiter",
      category: "Career Advice",
      replies: 31,
      status: "approved",
      flagged: false,
      posted: "2024-01-12"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': case'active': case'approved':
        return 'text-success bg-success/10';
      case 'draft': case'pending':
        return 'text-warning bg-warning/10';
      case 'flagged':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-white/10';
    }
  };

  const handleContentAction = (id, action, type) => {
    console.log(`${action} ${type} with id:`, id);
  };

  const renderCourses = () => (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="glass-surface p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-1">{course.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>By {course.instructor}</span>
                <span>{course.students} students</span>
                <span>{course.duration}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                {course.status}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(course.id, 'edit', 'course')}
                  iconName="Edit"
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(course.id, 'view', 'course')}
                  iconName="Eye"
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(course.id, 'delete', 'course')}
                  iconName="Trash2"
                  className="h-8 w-8 p-0 text-error"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );

  const renderJobListings = () => (
    <div className="space-y-4">
      {jobListings.map((job) => (
        <div key={job.id} className="glass-surface p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-1">{job.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>{job.company}</span>
                <span>{job.location}</span>
                <span>{job.type}</span>
                <span>{job.applications} applications</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(job.id, 'edit', 'job')}
                  iconName="Edit"
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(job.id, 'view', 'job')}
                  iconName="Eye"
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(job.id, 'approve', 'job')}
                  iconName="Check"
                  className="h-8 w-8 p-0 text-success"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            Posted: {new Date(job.posted).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );

  const renderForumPosts = () => (
    <div className="space-y-4">
      {forumPosts.map((post) => (
        <div key={post.id} className={`glass-surface p-4 rounded-xl ${post.flagged ? 'border border-error/30' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-text-primary">{post.title}</h4>
                {post.flagged && (
                  <Icon name="Flag" size={16} className="text-error" />
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>By {post.author}</span>
                <span>{post.category}</span>
                <span>{post.replies} replies</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {post.status}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(post.id, 'view', 'post')}
                  iconName="Eye"
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(post.id, 'approve', 'post')}
                  iconName="Check"
                  className="h-8 w-8 p-0 text-success"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContentAction(post.id, 'flag', 'post')}
                  iconName="Flag"
                  className="h-8 w-8 p-0 text-warning"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            Posted: {new Date(post.posted).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'courses', label: 'Courses', icon: 'BookOpen', count: courses.length },
    { id: 'jobs', label: 'Job Listings', icon: 'Briefcase', count: jobListings.length },
    { id: 'forum', label: 'Forum Posts', icon: 'MessageSquare', count: forumPosts.length }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Content Management</h3>
        <Button variant="primary" iconName="Plus">
          Create New
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Content */}
      <div>
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'jobs' && renderJobListings()}
        {activeTab === 'forum' && renderForumPosts()}
      </div>
    </div>
  );
};

export default ContentManagementPanel;