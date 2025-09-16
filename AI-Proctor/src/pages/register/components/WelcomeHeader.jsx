import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <Link to="/interview-dashboard" className="inline-flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Eye" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">AI-Proctor</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Join thousands of HR professionals using AI-powered interview proctoring to ensure fair and secure hiring processes.
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Icon name="Zap" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Real-time Detection</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Icon name="FileText" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Detailed Reports</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Secure Platform</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;