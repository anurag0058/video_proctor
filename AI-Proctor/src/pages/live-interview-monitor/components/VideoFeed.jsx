import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoFeed = ({ 
  isRecording, 
  onToggleRecording, 
  onTakeScreenshot, 
  onEndSession,
  detectionOverlays = [],
  candidateName = "John Smith"
}) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices?.getUserMedia({ 
          video: { width: 1280, height: 720 }, 
          audio: true 
        });
        setStream(mediaStream);
        if (videoRef?.current) {
          videoRef.current.srcObject = mediaStream;
          setIsVideoLoaded(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startVideo();

    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, []);

  const handleEndSession = () => {
    setShowEndDialog(true);
  };

  const confirmEndSession = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
    }
    onEndSession();
    setShowEndDialog(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Video Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse-monitoring"></div>
          <div>
            <h3 className="font-semibold text-foreground">Live Interview Feed</h3>
            <p className="text-sm text-muted-foreground">Candidate: {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            1280x720 • 30fps
          </span>
          {isRecording && (
            <div className="flex items-center space-x-1 text-error text-xs">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
              <span>REC</span>
            </div>
          )}
        </div>
      </div>
      {/* Video Container */}
      <div className="relative aspect-video bg-slate-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        />
        
        {/* Loading Overlay */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center text-white">
              <Icon name="Camera" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Connecting to camera...</p>
              <p className="text-sm opacity-75 mt-1">Please allow camera access</p>
            </div>
          </div>
        )}

        {/* Detection Overlays */}
        {detectionOverlays?.map((overlay, index) => (
          <div
            key={index}
            className={`absolute border-2 ${
              overlay?.type === 'face' ? 'border-success' :
              overlay?.type === 'object' ? 'border-error' :
              overlay?.type === 'focus' ? 'border-warning' : 'border-accent'
            }`}
            style={{
              left: `${overlay?.x}%`,
              top: `${overlay?.y}%`,
              width: `${overlay?.width}%`,
              height: `${overlay?.height}%`
            }}
          >
            <div className={`absolute -top-6 left-0 px-2 py-1 text-xs font-medium rounded ${
              overlay?.type === 'face' ? 'bg-success text-success-foreground' :
              overlay?.type === 'object' ? 'bg-error text-error-foreground' :
              overlay?.type === 'focus' ? 'bg-warning text-warning-foreground' : 'bg-accent text-accent-foreground'
            }`}>
              {overlay?.label}
            </div>
          </div>
        ))}

        {/* No Video Fallback */}
        {isVideoLoaded && !stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center text-white">
              <Icon name="CameraOff" size={48} className="mx-auto mb-4 text-error" />
              <p className="text-lg font-medium">Camera not available</p>
              <p className="text-sm opacity-75 mt-1">Please check camera permissions</p>
            </div>
          </div>
        )}
      </div>
      {/* Video Controls */}
      <div className="flex items-center justify-between p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={onToggleRecording}
            iconName={isRecording ? "Square" : "Circle"}
            iconPosition="left"
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onTakeScreenshot}
            iconName="Camera"
            iconPosition="left"
          >
            Screenshot
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize2"
            iconPosition="left"
          >
            Fullscreen
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndSession}
            iconName="PhoneOff"
            iconPosition="left"
          >
            End Session
          </Button>
        </div>
      </div>
      {/* End Session Confirmation Dialog */}
      {showEndDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">End Interview Session</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to end the interview session? All recording will be stopped and the session will be terminated.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEndDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmEndSession}
                className="flex-1"
              >
                End Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;