import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/interview-dashboard" className="inline-flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Eye" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">AI-Proctor</span>
      </Link>
      
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to access the proctoring dashboard
        </p>
      </div>
      
      {/* Status Indicator */}
      <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse-monitoring"></div>
        <span>System Online</span>
      </div>
    </div>
  );
};

export default AuthHeader;