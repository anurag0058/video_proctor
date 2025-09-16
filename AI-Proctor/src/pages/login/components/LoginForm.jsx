import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    hr: { email: 'hr@AI-Proctor.com', password: 'hr123456' },
    recruiter: { email: 'recruiter@AI-Proctor.com', password: 'rec123456' },
    admin: { email: 'admin@AI-Proctor.com', password: 'admin123456' }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e?.target;
    const newErrors = { ...errors };

    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (name === 'password' && value && value?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Mock authentication
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Store user session
        localStorage.setItem('AI-ProctorAuth', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        navigate('/interview-dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your work email"
        value={formData?.email}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors?.email}
        required
        className="w-full"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors?.password}
        required
        className="w-full"
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;