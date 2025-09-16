import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onNewInterview, onViewReports, onSystemSettings }) => {
  const quickActionItems = [
    {
      id: 'new-interview',
      title: 'New Interview',
      description: 'Schedule a new proctored interview session',
      icon: 'Plus',
      color: 'primary',
      action: onNewInterview
    },
    {
      id: 'live-monitor',
      title: 'Live Monitor',
      description: 'View active interview sessions',
      icon: 'Monitor',
      color: 'success',
      link: '/live-interview-monitor'
    },
    {
      id: 'reports',
      title: 'View Reports',
      description: 'Access proctoring reports and analytics',
      icon: 'FileText',
      color: 'accent',
      action: onViewReports
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure detection and monitoring settings',
      icon: 'Settings',
      color: 'secondary',
      action: onSystemSettings
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border hover:bg-muted/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground mt-1">Common tasks and shortcuts</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionItems?.map((item) => {
          const content = (
            <div className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer ${getColorClasses(item?.color)}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-current/10">
                  <Icon name={item?.icon} size={20} className="text-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{item?.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item?.description}</p>
            </div>
          );

          if (item?.link) {
            return (
              <Link key={item?.id} to={item?.link}>
                {content}
              </Link>
            );
          }

          return (
            <button key={item?.id} onClick={item?.action} className="text-left w-full">
              {content}
            </button>
          );
        })}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg mx-auto mb-2">
              <Icon name="Users" size={16} />
            </div>
            <p className="text-lg font-semibold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Total Candidates</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 text-success rounded-lg mx-auto mb-2">
              <Icon name="CheckCircle" size={16} />
            </div>
            <p className="text-lg font-semibold text-foreground">18</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/10 text-warning rounded-lg mx-auto mb-2">
              <Icon name="Clock" size={16} />
            </div>
            <p className="text-lg font-semibold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 text-accent rounded-lg mx-auto mb-2">
              <Icon name="TrendingUp" size={16} />
            </div>
            <p className="text-lg font-semibold text-foreground">92%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;