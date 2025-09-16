import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventLog = ({ events = [], onExportLog, onClearLog }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    let filtered = events;
    
    if (filterType !== 'all') {
      filtered = filtered?.filter(event => event?.type === filterType);
    }
    
    if (searchTerm) {
      filtered = filtered?.filter(event => 
        event?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        event?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, filterType, searchTerm]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'focus_loss': return 'EyeOff';
      case 'face_absence': return 'UserX';
      case 'object_detected': return 'Smartphone';
      case 'multiple_faces': return 'Users';
      case 'audio_violation': return 'Volume2';
      case 'session_start': return 'Play';
      case 'session_end': return 'Square';
      case 'recording_start': return 'Circle';
      case 'recording_stop': return 'Square';
      case 'screenshot': return 'Camera';
      case 'eye_closure': return 'Eye';
      default: return 'AlertCircle';
    }
  };

  const getEventColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      case 'success': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getEventBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-l-error';
      case 'warning': return 'bg-warning/10 border-l-warning';
      case 'info': return 'bg-accent/10 border-l-accent';
      case 'success': return 'bg-success/10 border-l-success';
      default: return 'bg-muted/10 border-l-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      time: date?.toLocaleTimeString('en-US', { hour12: false }),
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const getFilterCount = (type) => {
    if (type === 'all') return events?.length;
    return events?.filter(event => event?.type === type)?.length;
  };

  const eventTypes = [
    { key: 'all', label: 'All Events' },
    { key: 'focus_loss', label: 'Focus Loss' },
    { key: 'face_absence', label: 'Face Absence' },
    { key: 'object_detected', label: 'Objects' },
    { key: 'multiple_faces', label: 'Multiple Faces' },
    { key: 'audio_violation', label: 'Audio' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6"
          >
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={16} 
            />
          </Button>
          <div>
            <h3 className="font-semibold text-foreground">Event Log</h3>
            <p className="text-sm text-muted-foreground">
              {events?.length} events recorded
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {events?.length > 0 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onExportLog}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearLog}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
      {isExpanded && (
        <>
          {/* Search and Filter */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {eventTypes?.map((type) => (
                  <button
                    key={type?.key}
                    onClick={() => setFilterType(type?.key)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                      filterType === type?.key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {type?.label} ({getFilterCount(type?.key)})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredEvents?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground font-medium">
                  {searchTerm || filterType !== 'all' ? 'No matching events found' : 'No events recorded'}
                </p>
                <p className="text-sm text-muted-foreground/75 mt-1">
                  {searchTerm || filterType !== 'all' ? 'Try adjusting your search or filter' : 'Events will appear here as they occur'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredEvents?.map((event, index) => {
                  const timestamp = formatTimestamp(event?.timestamp);
                  return (
                    <div
                      key={index}
                      className={`p-4 hover:bg-muted/50 transition-colors duration-200 border-l-4 ${getEventBg(event?.severity)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className={`w-8 h-8 rounded-full ${getEventBg(event?.severity)} flex items-center justify-center`}>
                            <Icon 
                              name={getEventIcon(event?.type)} 
                              size={14} 
                              className={getEventColor(event?.severity)}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-foreground">
                              {event?.description}
                            </p>
                            <div className="text-right">
                              <p className="text-xs font-medium text-foreground">
                                {timestamp?.time}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {timestamp?.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                event?.severity === 'critical' ? 'bg-error text-error-foreground' :
                                event?.severity === 'warning' ? 'bg-warning text-warning-foreground' :
                                event?.severity === 'info' ? 'bg-accent text-accent-foreground' :
                                event?.severity === 'success' ? 'bg-success text-success-foreground' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {event?.severity?.toUpperCase()}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {event?.type?.replace('_', ' ')?.toUpperCase()}
                              </span>
                            </div>
                            {event?.duration && (
                              <span className="text-xs text-muted-foreground">
                                Duration: {event?.duration}s
                              </span>
                            )}
                          </div>
                          {event?.details && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {event?.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary Stats */}
          {events?.length > 0 && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-error">
                    {events?.filter(e => e?.severity === 'critical')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-warning">
                    {events?.filter(e => e?.severity === 'warning')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-accent">
                    {events?.filter(e => e?.severity === 'info')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Info</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-success">
                    {events?.filter(e => e?.severity === 'success')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Success</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventLog;