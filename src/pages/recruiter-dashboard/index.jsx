import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionCard from './components/QuickActionCard';
import JobPostingTable from './components/JobPostingTable';
import SummaryCard from './components/SummaryCard';
import PipelineVisualization from './components/PipelineVisualization';
import TeamActivityFeed from './components/TeamActivityFeed';
import DEIMetricsPanel from './components/DEIMetricsPanel';
import HiringVelocityChart from './components/HiringVelocityChart';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [notifications, setNotifications] = useState([]);

  // Mock data for job postings
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      applications: 47,
      qualityScore: 85,
      timeToFill: 18,
      status: "active",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      applications: 32,
      qualityScore: 92,
      timeToFill: 22,
      status: "active",
      postedDate: "2024-01-12"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      applications: 28,
      qualityScore: 78,
      timeToFill: 15,
      status: "paused",
      postedDate: "2024-01-10"
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Analytics",
      location: "Austin, TX",
      applications: 19,
      qualityScore: 88,
      timeToFill: 25,
      status: "active",
      postedDate: "2024-01-08"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      applications: 15,
      qualityScore: 72,
      timeToFill: 30,
      status: "closed",
      postedDate: "2024-01-05"
    }
  ];

  // Mock pipeline data
  const pipelineData = {
    sourced: 450,
    applied: 280,
    screening: 120,
    interview: 65,
    offer: 28,
    hired: 22
  };

  // Mock team activity data
  const teamActivities = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "scheduled interview with",
      target: "Alex Chen",
      type: "interview",
      timestamp: new Date(Date.now() - 300000),
      description: "Technical interview for Senior Frontend Developer position",
      details: "45-minute technical interview covering React, TypeScript, and system design. Scheduled for tomorrow at 2:00 PM PST."
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      action: "posted new job",
      target: "Marketing Manager",
      type: "job_posted",
      timestamp: new Date(Date.now() - 1800000),
      description: "Full-time position in Marketing department"
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "hired",
      target: "Jennifer Liu",
      type: "hire",
      timestamp: new Date(Date.now() - 3600000),
      description: "Successfully hired for Product Designer role",
      details: "Jennifer brings 5 years of experience in product design and will be joining the design team next Monday."
    },
    {
      id: 4,
      user: "David Kim",
      action: "added note for",
      target: "Robert Smith",
      type: "note",
      timestamp: new Date(Date.now() - 7200000),
      description: "Strong technical skills, good culture fit"
    },
    {
      id: 5,
      user: "Lisa Wang",
      action: "rejected application from",
      target: "John Doe",
      type: "reject",
      timestamp: new Date(Date.now() - 10800000),
      description: "Skills didn\'t match requirements for Senior Backend role"
    }
  ];

  // Mock diversity data
  const diversityData = [
    { name: 'Women', value: 42 },
    { name: 'Underrepresented Minorities', value: 28 },
    { name: 'Veterans', value: 8 },
    { name: 'LGBTQ+', value: 12 },
    { name: 'Other', value: 10 }
  ];

  // Mock inclusion metrics
  const inclusionMetrics = [
    { category: 'Leadership', score: 78 },
    { category: 'Engineering', score: 85 },
    { category: 'Product', score: 92 },
    { category: 'Design', score: 88 },
    { category: 'Sales', score: 75 }
  ];

  // Mock hiring velocity data
  const velocityData = [
    { period: 'Week 1', hires: 8, timeToFill: 22 },
    { period: 'Week 2', hires: 12, timeToFill: 19 },
    { period: 'Week 3', hires: 15, timeToFill: 16 },
    { period: 'Week 4', hires: 18, timeToFill: 14 },
    { period: 'Week 5', hires: 22, timeToFill: 18 },
    { period: 'Week 6', hires: 19, timeToFill: 15 }
  ];

  useEffect(() => {
    // Mock real-time notifications
    const mockNotifications = [
      { id: 1, message: "New application for Senior Frontend Developer", type: "application" },
      { id: 2, message: "Interview scheduled with Alex Chen", type: "interview" },
      { id: 3, message: "Job posting approved: Marketing Manager", type: "approval" }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'post-job': console.log('Opening job posting form...');
        break;
      case 'screen-candidate': navigate('/candidate-discovery-sourcing');
        break;
      case 'invite-team': console.log('Opening team invitation modal...');
        break;
      case 'view-pipeline': navigate('/application-tracking-pipeline');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleJobAction = (action, jobId) => {
    console.log(`${action} job ${jobId}`);
    // Implement job actions
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Recruiter Dashboard</h1>
                <p className="text-text-secondary">
                  Welcome back, Sarah! Here's your recruitment overview for today.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={() => console.log('Exporting report...')}
                >
                  Export Report
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => handleQuickAction('post-job')}
                >
                  Post New Job
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickActionCard
              title="Post New Job"
              description="Create and publish job openings"
              icon="Plus"
              color="from-primary to-primary-600"
              onClick={() => handleQuickAction('post-job')}
              count="12 Active"
              trend={{ type: 'up', value: '+3' }}
            />
            <QuickActionCard
              title="Screen Candidates"
              description="Review and evaluate applications"
              icon="Search"
              color="from-secondary to-secondary-600"
              onClick={() => handleQuickAction('screen-candidate')}
              count="47 Pending"
              trend={{ type: 'up', value: '+8' }}
            />
            <QuickActionCard
              title="Schedule Interviews"
              description="Coordinate interview sessions"
              icon="Calendar"
              color="from-accent-400 to-accent-600"
              onClick={() => handleQuickAction('schedule-interview')}
              count="15 Today"
            />
            <QuickActionCard
              title="View Pipeline"
              description="Track application progress"
              icon="GitBranch"
              color="from-success to-success-600"
              onClick={() => handleQuickAction('view-pipeline')}
              count="89% Health"
              trend={{ type: 'up', value: '+5%' }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Job Postings Table */}
            <div className="lg:col-span-8">
              <JobPostingTable
                jobs={mockJobs}
                onEdit={(id) => handleJobAction('edit', id)}
                onPause={(id) => handleJobAction('pause', id)}
                onClose={(id) => handleJobAction('close', id)}
                onViewApplications={(id) => handleJobAction('view-applications', id)}
              />
            </div>

            {/* Right Column - Summary Cards and Metrics */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-4">
                <SummaryCard
                  title="Total Applications"
                  value="1,247"
                  change="+18%"
                  icon="Users"
                  color="from-primary to-primary-600"
                />
                <SummaryCard
                  title="Interviews Scheduled"
                  value="89"
                  change="+12%"
                  icon="Calendar"
                  color="from-secondary to-secondary-600"
                />
                <SummaryCard
                  title="Offers Extended"
                  value="23"
                  change="+8%"
                  icon="Gift"
                  color="from-success to-success-600"
                />
              </div>

              {/* Pipeline Visualization */}
              <PipelineVisualization pipelineData={pipelineData} />
            </div>
          </div>

          {/* Bottom Section - Analytics and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Hiring Velocity Chart */}
            <div className="lg:col-span-2">
              <HiringVelocityChart
                velocityData={velocityData}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            </div>

            {/* Team Activity Feed */}
            <div>
              <TeamActivityFeed activities={teamActivities} />
            </div>
          </div>

          {/* DEI Metrics Panel */}
          <div className="mt-8">
            <DEIMetricsPanel
              diversityData={diversityData}
              inclusionMetrics={inclusionMetrics}
            />
          </div>

          {/* Real-time Notifications */}
          {notifications.length > 0 && (
            <div className="fixed bottom-6 right-6 z-1000 space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="glass-card p-4 max-w-sm border border-white/20 animate-slide-in-right"
                >
                  <div className="flex items-start space-x-3">
                    <Icon name="Bell" size={16} className="text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{notification.message}</p>
                      <p className="text-xs text-text-secondary mt-1">Just now</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                      iconName="X"
                      className="h-6 w-6 p-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;