import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterviewTable = ({ interviews, onJoinSession, onViewReport, onViewRecording }) => {
  const [sortField, setSortField] = useState('startTime');
  const [sortDirection, setSortDirection] = useState('desc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'scheduled':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getIntegrityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInterviews = [...interviews]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'startTime') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    return sortDirection === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Active Interviews</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage ongoing and scheduled interview sessions</p>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('candidateName')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Candidate</span>
                  <SortIcon field="candidateName" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('startTime')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Time</span>
                  <SortIcon field="startTime" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Duration</span>
                  <SortIcon field="duration" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('integrityScore')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Integrity</span>
                  <SortIcon field="integrityScore" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInterviews?.map((interview) => (
              <tr key={interview?.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {interview?.candidateName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{interview?.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{interview?.position}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{formatTime(interview?.startTime)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(interview.startTime)?.toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview?.status)}`}>
                    {interview?.status === 'active' && <div className="w-1.5 h-1.5 bg-current rounded-full mr-1.5 animate-pulse-monitoring" />}
                    {interview?.status?.charAt(0)?.toUpperCase() + interview?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{formatDuration(interview?.duration)}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getIntegrityColor(interview?.integrityScore)}`}>
                      {interview?.integrityScore}%
                    </span>
                    {interview?.alertCount > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-error">
                        <Icon name="AlertTriangle" size={12} />
                        <span>{interview?.alertCount}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    {interview?.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onJoinSession(interview?.id)}
                        iconName="Monitor"
                        iconPosition="left"
                      >
                        Join
                      </Button>
                    )}
                    {interview?.status === 'completed' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewReport(interview?.id)}
                          iconName="FileText"
                          iconPosition="left"
                        >
                          Report
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewRecording(interview?.id)}
                          iconName="Play"
                          iconPosition="left"
                        >
                          Recording
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden">
        {sortedInterviews?.map((interview) => (
          <div key={interview?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {interview?.candidateName?.split(' ')?.map(n => n?.[0])?.join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground">{interview?.candidateName}</p>
                  <p className="text-sm text-muted-foreground">{interview?.position}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview?.status)}`}>
                {interview?.status === 'active' && <div className="w-1.5 h-1.5 bg-current rounded-full mr-1.5 animate-pulse-monitoring" />}
                {interview?.status?.charAt(0)?.toUpperCase() + interview?.status?.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Time:</span>
                <p className="font-medium text-foreground">{formatTime(interview?.startTime)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p className="font-medium text-foreground">{formatDuration(interview?.duration)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Integrity:</span>
                <p className={`font-medium ${getIntegrityColor(interview?.integrityScore)}`}>
                  {interview?.integrityScore}%
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Alerts:</span>
                <p className="font-medium text-foreground">{interview?.alertCount}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              {interview?.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onJoinSession(interview?.id)}
                  iconName="Monitor"
                  iconPosition="left"
                  fullWidth
                >
                  Join Session
                </Button>
              )}
              {interview?.status === 'completed' && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewReport(interview?.id)}
                    iconName="FileText"
                    iconPosition="left"
                    fullWidth
                  >
                    Report
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewRecording(interview?.id)}
                    iconName="Play"
                    iconPosition="left"
                    fullWidth
                  >
                    Recording
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewTable;