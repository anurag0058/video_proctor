import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetectionSettings = ({ 
  onSettingsChange,
  initialSettings = {
    focusThreshold: 5,
    faceAbsenceThreshold: 10,
    objectDetectionSensitivity: 75,
    audioDetectionEnabled: true,
    multiplePersonDetection: true,
    eyeClosureDetection: false,
    backgroundAudioDetection: false
  }
}) => {
  const [settings, setSettings] = useState(initialSettings);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    onSettingsChange(settings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setSettings(initialSettings);
    setHasChanges(false);
  };

  const SliderInput = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = "" }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-muted-foreground">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e?.target?.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  const ToggleSwitch = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6"
          >
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={16} 
            />
          </Button>
          <div>
            <h3 className="font-semibold text-foreground">Detection Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure AI detection parameters
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <div className="w-2 h-2 bg-warning rounded-full"></div>
          )}
          <Icon name="Settings" size={16} className="text-muted-foreground" />
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Timing Thresholds */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Timing Thresholds</span>
            </h4>
            
            <SliderInput
              label="Focus Loss Alert (seconds)"
              value={settings?.focusThreshold}
              onChange={(value) => handleSettingChange('focusThreshold', value)}
              min={1}
              max={30}
              unit="s"
            />
            
            <SliderInput
              label="Face Absence Alert (seconds)"
              value={settings?.faceAbsenceThreshold}
              onChange={(value) => handleSettingChange('faceAbsenceThreshold', value)}
              min={1}
              max={60}
              unit="s"
            />
          </div>

          {/* Detection Sensitivity */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Target" size={16} />
              <span>Detection Sensitivity</span>
            </h4>
            
            <SliderInput
              label="Object Detection Sensitivity"
              value={settings?.objectDetectionSensitivity}
              onChange={(value) => handleSettingChange('objectDetectionSensitivity', value)}
              min={10}
              max={100}
              unit="%"
            />
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="ToggleLeft" size={16} />
              <span>Detection Features</span>
            </h4>
            
            <div className="space-y-3">
              <ToggleSwitch
                label="Audio Detection"
                description="Monitor background audio and multiple voices"
                checked={settings?.audioDetectionEnabled}
                onChange={(value) => handleSettingChange('audioDetectionEnabled', value)}
              />
              
              <ToggleSwitch
                label="Multiple Person Detection"
                description="Alert when multiple faces are detected"
                checked={settings?.multiplePersonDetection}
                onChange={(value) => handleSettingChange('multiplePersonDetection', value)}
              />
              
              <ToggleSwitch
                label="Eye Closure Detection"
                description="Monitor for drowsiness and extended eye closure"
                checked={settings?.eyeClosureDetection}
                onChange={(value) => handleSettingChange('eyeClosureDetection', value)}
              />
              
              <ToggleSwitch
                label="Background Audio Analysis"
                description="Advanced audio processing for conversation detection"
                checked={settings?.backgroundAudioDetection}
                onChange={(value) => handleSettingChange('backgroundAudioDetection', value)}
              />
            </div>
          </div>

          {/* Preset Configurations */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Layers" size={16} />
              <span>Quick Presets</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const strictSettings = {
                    focusThreshold: 3,
                    faceAbsenceThreshold: 5,
                    objectDetectionSensitivity: 90,
                    audioDetectionEnabled: true,
                    multiplePersonDetection: true,
                    eyeClosureDetection: true,
                    backgroundAudioDetection: true
                  };
                  setSettings(strictSettings);
                  setHasChanges(true);
                }}
                className="justify-start"
              >
                <Icon name="Shield" size={14} className="mr-2" />
                Strict Mode
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const balancedSettings = {
                    focusThreshold: 5,
                    faceAbsenceThreshold: 10,
                    objectDetectionSensitivity: 75,
                    audioDetectionEnabled: true,
                    multiplePersonDetection: true,
                    eyeClosureDetection: false,
                    backgroundAudioDetection: false
                  };
                  setSettings(balancedSettings);
                  setHasChanges(true);
                }}
                className="justify-start"
              >
                <Icon name="Scale" size={14} className="mr-2" />
                Balanced
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const lenientSettings = {
                    focusThreshold: 10,
                    faceAbsenceThreshold: 20,
                    objectDetectionSensitivity: 50,
                    audioDetectionEnabled: false,
                    multiplePersonDetection: false,
                    eyeClosureDetection: false,
                    backgroundAudioDetection: false
                  };
                  setSettings(lenientSettings);
                  setHasChanges(true);
                }}
                className="justify-start"
              >
                <Icon name="Heart" size={14} className="mr-2" />
                Lenient
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          {hasChanges && (
            <div className="flex space-x-3 pt-4 border-t border-border">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveSettings}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Save Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetSettings}
                iconName="RotateCcw"
                iconPosition="left"
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetectionSettings;