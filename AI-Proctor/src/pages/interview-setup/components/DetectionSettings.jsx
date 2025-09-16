import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DetectionSettings = ({ settings, onChange, errors }) => {
  const sensitivityOptions = [
    { value: 'low', label: 'Low - Less strict detection' },
    { value: 'medium', label: 'Medium - Balanced detection' },
    { value: 'high', label: 'High - Strict detection' }
  ];

  const handleSettingChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (field, checked) => {
    onChange(field, checked);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Detection Configuration</h3>
      </div>
      <div className="space-y-6">
        {/* Focus Monitoring */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Focus Monitoring</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Enable Focus Detection"
              description="Monitor when candidate looks away from screen"
              checked={settings?.focusDetection}
              onChange={(e) => handleCheckboxChange('focusDetection', e?.target?.checked)}
            />
            
            <Input
              label="Alert Threshold (seconds)"
              type="number"
              placeholder="5"
              value={settings?.focusThreshold}
              onChange={(e) => handleSettingChange('focusThreshold', e?.target?.value)}
              min="1"
              max="30"
              disabled={!settings?.focusDetection}
              description="Trigger alert after this duration"
            />
          </div>
        </div>

        {/* Face Detection */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Face Detection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Face Presence Detection"
              description="Alert when no face is detected"
              checked={settings?.faceDetection}
              onChange={(e) => handleCheckboxChange('faceDetection', e?.target?.checked)}
            />
            
            <Input
              label="No Face Alert (seconds)"
              type="number"
              placeholder="10"
              value={settings?.faceThreshold}
              onChange={(e) => handleSettingChange('faceThreshold', e?.target?.value)}
              min="5"
              max="60"
              disabled={!settings?.faceDetection}
              description="Alert when face absent for this duration"
            />

            <Checkbox
              label="Multiple Face Detection"
              description="Detect multiple people in frame"
              checked={settings?.multipleFaceDetection}
              onChange={(e) => handleCheckboxChange('multipleFaceDetection', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Object Detection */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Unauthorized Object Detection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Mobile Phone Detection"
              description="Detect mobile phones in video frame"
              checked={settings?.phoneDetection}
              onChange={(e) => handleCheckboxChange('phoneDetection', e?.target?.checked)}
            />
            
            <Checkbox
              label="Book/Paper Detection"
              description="Detect books and paper materials"
              checked={settings?.paperDetection}
              onChange={(e) => handleCheckboxChange('paperDetection', e?.target?.checked)}
            />

            <Checkbox
              label="Electronic Device Detection"
              description="Detect laptops, tablets, and other devices"
              checked={settings?.deviceDetection}
              onChange={(e) => handleCheckboxChange('deviceDetection', e?.target?.checked)}
            />

            <Select
              label="Detection Sensitivity"
              options={sensitivityOptions}
              value={settings?.sensitivity}
              onChange={(value) => handleSettingChange('sensitivity', value)}
              description="Adjust detection accuracy vs false positives"
            />
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-3">Advanced Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Drowsiness Detection"
              description="Monitor eye closure and alertness"
              checked={settings?.drowsinessDetection}
              onChange={(e) => handleCheckboxChange('drowsinessDetection', e?.target?.checked)}
            />
            
            <Checkbox
              label="Background Audio Monitoring"
              description="Detect multiple voices in background"
              checked={settings?.audioMonitoring}
              onChange={(e) => handleCheckboxChange('audioMonitoring', e?.target?.checked)}
            />

            <Checkbox
              label="Real-time Alerts"
              description="Show live detection alerts to interviewer"
              checked={settings?.realtimeAlerts}
              onChange={(e) => handleCheckboxChange('realtimeAlerts', e?.target?.checked)}
            />

            <Checkbox
              label="Auto-pause on Violations"
              description="Automatically pause interview on major violations"
              checked={settings?.autoPause}
              onChange={(e) => handleCheckboxChange('autoPause', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionSettings;