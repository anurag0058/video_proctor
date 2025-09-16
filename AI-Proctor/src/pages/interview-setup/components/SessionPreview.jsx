import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionPreview = ({ formData, settings, scheduling, preferences }) => {
  const getEnabledDetections = () => {
    const detections = [];
    if (settings?.focusDetection) detections?.push('Focus Monitoring');
    if (settings?.faceDetection) detections?.push('Face Detection');
    if (settings?.multipleFaceDetection) detections?.push('Multiple Face Detection');
    if (settings?.phoneDetection) detections?.push('Phone Detection');
    if (settings?.paperDetection) detections?.push('Paper Detection');
    if (settings?.deviceDetection) detections?.push('Device Detection');
    if (settings?.drowsinessDetection) detections?.push('Drowsiness Detection');
    if (settings?.audioMonitoring) detections?.push('Audio Monitoring');
    return detections;
  };

  const calculateEstimatedStorage = () => {
    const duration = parseInt(formData?.duration) || 60;
    const quality = preferences?.videoQuality;
    let sizePerMinute = 0;
    
    switch (quality) {
      case '480p': sizePerMinute = 5; break;
      case '720p': sizePerMinute = 10; break;
      case '1080p': sizePerMinute = 20; break;
      default: sizePerMinute = 10;
    }
    
    const totalSize = (duration * sizePerMinute) / 1024; // Convert to GB
    return totalSize?.toFixed(2);
  };

  const getIntegrityScoreRange = () => {
    const detectionCount = getEnabledDetections()?.length;
    if (detectionCount >= 6) return '85-100';
    if (detectionCount >= 4) return '75-95';
    if (detectionCount >= 2) return '65-85';
    return '50-75';
  };

  const formatScheduledTime = () => {
    if (scheduling?.immediate) return 'Immediate Start';
    if (scheduling?.date && scheduling?.time) {
      const date = new Date(`${scheduling.date}T${scheduling.time}`);
      return date?.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Not scheduled';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Eye" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Session Preview</h3>
      </div>
      <div className="space-y-6">
        {/* Candidate Summary */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Candidate Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground font-medium">{formData?.fullName || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Position:</span>
              <span className="text-foreground font-medium">{formData?.position || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground font-medium">{formData?.duration ? `${formData?.duration} minutes` : 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Interview ID:</span>
              <span className="text-foreground font-medium font-mono text-xs">{formData?.interviewId}</span>
            </div>
          </div>
        </div>

        {/* Detection Configuration */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Active Detections</h4>
          <div className="flex flex-wrap gap-2">
            {getEnabledDetections()?.map((detection, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
              >
                {detection}
              </span>
            ))}
            {getEnabledDetections()?.length === 0 && (
              <span className="text-muted-foreground text-sm">No detections enabled</span>
            )}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Sensitivity: <span className="capitalize font-medium">{settings?.sensitivity}</span>
          </div>
        </div>

        {/* Scheduling Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Schedule</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Time:</span>
              <span className="text-foreground font-medium">{formatScheduledTime()}</span>
            </div>
            {!scheduling?.immediate && scheduling?.timezone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timezone:</span>
                <span className="text-foreground font-medium">{scheduling?.timezone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Invitation:</span>
              <span className={`font-medium ${scheduling?.sendEmail ? 'text-success' : 'text-muted-foreground'}`}>
                {scheduling?.sendEmail ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Recording Settings */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Recording Configuration</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Video Recording:</span>
              <span className={`font-medium ${preferences?.enableRecording ? 'text-success' : 'text-muted-foreground'}`}>
                {preferences?.enableRecording ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            {preferences?.enableRecording && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="text-foreground font-medium">{preferences?.videoQuality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Size:</span>
                  <span className="text-foreground font-medium">{calculateEstimatedStorage()} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage Duration:</span>
                  <span className="text-foreground font-medium">
                    {preferences?.storageDuration === 'permanent' ? 'Permanent' : `${preferences?.storageDuration} days`}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Estimated Metrics */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-accent" />
            Estimated Session Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-card rounded border">
              <div className="text-2xl font-bold text-accent">{getIntegrityScoreRange()}</div>
              <div className="text-muted-foreground">Integrity Score Range</div>
            </div>
            <div className="text-center p-3 bg-card rounded border">
              <div className="text-2xl font-bold text-primary">{getEnabledDetections()?.length}</div>
              <div className="text-muted-foreground">Active Detections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPreview;