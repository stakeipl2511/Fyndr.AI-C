import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onBulkAction,
  selectedCandidates,
  totalResults
}) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [advancedQuery, setAdvancedQuery] = useState({
    must: '',
    should: '',
    not: ''
  });

  const sortOptions = [
    { value: 'match', label: 'Best Match', icon: 'Target' },
    { value: 'experience', label: 'Experience Level', icon: 'TrendingUp' },
    { value: 'availability', label: 'Availability', icon: 'Clock' },
    { value: 'activity', label: 'Last Activity', icon: 'Activity' },
    { value: 'salary', label: 'Salary Range', icon: 'DollarSign' }
  ];

  const bulkActions = [
    { value: 'shortlist', label: 'Add to Shortlist', icon: 'Heart' },
    { value: 'message', label: 'Send Message', icon: 'MessageCircle' },
    { value: 'export', label: 'Export Profiles', icon: 'Download' },
    { value: 'tag', label: 'Add Tags', icon: 'Tag' }
  ];

  const handleAdvancedSearch = () => {
    const query = [];
    if (advancedQuery.must) query.push(`+${advancedQuery.must}`);
    if (advancedQuery.should) query.push(advancedQuery.should);
    if (advancedQuery.not) query.push(`-${advancedQuery.not}`);
    
    onSearchChange(query.join(' '));
    setIsAdvancedSearch(false);
  };

  return (
    <div className="glass-card border border-white/20 rounded-2xl p-4 mb-6">
      {/* Main Search Row */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search candidates by skills, experience, location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
        </div>

        {/* Advanced Search Toggle */}
        <Button
          variant={isAdvancedSearch ? 'primary' : 'ghost'}
          onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          iconName="Settings"
          className="h-10 w-10 p-0"
        />

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-tertiary pointer-events-none" 
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="h-8 w-8 p-0"
          />
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="h-8 w-8 p-0"
          />
        </div>
      </div>

      {/* Advanced Search Panel */}
      {isAdvancedSearch && (
        <div className="glass-surface p-4 rounded-xl mb-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Advanced Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Must have (required)
              </label>
              <Input
                type="text"
                placeholder="e.g., React JavaScript"
                value={advancedQuery.must}
                onChange={(e) => setAdvancedQuery(prev => ({ ...prev, must: e.target.value }))}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Should have (preferred)
              </label>
              <Input
                type="text"
                placeholder="e.g., Node.js AWS"
                value={advancedQuery.should}
                onChange={(e) => setAdvancedQuery(prev => ({ ...prev, should: e.target.value }))}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Must not have (exclude)
              </label>
              <Input
                type="text"
                placeholder="e.g., PHP WordPress"
                value={advancedQuery.not}
                onChange={(e) => setAdvancedQuery(prev => ({ ...prev, not: e.target.value }))}
                className="text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-3">
            <Button variant="primary" onClick={handleAdvancedSearch} className="text-sm">
              Apply Advanced Search
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsAdvancedSearch(false)} 
              className="text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Results Summary & Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            {totalResults.toLocaleString()} candidates found
          </span>
          {selectedCandidates.length > 0 && (
            <span className="text-sm text-primary">
              {selectedCandidates.length} selected
            </span>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Bulk actions:</span>
            {bulkActions.map((action) => (
              <Button
                key={action.value}
                variant="ghost"
                onClick={() => onBulkAction(action.value, selectedCandidates)}
                iconName={action.icon}
                className="h-8 w-8 p-0"
                title={action.label}
              />
            ))}
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {searchQuery === '' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-text-secondary mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'React Developer',
              'Senior Frontend',
              'Full Stack Engineer',
              'DevOps Engineer',
              'Product Manager',
              'UI/UX Designer'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSearchChange(suggestion)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-text-primary transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;