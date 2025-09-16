import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'Data privacy certified'
    },
    {
      icon: 'Eye',
      title: 'SOC 2 Type II',
      description: 'Security audited'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Trusted by 500+ companies worldwide</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} />
            </div>
            <h4 className="text-xs font-medium text-foreground">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;