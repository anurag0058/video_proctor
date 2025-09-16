import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData?.password?.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/?.test(formData?.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/?.test(formData?.password) },
    { text: 'Contains number', met: /\d/?.test(formData?.password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) }
  ];

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password?.length >= 8) score += 20;
    else feedback?.push('Use at least 8 characters');

    if (/[A-Z]/?.test(password)) score += 20;
    else feedback?.push('Add uppercase letters');

    if (/[a-z]/?.test(password)) score += 20;
    else feedback?.push('Add lowercase letters');

    if (/\d/?.test(password)) score += 20;
    else feedback?.push('Add numbers');

    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) score += 20;
    else feedback?.push('Add special characters');

    return { score, feedback };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company name validation
    if (!formData?.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    // Job title validation
    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength?.score < 80) {
      newErrors.password = 'Password does not meet security requirements';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms and privacy validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      console.log('Registration successful:', formData);
      navigate('/interview-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength?.score < 40) return 'bg-error';
    if (passwordStrength?.score < 80) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength?.score < 40) return 'Weak';
    if (passwordStrength?.score < 80) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        {/* Company Name */}
        <Input
          label="Company Name"
          type="text"
          name="companyName"
          placeholder="Enter your company name"
          value={formData?.companyName}
          onChange={handleInputChange}
          error={errors?.companyName}
          required
        />

        {/* Job Title */}
        <Input
          label="Job Title"
          type="text"
          name="jobTitle"
          placeholder="e.g., HR Manager, Technical Recruiter"
          value={formData?.jobTitle}
          onChange={handleInputChange}
          error={errors?.jobTitle}
          required
        />

        {/* Password */}
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a secure password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password Strength:</span>
                <span className={`font-medium ${
                  passwordStrength?.score < 40 ? 'text-error' :
                  passwordStrength?.score < 80 ? 'text-warning' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength?.score}%` }}
                />
              </div>
            </div>
          )}

          {/* Password Requirements */}
          <div className="space-y-1">
            {passwordRequirements?.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon 
                  name={req?.met ? "CheckCircle" : "Circle"} 
                  size={14} 
                  className={req?.met ? 'text-success' : 'text-muted-foreground'} 
                />
                <span className={req?.met ? 'text-success' : 'text-muted-foreground'}>
                  {req?.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />

        {/* Terms and Privacy Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms of Service"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            name="agreeToPrivacy"
            checked={formData?.agreeToPrivacy}
            onChange={handleInputChange}
            error={errors?.agreeToPrivacy}
            required
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-error text-sm">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;