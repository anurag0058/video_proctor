import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetectionAlerts = ({ alerts = [], onClearAlerts, onAlertClick }) => {
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [filterType, setFilterType] = useState('all');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredAlerts(alerts);
    } else {
      setFilteredAlerts(alerts?.filter(alert => alert?.severity === filterType));
    }
  }, [alerts, filterType]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'focus': return 'EyeOff';
      case 'face': return 'UserX';
      case 'object': return 'Smartphone';
      case 'audio': return 'Volume2';
      case 'multiple_faces': return 'Users';
      default: return 'AlertTriangle';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-accent text-accent-foreground'
    };
    return colors?.[severity] || 'bg-muted text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getFilterCount = (type) => {
    if (type === 'all') return alerts?.length;
    return alerts?.filter(alert => alert?.severity === type)?.length;
  };

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
            <h3 className="font-semibold text-foreground">Detection Alerts</h3>
            <p className="text-sm text-muted-foreground">
              {alerts?.length} total alerts
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {alerts?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAlerts}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
          <div className="w-3 h-3 bg-success rounded-full animate-pulse-monitoring"></div>
        </div>
      </div>
      {isExpanded && (
        <>
          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 p-4 border-b border-border bg-muted/30">
            {[
              { key: 'all', label: 'All' },
              { key: 'high', label: 'High' },
              { key: 'medium', label: 'Medium' },
              { key: 'low', label: 'Low' }
            ]?.map((filter) => (
              <button
                key={filter?.key}
                onClick={() => setFilterType(filter?.key)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                  filterType === filter?.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {filter?.label} ({getFilterCount(filter?.key)})
              </button>
            ))}
          </div>

          {/* Alerts List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredAlerts?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Shield" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground font-medium">No alerts detected</p>
                <p className="text-sm text-muted-foreground/75 mt-1">
                  System is monitoring for violations
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredAlerts?.map((alert, index) => (
                  <div
                    key={index}
                    onClick={() => onAlertClick && onAlertClick(alert)}
                    className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors duration-200 ${
                      getAlertColor(alert?.severity)
                    } border-l-4`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon 
                          name={getAlertIcon(alert?.type)} 
                          size={16} 
                          className={alert?.severity === 'high' ? 'text-error' : 
                                   alert?.severity === 'medium' ? 'text-warning' : 'text-accent'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {alert?.message}
                          </p>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityBadge(alert?.severity)}`}>
                            {alert?.severity?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {alert?.description}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(alert?.timestamp)}
                          </span>
                        </div>
                        {alert?.duration && (
                          <div className="mt-1">
                            <span className="text-xs text-muted-foreground">
                              Duration: {alert?.duration}s
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {alerts?.length > 0 && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-error">
                    {alerts?.filter(a => a?.severity === 'high')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-warning">
                    {alerts?.filter(a => a?.severity === 'medium')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Medium Priority</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-accent">
                    {alerts?.filter(a => a?.severity === 'low')?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Low Priority</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetectionAlerts;