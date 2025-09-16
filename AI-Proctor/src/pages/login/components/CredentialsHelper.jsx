import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      role: 'HR Manager',
      email: 'hr@AI-Proctor.com',
      password: 'hr123456',
      description: 'Full access to all proctoring features'
    },
    {
      role: 'Recruiter',
      email: 'recruiter@AI-Proctor.com',
      password: 'rec123456',
      description: 'Interview setup and monitoring access'
    },
    {
      role: 'Admin',
      email: 'admin@AI-Proctor.com',
      password: 'admin123456',
      description: 'System administration and reports'
    }
  ];

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between text-sm"
      >
        <span className="flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Demo Credentials</span>
        </span>
        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
      </Button>
      {isExpanded && (
        <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-3">
            Use these credentials to explore the application:
          </p>
          
          <div className="space-y-3">
            {mockCredentials?.map((cred, index) => (
              <div key={index} className="p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{cred?.role}</h4>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => navigator.clipboard?.writeText(cred?.email)}
                      className="p-1 hover:bg-muted rounded"
                      title="Copy email"
                    >
                      <Icon name="Copy" size={12} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Email:</span> {cred?.email}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Password:</span> {cred?.password}
                  </p>
                  <p className="text-muted-foreground/80">{cred?.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
            <Icon name="AlertTriangle" size={12} className="inline mr-1" />
            These are demo credentials for testing purposes only
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;