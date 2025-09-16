import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportFilters = ({ onFiltersChange, resultsCount }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    integrityScore: 'all',
    violationType: 'all',
    searchTerm: '',
    startDate: '',
    endDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const integrityScoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'excellent', label: 'Excellent (90-100)' },
    { value: 'good', label: 'Good (75-89)' },
    { value: 'fair', label: 'Fair (60-74)' },
    { value: 'poor', label: 'Poor (Below 60)' }
  ];

  const violationTypeOptions = [
    { value: 'all', label: 'All Violations' },
    { value: 'focus-loss', label: 'Focus Loss' },
    { value: 'multiple-faces', label: 'Multiple Faces' },
    { value: 'no-face', label: 'No Face Detected' },
    { value: 'unauthorized-objects', label: 'Unauthorized Objects' },
    { value: 'phone-detected', label: 'Phone Detected' },
    { value: 'books-papers', label: 'Books/Papers' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      dateRange: 'last-30-days',
      integrityScore: 'all',
      violationType: 'all',
      searchTerm: '',
      startDate: '',
      endDate: ''
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters?.searchTerm || 
    filters?.dateRange !== 'last-30-days' || 
    filters?.integrityScore !== 'all' || 
    filters?.violationType !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Filter Reports</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="FileText" size={16} />
            <span>{resultsCount} reports found</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              <Icon name="X" size={16} className="mr-2" />
              Clear Filters
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Search Bar */}
        <div className="w-full md:w-96">
          <Input
            type="search"
            placeholder="Search by candidate name, email, or interview ID..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />

          <Select
            label="Integrity Score"
            options={integrityScoreOptions}
            value={filters?.integrityScore}
            onChange={(value) => handleFilterChange('integrityScore', value)}
          />

          <Select
            label="Violation Type"
            options={violationTypeOptions}
            value={filters?.violationType}
            onChange={(value) => handleFilterChange('violationType', value)}
          />

          {filters?.dateRange === 'custom' && (
            <div className="md:col-span-2 lg:col-span-1">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Start Date"
                  value={filters?.startDate}
                  onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                />
                <Input
                  type="date"
                  label="End Date"
                  value={filters?.endDate}
                  onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters?.searchTerm && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Search: "{filters?.searchTerm}"</span>
                <button onClick={() => handleFilterChange('searchTerm', '')}>
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
            {filters?.dateRange !== 'last-30-days' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Date: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}</span>
                <button onClick={() => handleFilterChange('dateRange', 'last-30-days')}>
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
            {filters?.integrityScore !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Score: {integrityScoreOptions?.find(opt => opt?.value === filters?.integrityScore)?.label}</span>
                <button onClick={() => handleFilterChange('integrityScore', 'all')}>
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
            {filters?.violationType !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Violation: {violationTypeOptions?.find(opt => opt?.value === filters?.violationType)?.label}</span>
                <button onClick={() => handleFilterChange('violationType', 'all')}>
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportFilters;