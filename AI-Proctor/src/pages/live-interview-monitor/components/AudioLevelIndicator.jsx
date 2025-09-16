import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AudioLevelIndicator = ({ 
  currentLevel = 45,
  threshold = 60,
  isEnabled = true,
  onThresholdChange,
  multipleVoicesDetected = false
}) => {
  const [audioHistory, setAudioHistory] = useState([]);
  const [peakLevel, setPeakLevel] = useState(0);

  useEffect(() => {
    // Simulate real-time audio level updates
    const interval = setInterval(() => {
      if (isEnabled) {
        const newLevel = currentLevel + (Math.random() - 0.5) * 10;
        const clampedLevel = Math.max(0, Math.min(100, newLevel));
        
        setAudioHistory(prev => {
          const newHistory = [...prev, clampedLevel]?.slice(-50);
          return newHistory;
        });

        if (clampedLevel > peakLevel) {
          setPeakLevel(clampedLevel);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentLevel, isEnabled, peakLevel]);

  const getAudioLevelColor = (level) => {
    if (level < 30) return 'bg-success';
    if (level < threshold) return 'bg-warning';
    return 'bg-error';
  };

  const getAudioLevelText = (level) => {
    if (level < 30) return 'Low';
    if (level < threshold) return 'Normal';
    return 'High';
  };

  const AudioBar = ({ level, index }) => (
    <div
      className={`w-1 rounded-full transition-all duration-100 ${
        level > (index * 5) ? getAudioLevelColor(level) : 'bg-muted'
      }`}
      style={{ height: `${Math.max(4, (level / 100) * 40)}px` }}
    />
  );

  if (!isEnabled) {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="VolumeX" size={20} />
          <span className="text-sm">Audio monitoring disabled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg ${
            currentLevel < 30 ? 'bg-success/10' :
            currentLevel < threshold ? 'bg-warning/10' : 'bg-error/10'
          } flex items-center justify-center`}>
            <Icon 
              name="Volume2" 
              size={16} 
              className={
                currentLevel < 30 ? 'text-success' :
                currentLevel < threshold ? 'text-warning' : 'text-error'
              }
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Audio Monitor</h3>
            <p className="text-sm text-muted-foreground">
              Background noise detection
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${
            currentLevel < 30 ? 'text-success' :
            currentLevel < threshold ? 'text-warning' : 'text-error'
          }`}>
            {Math.round(currentLevel)}dB
          </p>
          <p className="text-xs text-muted-foreground">
            {getAudioLevelText(currentLevel)}
          </p>
        </div>
      </div>
      {/* Audio Visualizer */}
      <div className="p-4">
        <div className="flex items-end justify-center space-x-1 h-12 mb-4">
          {audioHistory?.slice(-20)?.map((level, index) => (
            <AudioBar key={index} level={level} index={index} />
          ))}
        </div>

        {/* Current Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Level</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-200 ${getAudioLevelColor(currentLevel)}`}
                  style={{ width: `${currentLevel}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground w-12">
                {Math.round(currentLevel)}dB
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Peak Level</span>
            <span className="text-sm font-medium text-foreground">
              {Math.round(peakLevel)}dB
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Threshold</span>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="20"
                max="100"
                value={threshold}
                onChange={(e) => onThresholdChange && onThresholdChange(Number(e?.target?.value))}
                className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground w-12">
                {threshold}dB
              </span>
            </div>
          </div>
        </div>

        {/* Multiple Voices Alert */}
        {multipleVoicesDetected && (
          <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-error" />
              <div>
                <p className="text-sm font-medium text-error">Multiple Voices Detected</p>
                <p className="text-xs text-error/80">
                  Background conversation or additional speakers identified
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded-lg ${
            currentLevel < 30 ? 'bg-success/10 text-success' : 'bg-muted/30 text-muted-foreground'
          }`}>
            <Icon name="Volume1" size={16} className="mx-auto mb-1" />
            <p className="text-xs font-medium">Quiet</p>
          </div>
          <div className={`p-2 rounded-lg ${
            currentLevel >= 30 && currentLevel < threshold ? 'bg-warning/10 text-warning' : 'bg-muted/30 text-muted-foreground'
          }`}>
            <Icon name="Volume2" size={16} className="mx-auto mb-1" />
            <p className="text-xs font-medium">Normal</p>
          </div>
          <div className={`p-2 rounded-lg ${
            currentLevel >= threshold ? 'bg-error/10 text-error' : 'bg-muted/30 text-muted-foreground'
          }`}>
            <Icon name="VolumeX" size={16} className="mx-auto mb-1" />
            <p className="text-xs font-medium">Loud</p>
          </div>
        </div>

        {/* Audio Analysis */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Audio Analysis</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {Math.round((audioHistory?.reduce((a, b) => a + b, 0) / audioHistory?.length) || 0)}dB
              </p>
              <p className="text-xs text-muted-foreground">Average Level</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {audioHistory?.filter(level => level > threshold)?.length}
              </p>
              <p className="text-xs text-muted-foreground">Threshold Violations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLevelIndicator;