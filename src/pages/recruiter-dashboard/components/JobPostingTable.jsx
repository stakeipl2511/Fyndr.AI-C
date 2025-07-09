import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const JobPostingTable = ({ jobs, onEdit, onPause, onClose, onViewApplications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('posted');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'applications':
        return b.applications - a.applications;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'posted':
      default:
        return new Date(b.postedDate) - new Date(a.postedDate);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'paused': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-surface';
    }
  };

  const getQualityScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="glass-card">
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-semibold text-text-primary">Active Job Postings</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg glass-surface border border-white/20 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg glass-surface border border-white/20 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="posted">Sort by Posted Date</option>
              <option value="applications">Sort by Applications</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Job Title</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Department</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Applications</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Quality Score</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Time to Fill</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job) => (
              <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div>
                    <h3 className="font-medium text-text-primary">{job.title}</h3>
                    <p className="text-sm text-text-secondary">{job.location}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-primary">{job.department}</span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onViewApplications(job.id)}
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                  >
                    <span className="text-lg font-semibold text-text-primary">{job.applications}</span>
                    <Icon name="Users" size={16} className="text-text-secondary" />
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getQualityScoreColor(job.qualityScore)}`}>
                      {job.qualityScore}%
                    </span>
                    <div className="w-16 h-2 bg-surface rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          job.qualityScore >= 80 ? 'bg-success' :
                          job.qualityScore >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${job.qualityScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-primary">{job.timeToFill} days</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => onEdit(job.id)}
                      iconName="Edit"
                      className="h-8 w-8 p-0"
                    />
                    {job.status === 'active' ? (
                      <Button
                        variant="ghost"
                        onClick={() => onPause(job.id)}
                        iconName="Pause"
                        className="h-8 w-8 p-0"
                      />
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={() => onClose(job.id)}
                        iconName="X"
                        className="h-8 w-8 p-0"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedJobs.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobPostingTable;