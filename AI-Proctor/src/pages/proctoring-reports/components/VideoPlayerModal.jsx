import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayerModal = ({ report, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showViolationMarkers, setShowViolationMarkers] = useState(true);
  const videoRef = useRef(null);

  const violationMarkers = [
    { time: 323, type: 'Focus Loss', severity: 'medium' },
    { time: 765, type: 'Phone Detected', severity: 'high' },
    { time: 1092, type: 'Focus Loss', severity: 'medium' },
    { time: 1533, type: 'Multiple Faces', severity: 'high' },
    { time: 1867, type: 'Books Detected', severity: 'medium' },
    { time: 2325, type: 'No Face', severity: 'high' }
  ];

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (videoRef?.current) {
      const video = videoRef?.current;
      
      const updateTime = () => setCurrentTime(video?.currentTime);
      const updateDuration = () => setDuration(video?.duration);
      
      video?.addEventListener('timeupdate', updateTime);
      video?.addEventListener('loadedmetadata', updateDuration);
      video?.addEventListener('play', () => setIsPlaying(true));
      video?.addEventListener('pause', () => setIsPlaying(false));
      
      return () => {
        video?.removeEventListener('timeupdate', updateTime);
        video?.removeEventListener('loadedmetadata', updateDuration);
        video?.removeEventListener('play', () => setIsPlaying(true));
        video?.removeEventListener('pause', () => setIsPlaying(false));
      };
    }
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const togglePlay = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.play();
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    const time = pos * duration;
    if (videoRef?.current) {
      videoRef.current.currentTime = time;
    }
  };

  const jumpToViolation = (time) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getMarkerColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef?.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Interview Recording</h2>
            <p className="text-sm text-muted-foreground">
              {report?.candidateName} - {report?.date} {report?.time}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowViolationMarkers(!showViolationMarkers)}
              className={showViolationMarkers ? 'text-primary' : 'text-muted-foreground'}
            >
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Violations
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full h-[60vh] object-contain"
            poster="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
            onClick={togglePlay}
          >
            <source src="/mock-interview-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white"
              >
                <Icon name="Play" size={32} />
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative">
              <div
                className="w-full h-2 bg-muted rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                
                {/* Violation Markers */}
                {showViolationMarkers && violationMarkers?.map((marker, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 w-1 h-2 ${getMarkerColor(marker?.severity)} cursor-pointer`}
                    style={{ left: `${(marker?.time / duration) * 100}%` }}
                    onClick={(e) => {
                      e?.stopPropagation();
                      jumpToViolation(marker?.time);
                    }}
                    title={`${marker?.type} at ${formatTime(marker?.time)}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={togglePlay}>
                <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (videoRef?.current) {
                    videoRef.current.currentTime = Math.max(0, currentTime - 10);
                  }
                }}
              >
                <Icon name="RotateCcw" size={16} />
                <span className="ml-1 text-xs">10s</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (videoRef?.current) {
                    videoRef.current.currentTime = Math.min(duration, currentTime + 10);
                  }
                }}
              >
                <Icon name="RotateCw" size={16} />
                <span className="ml-1 text-xs">10s</span>
              </Button>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <Icon name={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} size={16} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Speed Control */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => handleSpeedChange(parseFloat(e?.target?.value))}
                  className="bg-muted border border-border rounded px-2 py-1 text-sm"
                >
                  {speedOptions?.map(speed => (
                    <option key={speed} value={speed}>{speed}x</option>
                  ))}
                </select>
              </div>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (videoRef?.current) {
                    if (videoRef?.current?.requestFullscreen) {
                      videoRef?.current?.requestFullscreen();
                    }
                  }
                }}
              >
                <Icon name="Maximize" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Violation Timeline */}
        {showViolationMarkers && (
          <div className="border-t border-border p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Violation Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {violationMarkers?.map((marker, index) => (
                <button
                  key={index}
                  onClick={() => jumpToViolation(marker?.time)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 text-left"
                >
                  <div className={`w-2 h-2 rounded-full ${getMarkerColor(marker?.severity)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{marker?.type}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(marker?.time)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerModal;