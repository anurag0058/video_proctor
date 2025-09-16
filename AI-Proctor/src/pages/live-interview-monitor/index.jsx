import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import VideoFeed from './components/VideoFeed';
import DetectionAlerts from './components/DetectionAlerts';
import RealTimeMetrics from './components/RealTimeMetrics';
import DetectionSettings from './components/DetectionSettings';
import EventLog from './components/EventLog';
import AudioLevelIndicator from './components/AudioLevelIndicator';

import Button from '../../components/ui/Button';

const LiveInterviewMonitor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [detectionSettings, setDetectionSettings] = useState({
    focusThreshold: 5,
    faceAbsenceThreshold: 10,
    objectDetectionSensitivity: 75,
    audioDetectionEnabled: true,
    multiplePersonDetection: true,
    eyeClosureDetection: false,
    backgroundAudioDetection: false
  });
  const [audioThreshold, setAudioThreshold] = useState(60);
  const [currentAudioLevel, setCurrentAudioLevel] = useState(45);
  const [multipleVoicesDetected, setMultipleVoicesDetected] = useState(false);

  // Mock data for demonstration
  const candidateInfo = {
    name: "John Smith",
    email: "john.smith@email.com",
    position: "Senior Software Engineer",
    interviewId: "INT-2024-001",
    startTime: sessionStartTime
  };

  const mockDetectionOverlays = [
    {
      type: 'face',
      label: 'Face Detected',
      x: 25,
      y: 15,
      width: 50,
      height: 60
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      type: 'focus',
      severity: 'medium',
      message: 'Candidate looking away from screen',
      description: 'Focus lost for 7 seconds',
      timestamp: new Date(Date.now() - 300000),
      duration: 7
    },
    {
      id: 2,
      type: 'object',
      severity: 'high',
      message: 'Mobile phone detected',
      description: 'Unauthorized device identified in frame',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 3,
      type: 'audio',
      severity: 'low',
      message: 'Background noise detected',
      description: 'Audio level exceeded threshold',
      timestamp: new Date(Date.now() - 120000),
      duration: 3
    },
    {
      id: 4,
      type: 'multiple_faces',
      severity: 'high',
      message: 'Multiple faces detected',
      description: 'Additional person identified in video feed',
      timestamp: new Date(Date.now() - 60000)
    }
  ];

  const mockEvents = [
    {
      type: 'session_start',
      severity: 'success',
      description: 'Interview session started',
      timestamp: sessionStartTime,
      details: `Candidate: ${candidateInfo?.name} | Position: ${candidateInfo?.position}`
    },
    {
      type: 'recording_start',
      severity: 'info',
      description: 'Video recording initiated',
      timestamp: new Date(sessionStartTime.getTime() + 30000)
    },
    {
      type: 'focus_loss',
      severity: 'warning',
      description: 'Candidate attention diverted',
      timestamp: new Date(Date.now() - 300000),
      duration: 7,
      details: 'Looking away from screen for extended period'
    },
    {
      type: 'object_detected',
      severity: 'critical',
      description: 'Unauthorized object detected',
      timestamp: new Date(Date.now() - 180000),
      details: 'Mobile phone identified in video frame'
    },
    {
      type: 'screenshot',
      severity: 'info',
      description: 'Screenshot captured',
      timestamp: new Date(Date.now() - 150000)
    },
    {
      type: 'audio_violation',
      severity: 'warning',
      description: 'Audio threshold exceeded',
      timestamp: new Date(Date.now() - 120000),
      duration: 3,
      details: 'Background noise level: 75dB'
    },
    {
      type: 'multiple_faces',
      severity: 'critical',
      description: 'Multiple persons detected',
      timestamp: new Date(Date.now() - 60000),
      details: 'Additional face identified in monitoring area'
    }
  ];

  // Initialize alerts and events
  useEffect(() => {
    setAlerts(mockAlerts);
    setEvents(mockEvents);
  }, []);

  // Update session duration
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now - sessionStartTime) / 1000);
      setSessionDuration(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  // Simulate real-time audio level changes
  useEffect(() => {
    const audioTimer = setInterval(() => {
      const newLevel = 45 + (Math.random() - 0.5) * 30;
      const clampedLevel = Math.max(0, Math.min(100, newLevel));
      setCurrentAudioLevel(clampedLevel);
      
      // Simulate multiple voices detection
      setMultipleVoicesDetected(Math.random() > 0.9);
    }, 2000);

    return () => clearInterval(audioTimer);
  }, []);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    const newEvent = {
      type: isRecording ? 'recording_stop' : 'recording_start',
      severity: 'info',
      description: isRecording ? 'Video recording stopped' : 'Video recording started',
      timestamp: new Date()
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleTakeScreenshot = () => {
    const newEvent = {
      type: 'screenshot',
      severity: 'info',
      description: 'Screenshot captured',
      timestamp: new Date(),
      details: 'Manual screenshot taken by interviewer'
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleEndSession = () => {
    const newEvent = {
      type: 'session_end',
      severity: 'success',
      description: 'Interview session ended',
      timestamp: new Date(),
      details: `Total duration: ${Math.floor(sessionDuration / 60)} minutes`
    };
    setEvents(prev => [newEvent, ...prev]);
    // Navigate to reports or dashboard
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
  };

  const handleSettingsChange = (newSettings) => {
    setDetectionSettings(newSettings);
    const newEvent = {
      type: 'settings_updated',
      severity: 'info',
      description: 'Detection settings updated',
      timestamp: new Date(),
      details: 'AI detection parameters modified'
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleExportLog = () => {
    console.log('Exporting event log...');
  };

  const handleClearLog = () => {
    setEvents([]);
  };

  const handleAudioThresholdChange = (newThreshold) => {
    setAudioThreshold(newThreshold);
  };

  // Calculate metrics
  const focusPercentage = Math.max(0, 100 - (alerts?.filter(a => a?.type === 'focus')?.length * 5));
  const violationCount = alerts?.filter(a => a?.severity === 'high' || a?.severity === 'medium')?.length;
  const integrityScore = Math.max(0, 100 - (violationCount * 8) - (alerts?.length * 2));
  const detectionAccuracy = 96.5;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Live Interview Monitor
              </h1>
              <p className="text-muted-foreground">
                Real-time AI-powered proctoring and detection system
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-lg">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-monitoring"></div>
                <span className="text-sm font-medium">Session Active</span>
              </div>
              <Button
                variant="outline"
                iconName="FileText"
                iconPosition="left"
              >
                Generate Report
              </Button>
            </div>
          </div>

          {/* Candidate Info Bar */}
          <div className="bg-card rounded-lg border border-border p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold">
                  {candidateInfo?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{candidateInfo?.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidateInfo?.position}</p>
                  <p className="text-xs text-muted-foreground">{candidateInfo?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Interview ID</p>
                  <p className="text-xs text-muted-foreground">{candidateInfo?.interviewId}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Started</p>
                  <p className="text-xs text-muted-foreground">
                    {candidateInfo?.startTime?.toLocaleTimeString('en-US', { hour12: false })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Duration</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60)?.toString()?.padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Video Feed */}
            <div className="xl:col-span-2 space-y-8">
              <VideoFeed
                isRecording={isRecording}
                onToggleRecording={handleToggleRecording}
                onTakeScreenshot={handleTakeScreenshot}
                onEndSession={handleEndSession}
                detectionOverlays={mockDetectionOverlays}
                candidateName={candidateInfo?.name}
              />

              {/* Real-Time Metrics */}
              <RealTimeMetrics
                focusPercentage={focusPercentage}
                violationCount={violationCount}
                integrityScore={integrityScore}
                sessionDuration={sessionDuration}
                detectionAccuracy={detectionAccuracy}
                audioLevel={currentAudioLevel}
              />
            </div>

            {/* Right Column - Controls and Monitoring */}
            <div className="space-y-8">
              {/* Detection Alerts */}
              <DetectionAlerts
                alerts={alerts}
                onClearAlerts={handleClearAlerts}
                onAlertClick={handleAlertClick}
              />

              {/* Audio Level Indicator */}
              <AudioLevelIndicator
                currentLevel={currentAudioLevel}
                threshold={audioThreshold}
                isEnabled={detectionSettings?.audioDetectionEnabled}
                onThresholdChange={handleAudioThresholdChange}
                multipleVoicesDetected={multipleVoicesDetected}
              />

              {/* Detection Settings */}
              <DetectionSettings
                settings={detectionSettings}
                onChange={handleSettingsChange}
                errors={{}}
              />
            </div>
          </div>

          {/* Event Log - Full Width */}
          <div className="mt-8">
            <EventLog
              events={events}
              onExportLog={handleExportLog}
              onClearLog={handleClearLog}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveInterviewMonitor;