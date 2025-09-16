import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingInterviews = ({ interviews, onStartInterview, onEditInterview }) => {
  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilStart = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start - now;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 0) return 'Overdue';
    if (diffMins === 0) return 'Starting now';
    if (diffMins < 60) return `${diffMins}m`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const getUrgencyColor = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start - now;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 0) return 'text-error';
    if (diffMins <= 15) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Interviews</h2>
            <p className="text-sm text-muted-foreground mt-1">Scheduled sessions for today</p>
          </div>
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {interviews?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No upcoming interviews</h3>
            <p className="text-sm text-muted-foreground mb-4">Schedule your first interview to get started</p>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Schedule Interview
            </Button>
          </div>
        ) : (
          interviews?.map((interview) => (
            <div key={interview?.id} className="p-4 hover:bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {interview?.candidateName?.split(' ')?.map(n => n?.[0])?.join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground truncate">{interview?.candidateName}</p>
                      {interview?.isUrgent && (
                        <Icon name="AlertCircle" size={16} className="text-warning flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{interview?.position}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} />
                        <span>{formatTime(interview?.startTime)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="User" size={12} />
                        <span>{interview?.interviewer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getUrgencyColor(interview?.startTime)}`}>
                      {getTimeUntilStart(interview?.startTime)}
                    </p>
                    <p className="text-xs text-muted-foreground">until start</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditInterview(interview?.id)}
                      iconName="Edit"
                      className="p-2"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartInterview(interview?.id)}
                      iconName="Play"
                      iconPosition="left"
                      disabled={getTimeUntilStart(interview?.startTime) === 'Overdue'}
                    >
                      Start
                    </Button>
                  </div>
                </div>
              </div>
              
              {interview?.notes && (
                <div className="mt-3 ml-13">
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    <Icon name="MessageSquare" size={12} className="inline mr-1" />
                    {interview?.notes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingInterviews;