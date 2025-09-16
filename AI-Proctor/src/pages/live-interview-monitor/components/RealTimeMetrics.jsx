import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeMetrics = ({ 
  focusPercentage = 85,
  violationCount = 3,
  integrityScore = 92,
  sessionDuration = 1847,
  detectionAccuracy = 96.5,
  audioLevel = 45
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const metrics = [
    {
      id: 'focus',
      label: 'Focus Level',
      value: `${focusPercentage}%`,
      icon: 'Eye',
      color: focusPercentage >= 80 ? 'text-success' : focusPercentage >= 60 ? 'text-warning' : 'text-error',
      bg: focusPercentage >= 80 ? 'bg-success/10' : focusPercentage >= 60 ? 'bg-warning/10' : 'bg-error/10',
      description: 'Candidate attention level'
    },
    {
      id: 'violations',
      label: 'Violations',
      value: violationCount?.toString(),
      icon: 'AlertTriangle',
      color: violationCount === 0 ? 'text-success' : violationCount <= 2 ? 'text-warning' : 'text-error',
      bg: violationCount === 0 ? 'bg-success/10' : violationCount <= 2 ? 'bg-warning/10' : 'bg-error/10',
      description: 'Total rule violations'
    },
    {
      id: 'integrity',
      label: 'Integrity Score',
      value: `${integrityScore}%`,
      icon: 'Shield',
      color: getScoreColor(integrityScore),
      bg: getScoreBg(integrityScore),
      description: 'Overall session integrity'
    },
    {
      id: 'duration',
      label: 'Session Time',
      value: formatDuration(sessionDuration),
      icon: 'Clock',
      color: 'text-accent',
      bg: 'bg-accent/10',
      description: 'Current session duration'
    },
    {
      id: 'accuracy',
      label: 'Detection Accuracy',
      value: `${detectionAccuracy}%`,
      icon: 'Target',
      color: detectionAccuracy >= 95 ? 'text-success' : detectionAccuracy >= 90 ? 'text-warning' : 'text-error',
      bg: detectionAccuracy >= 95 ? 'bg-success/10' : detectionAccuracy >= 90 ? 'bg-warning/10' : 'bg-error/10',
      description: 'AI detection precision'
    },
    {
      id: 'audio',
      label: 'Audio Level',
      value: `${audioLevel}dB`,
      icon: 'Volume2',
      color: audioLevel <= 50 ? 'text-success' : audioLevel <= 70 ? 'text-warning' : 'text-error',
      bg: audioLevel <= 50 ? 'bg-success/10' : audioLevel <= 70 ? 'bg-warning/10' : 'bg-error/10',
      description: 'Background noise level'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">Real-Time Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Updated: {currentTime?.toLocaleTimeString('en-US', { hour12: false })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse-monitoring"></div>
          <span className="text-xs text-success font-medium">Live</span>
        </div>
      </div>
      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics?.map((metric) => (
            <div
              key={metric?.id}
              className={`p-4 rounded-lg border border-border ${metric?.bg} hover:shadow-card transition-shadow duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${metric?.bg} flex items-center justify-center`}>
                  <Icon name={metric?.icon} size={16} className={metric?.color} />
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${metric?.color}`}>
                    {metric?.value}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {metric?.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Focus Tracking</span>
              <span className="text-sm text-muted-foreground">{focusPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  focusPercentage >= 80 ? 'bg-success' : 
                  focusPercentage >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${focusPercentage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Integrity Score</span>
              <span className="text-sm text-muted-foreground">{integrityScore}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(integrityScore)?.replace('text-', 'bg-')}`}
                style={{ width: `${integrityScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Detection Accuracy</span>
              <span className="text-sm text-muted-foreground">{detectionAccuracy}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  detectionAccuracy >= 95 ? 'bg-success' : 
                  detectionAccuracy >= 90 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${detectionAccuracy}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {Math.floor(sessionDuration / 60)}
              </p>
              <p className="text-xs text-muted-foreground">Minutes Active</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {violationCount}
              </p>
              <p className="text-xs text-muted-foreground">Total Violations</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {Math.round(focusPercentage)}%
              </p>
              <p className="text-xs text-muted-foreground">Avg Focus</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {integrityScore}%
              </p>
              <p className="text-xs text-muted-foreground">Final Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;