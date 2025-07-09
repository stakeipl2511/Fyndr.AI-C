import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ filters, onFiltersChange, resultCount, onSaveSearch, savedSearches }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const skillOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker',
    'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Vue.js', 'Angular', 'PHP',
    'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native'
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const availabilityOptions = [
    { value: 'immediate', label: 'Immediate (0-2 weeks)' },
    { value: 'short', label: 'Short term (2-4 weeks)' },
    { value: 'medium', label: 'Medium term (1-2 months)' },
    { value: 'long', label: 'Long term (2+ months)' }
  ];

  const locationTypes = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFiltersChange(localFilters);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localFilters, onFiltersChange]);

  const handleSkillToggle = (skill) => {
    setLocalFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleExperienceChange = (level) => {
    setLocalFilters(prev => ({
      ...prev,
      experience: prev.experience.includes(level)
        ? prev.experience.filter(e => e !== level)
        : [...prev.experience, level]
    }));
  };

  const handleSalaryChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const handleLocationChange = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      location: {
        ...prev.location,
        types: prev.location.types.includes(type)
          ? prev.location.types.filter(t => t !== type)
          : [...prev.location.types, type]
      }
    }));
  };

  const handleAvailabilityChange = (availability) => {
    setLocalFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      skills: [],
      experience: [],
      salary: { min: '', max: '' },
      location: { types: [], cities: '' },
      availability: [],
      matchScore: 0
    };
    setLocalFilters(clearedFilters);
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveSearch(searchName, localFilters);
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.skills.length > 0) count++;
    if (localFilters.experience.length > 0) count++;
    if (localFilters.salary.min || localFilters.salary.max) count++;
    if (localFilters.location.types.length > 0 || localFilters.location.cities) count++;
    if (localFilters.availability.length > 0) count++;
    if (localFilters.matchScore > 0) count++;
    return count;
  };

  return (
    <div className={`glass-card border border-white/20 rounded-2xl transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
          className="h-8 w-8 p-0"
        />
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {resultCount.toLocaleString()} candidates found
            </span>
            <Button
              variant="text"
              onClick={handleClearFilters}
              className="text-xs text-error"
            >
              Clear all
            </Button>
          </div>

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">Saved Searches</h3>
              <div className="space-y-1">
                {savedSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setLocalFilters(search.filters)}
                    className="w-full flex items-center justify-between p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <span className="text-sm text-text-primary">{search.name}</span>
                    <Icon name="Search" size={14} className="text-text-secondary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Match Score */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Minimum Match Score: {localFilters.matchScore}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={localFilters.matchScore}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, matchScore: parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Skills</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.experience.includes(level.value)}
                    onChange={() => handleExperienceChange(level.value)}
                    className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Salary Range (USD)</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.salary.min}
                onChange={(e) => handleSalaryChange('min', e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.salary.max}
                onChange={(e) => handleSalaryChange('max', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Location Preference</h3>
            <div className="space-y-2 mb-3">
              {locationTypes.map((type) => (
                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.location.types.includes(type.value)}
                    onChange={() => handleLocationChange(type.value)}
                    className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{type.label}</span>
                </label>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Cities (e.g., New York, San Francisco)"
              value={localFilters.location.cities}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                location: { ...prev.location, cities: e.target.value }
              }))}
              className="text-sm"
            />
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Availability</h3>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.availability.includes(option.value)}
                    onChange={() => handleAvailabilityChange(option.value)}
                    className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Search */}
          <div className="pt-4 border-t border-white/10">
            {!showSaveDialog ? (
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(true)}
                iconName="Bookmark"
                className="w-full"
              >
                Save Search
              </Button>
            ) : (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Search name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="text-sm"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={handleSaveSearch}
                    className="flex-1 text-sm"
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowSaveDialog(false)}
                    className="flex-1 text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;