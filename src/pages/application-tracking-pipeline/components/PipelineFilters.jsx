import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PipelineFilters = ({ 
  filters, 
  onFiltersChange, 
  onBulkAction,
  selectedCount,
  totalCandidates 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      dateRange: 'all',
      skillMatch: 'all',
      source: 'all',
      experience: 'all'
    });
  };

  const bulkActions = [
    { label: 'Move to Screening', action: 'move-screening', icon: 'ArrowRight' },
    { label: 'Schedule Interview', action: 'schedule-interview', icon: 'Calendar' },
    { label: 'Send Email', action: 'send-email', icon: 'Mail' },
    { label: 'Add to Shortlist', action: 'add-shortlist', icon: 'Star' },
    { label: 'Reject Selected', action: 'reject', icon: 'X', variant: 'danger' }
  ];

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== ''
  ).length;

  return (
    <div className="glass-card border border-white/20 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-text-primary">Pipeline Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedCount > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-text-secondary">
                {selectedCount} of {totalCandidates} selected
              </span>
              <div className="relative">
                <Button
                  variant="primary"
                  iconName="Settings"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  Bulk Actions
                </Button>
                
                {showBulkActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-56 glass-card border border-white/20 rounded-xl shadow-lg z-50"
                  >
                    <div className="p-2">
                      {bulkActions.map((action) => (
                        <button
                          key={action.action}
                          onClick={() => {
                            onBulkAction(action.action);
                            setShowBulkActions(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                            action.variant === 'danger' ?'hover:bg-red-50 text-red-600' :'hover:bg-white/10 text-text-primary'
                          }`}
                        >
                          <Icon name={action.icon} size={16} />
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <Input
            type="search"
            placeholder="Search candidates by name, skills, or position..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0, 
          opacity: isExpanded ? 1 : 0 
        }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Application Date
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          {/* Skill Match Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Skill Match
            </label>
            <select
              value={filters.skillMatch}
              onChange={(e) => handleFilterChange('skillMatch', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Matches</option>
              <option value="high">90%+ Match</option>
              <option value="medium">70-89% Match</option>
              <option value="low">Below 70%</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Source
            </label>
            <select
              value={filters.source}
              onChange={(e) => handleFilterChange('source', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="company-website">Company Website</option>
              <option value="referral">Referral</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Experience
            </label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="entry">0-2 years</option>
              <option value="mid">3-5 years</option>
              <option value="senior">6-10 years</option>
              <option value="expert">10+ years</option>
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="text-sm text-text-secondary">
            Showing {totalCandidates} candidates
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              iconName="RotateCcw"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
            >
              Clear Filters
            </Button>
            
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => console.log('Export pipeline data')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PipelineFilters;