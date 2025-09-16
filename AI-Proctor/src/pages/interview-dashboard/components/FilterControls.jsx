import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFilterChange, onSearch, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');
  const [sortBy, setSortBy] = useState('startTime');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sortOptions = [
    { value: 'startTime', label: 'Start Time' },
    { value: 'candidateName', label: 'Candidate Name' },
    { value: 'integrityScore', label: 'Integrity Score' },
    { value: 'duration', label: 'Duration' },
    { value: 'alertCount', label: 'Alert Count' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilterChange({ status: value, date: selectedDate, sortBy });
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    onFilterChange({ status: selectedStatus, date: value, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ status: selectedStatus, date: selectedDate, sortBy: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedDate('today');
    setSortBy('startTime');
    onSearch('');
    onFilterChange({ status: 'all', date: 'today', sortBy: 'startTime' });
  };

  const hasActiveFilters = searchTerm || selectedStatus !== 'all' || selectedDate !== 'today' || sortBy !== 'startTime';

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search and Primary Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search candidates, positions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-4">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              placeholder="Status"
              className="min-w-32"
            />
            
            <Select
              options={dateOptions}
              value={selectedDate}
              onChange={handleDateChange}
              placeholder="Date"
              className="min-w-32"
            />
          </div>
        </div>

        {/* Sort and Actions */}
        <div className="flex items-center space-x-4">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
            className="min-w-36"
          />
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              iconName="RefreshCw"
              className="p-2"
            />
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            <div className="flex items-center space-x-2 flex-wrap">
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      onSearch('');
                    }}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              
              {selectedStatus !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success rounded text-xs">
                  Status: {statusOptions?.find(opt => opt?.value === selectedStatus)?.label}
                  <button
                    onClick={() => handleStatusChange('all')}
                    className="ml-1 hover:text-success/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              
              {selectedDate !== 'today' && (
                <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                  Date: {dateOptions?.find(opt => opt?.value === selectedDate)?.label}
                  <button
                    onClick={() => handleDateChange('today')}
                    className="ml-1 hover:text-accent/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;