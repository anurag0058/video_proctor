import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CandidateInfoForm from './components/CandidateInfoForm';
import DetectionSettings from './components/DetectionSettings';
import SchedulingOptions from './components/SchedulingOptions';
import RecordingPreferences from './components/RecordingPreferences';
import SessionPreview from './components/SessionPreview';

const InterviewSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form Data States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    duration: '60',
    phone: '',
    interviewId: `INT-${Date.now()?.toString()?.slice(-8)}`,
    notes: ''
  });

  const [detectionSettings, setDetectionSettings] = useState({
    focusDetection: true,
    focusThreshold: '5',
    faceDetection: true,
    faceThreshold: '10',
    multipleFaceDetection: true,
    phoneDetection: true,
    paperDetection: true,
    deviceDetection: true,
    sensitivity: 'medium',
    drowsinessDetection: false,
    audioMonitoring: false,
    realtimeAlerts: true,
    autoPause: false
  });

  const [schedulingOptions, setSchedulingOptions] = useState({
    immediate: true,
    date: '',
    time: '',
    timezone: 'America/New_York',
    bufferTime: '15',
    sendEmail: true,
    smsReminder: false,
    calendarIntegration: true,
    autoStart: false,
    sessionPassword: '',
    waitingRoom: '10'
  });

  const [recordingPreferences, setRecordingPreferences] = useState({
    enableRecording: true,
    videoQuality: '720p',
    videoFormat: 'mp4',
    recordAudio: true,
    storageDuration: '30',
    cloudBackup: true,
    autoDelete: true,
    maxFileSize: '5',
    screenRecording: false,
    interviewerScreen: false,
    screenFPS: '15',
    generateReport: true,
    emailReport: true,
    videoHighlights: true,
    pdfExport: true
  });

  const steps = [
    { id: 1, title: 'Candidate Info', icon: 'User' },
    { id: 2, title: 'Detection Settings', icon: 'Settings' },
    { id: 3, title: 'Scheduling', icon: 'Calendar' },
    { id: 4, title: 'Recording', icon: 'Video' },
    { id: 5, title: 'Review', icon: 'Eye' }
  ];

  // Handle form data changes
  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDetectionSettingsChange = (field, value) => {
    setDetectionSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSchedulingChange = (field, value) => {
    setSchedulingOptions(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRecordingChange = (field, value) => {
    setRecordingPreferences(prev => ({ ...prev, [field]: value }));
  };

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
        if (!formData?.position) newErrors.position = 'Position is required';
        if (!formData?.duration) newErrors.duration = 'Duration is required';
        break;

      case 3:
        if (!schedulingOptions?.immediate) {
          if (!schedulingOptions?.date) newErrors.date = 'Date is required';
          if (!schedulingOptions?.time) newErrors.time = 'Time is required';
          if (!schedulingOptions?.timezone) newErrors.timezone = 'Timezone is required';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStartInterview = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to live monitor with session data
      navigate('/live-interview-monitor', {
        state: {
          sessionData: {
            candidate: formData,
            settings: detectionSettings,
            scheduling: schedulingOptions,
            recording: recordingPreferences,
            sessionId: formData?.interviewId,
            startTime: new Date()?.toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Failed to start interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleInterview = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    try {
      // Simulate API call for scheduling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to dashboard with success message
      navigate('/interview-dashboard', {
        state: {
          message: `Interview scheduled successfully for ${formData?.fullName}`,
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Failed to schedule interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CandidateInfoForm
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DetectionSettings
            settings={detectionSettings}
            onChange={handleDetectionSettingsChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <SchedulingOptions
            scheduling={schedulingOptions}
            onChange={handleSchedulingChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <RecordingPreferences
            preferences={recordingPreferences}
            onChange={handleRecordingChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <SessionPreview
            formData={formData}
            settings={detectionSettings}
            scheduling={schedulingOptions}
            preferences={recordingPreferences}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Interview Setup</h1>
                <p className="text-muted-foreground">Configure a new proctored interview session</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-card rounded-lg border border-border p-6 shadow-card">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                      currentStep >= step?.id
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}>
                      {currentStep > step?.id ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <Icon name={step?.icon} size={20} />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className={`font-medium ${
                        currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.title}
                      </div>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step?.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Copy"
                    iconPosition="left"
                    onClick={() => navigator.clipboard?.writeText(formData?.interviewId)}
                  >
                    Copy Interview ID
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Template
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Import Settings
                  </Button>
                </div>
              </div>

              {/* Help & Tips */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Lightbulb" size={20} className="text-accent" />
                  <h3 className="font-semibold text-foreground">Setup Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Enable multiple detections for comprehensive monitoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Test camera and microphone before starting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Send invitation email 24 hours in advance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Use medium sensitivity for balanced detection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              
              {currentStep < steps?.length && (
                <Button
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next Step
                </Button>
              )}
            </div>

            {currentStep === steps?.length && (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/interview-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
                
                {schedulingOptions?.immediate ? (
                  <Button
                    onClick={handleStartInterview}
                    loading={isLoading}
                    iconName="Play"
                    iconPosition="left"
                    className="bg-success hover:bg-success/90"
                  >
                    Start Interview Now
                  </Button>
                ) : (
                  <Button
                    onClick={handleScheduleInterview}
                    loading={isLoading}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Interview
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewSetup;