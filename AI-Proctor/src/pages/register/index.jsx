import React from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register - AI-Proctor | AI-Powered Interview Proctoring</title>
        <meta name="description" content="Create your AI-Proctor account to access enterprise-grade AI-powered interview proctoring with real-time detection and comprehensive reporting." />
        <meta name="keywords" content="interview proctoring, AI detection, HR tools, secure interviews, registration" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Registration Form */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-lg space-y-8">
              <WelcomeHeader />
              <RegistrationForm />
            </div>
          </div>

          {/* Right Side - Trust Signals & Information */}
          <div className="flex-1 bg-muted/30 p-6 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <TrustSignals />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <span>&copy; {new Date()?.getFullYear()} AI-Proctor. All rights reserved.</span>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Need help?</span>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">Contact Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;