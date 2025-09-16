import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'GDPR compliant with advanced privacy controls'
    },
    {
      icon: 'CheckCircle',
      title: 'SOC 2 Certified',
      description: 'Independently audited security standards'
    }
  ];

  const certifications = [
    { name: 'ISO 27001', icon: 'Award' },
    { name: 'SOC 2 Type II', icon: 'Shield' },
    { name: 'GDPR Compliant', icon: 'Lock' },
    { name: 'SSL Secured', icon: 'CheckCircle' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Enterprise-Grade Security</h3>
        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{feature?.title}</h4>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Compliance & Certifications</h3>
        <div className="grid grid-cols-2 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
              <Icon name={cert?.icon} size={14} className="text-success" />
              <span className="text-sm font-medium text-foreground">{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Users" size={16} className="text-success" />
          <span className="font-medium text-success">Trusted by 500+ Companies</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Join leading organizations worldwide who trust AI-Proctor for secure interview proctoring.
        </p>
      </div>
      {/* Support Information */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Headphones" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">24/7 Support Available</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Get help anytime with our dedicated support team
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;