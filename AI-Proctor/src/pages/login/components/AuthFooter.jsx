import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const AuthFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 space-y-6">
      {/* Registration Link */}
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">
          Don't have an account yet?
        </p>
        <Link to="/register">
          <Button variant="outline" fullWidth>
            Create New Account
          </Button>
        </Link>
      </div>
      
      {/* Help Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
        <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
          Help & Support
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
          Privacy Policy
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
          Terms of Service
        </button>
      </div>
      
      {/* Copyright */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {currentYear} AI-Proctor. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;