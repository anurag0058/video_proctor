import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import AuthFooter from './components/AuthFooter';
import CredentialsHelper from './components/CredentialsHelper';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authData = localStorage.getItem('AI-ProctorAuth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        if (parsedAuth?.email) {
          navigate('/interview-dashboard');
        }
      } catch (error) {
        // Invalid auth data, remove it
        localStorage.removeItem('AI-ProctorAuth');
      }
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Login - AI-Proctor | Secure Interview Proctoring</title>
        <meta name="description" content="Sign in to AI-Proctor to access AI-powered interview proctoring and monitoring tools for secure remote interviews." />
        <meta name="keywords" content="login, proctoring, interview monitoring, AI detection, secure authentication" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-modal border border-border p-8">
            {/* Header Section */}
            <AuthHeader />
            
            {/* Login Form */}
            <LoginForm />
            
            {/* Demo Credentials Helper */}
            <CredentialsHelper />
            
            {/* Security Badges */}
            <SecurityBadges />
            
            {/* Footer Section */}
            <AuthFooter />
          </div>
          
          {/* Additional Security Info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Secure connection established</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;