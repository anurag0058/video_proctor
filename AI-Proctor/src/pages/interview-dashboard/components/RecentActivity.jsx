import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'interview_started':
        return 'Play';
      case 'interview_completed':
        return 'CheckCircle';
      case 'alert_triggered':
        return 'AlertTriangle';
      case 'report_generated':
        return 'FileText';
      case 'candidate_joined':
        return 'UserPlus';
      case 'system_update':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'interview_started':
        return 'text-primary';
      case 'interview_completed':
        return 'text-success';
      case 'alert_triggered':
        return 'text-error';
      case 'report_generated':
        return 'text-accent';
      case 'candidate_joined':
        return 'text-warning';
      case 'system_update':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground mt-1">Latest system events and updates</p>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-monitoring"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
            <p className="text-sm text-muted-foreground">Activity will appear here as interviews are conducted</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/30">
                <div className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-current/10 flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={16} className="text-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                    {activity?.metadata && (
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        {activity?.metadata?.candidate && (
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={12} />
                            <span>{activity?.metadata?.candidate}</span>
                          </div>
                        )}
                        {activity?.metadata?.session && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Hash" size={12} />
                            <span>{activity?.metadata?.session}</span>
                          </div>
                        )}
                        {activity?.metadata?.score && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Target" size={12} />
                            <span>{activity?.metadata?.score}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {activities?.length > 0 && (
        <div className="p-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;