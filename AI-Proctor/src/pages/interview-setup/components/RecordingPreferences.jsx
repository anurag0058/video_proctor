import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RecordingPreferences = ({ preferences, onChange, errors }) => {
  const qualityOptions = [
    { value: '720p', label: '720p HD - Standard Quality' },
    { value: '1080p', label: '1080p Full HD - High Quality' },
    { value: '480p', label: '480p - Lower Quality (saves storage)' }
  ];

  const storageOptions = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '6 months' },
    { value: '365', label: '1 year' },
    { value: 'permanent', label: 'Permanent storage' }
  ];

  const formatOptions = [
    { value: 'mp4', label: 'MP4 - Standard video format' },
    { value: 'webm', label: 'WebM - Web optimized format' },
    { value: 'avi', label: 'AVI - High compatibility format' }
  ];

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (field, checked) => {
    onChange(field, checked);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Video" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Recording Preferences</h3>
      </div>
      <div className="space-y-6">
        {/* Basic Recording Settings */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Video Recording</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Enable Video Recording"
              description="Record the entire interview session"
              checked={preferences?.enableRecording}
              onChange={(e) => handleCheckboxChange('enableRecording', e?.target?.checked)}
            />

            <Select
              label="Video Quality"
              options={qualityOptions}
              value={preferences?.videoQuality}
              onChange={(value) => handleChange('videoQuality', value)}
              disabled={!preferences?.enableRecording}
              description="Higher quality uses more storage"
            />

            <Select
              label="Video Format"
              options={formatOptions}
              value={preferences?.videoFormat}
              onChange={(value) => handleChange('videoFormat', value)}
              disabled={!preferences?.enableRecording}
              description="Choose based on compatibility needs"
            />

            <Checkbox
              label="Record Audio"
              description="Include audio in recording"
              checked={preferences?.recordAudio}
              onChange={(e) => handleCheckboxChange('recordAudio', e?.target?.checked)}
              disabled={!preferences?.enableRecording}
            />
          </div>
        </div>

        {/* Storage Settings */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Storage & Retention</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Storage Duration"
              options={storageOptions}
              value={preferences?.storageDuration}
              onChange={(value) => handleChange('storageDuration', value)}
              description="How long to keep recordings"
            />

            <Checkbox
              label="Cloud Backup"
              description="Backup recordings to cloud storage"
              checked={preferences?.cloudBackup}
              onChange={(e) => handleCheckboxChange('cloudBackup', e?.target?.checked)}
            />

            <Checkbox
              label="Automatic Deletion"
              description="Auto-delete after retention period"
              checked={preferences?.autoDelete}
              onChange={(e) => handleCheckboxChange('autoDelete', e?.target?.checked)}
            />

            <Input
              label="Max File Size (GB)"
              type="number"
              placeholder="5"
              value={preferences?.maxFileSize}
              onChange={(e) => handleChange('maxFileSize', e?.target?.value)}
              min="1"
              max="50"
              description="Maximum recording file size"
            />
          </div>
        </div>

        {/* Screen Recording */}
        <div className="border-b border-border pb-4">
          <h4 className="text-md font-medium text-foreground mb-3">Screen Recording</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Record Candidate Screen"
              description="Capture candidate's screen activity"
              checked={preferences?.screenRecording}
              onChange={(e) => handleCheckboxChange('screenRecording', e?.target?.checked)}
            />

            <Checkbox
              label="Record Interviewer Screen"
              description="Capture interviewer's screen for reference"
              checked={preferences?.interviewerScreen}
              onChange={(e) => handleCheckboxChange('interviewerScreen', e?.target?.checked)}
            />

            <Input
              label="Screen Recording FPS"
              type="number"
              placeholder="15"
              value={preferences?.screenFPS}
              onChange={(e) => handleChange('screenFPS', e?.target?.value)}
              min="5"
              max="30"
              disabled={!preferences?.screenRecording}
              description="Frames per second for screen capture"
            />
          </div>
        </div>

        {/* Report Generation */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-3">Automatic Reports</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Generate Proctoring Report"
              description="Auto-generate integrity report after interview"
              checked={preferences?.generateReport}
              onChange={(e) => handleCheckboxChange('generateReport', e?.target?.checked)}
            />

            <Checkbox
              label="Email Report to Interviewer"
              description="Send report via email when ready"
              checked={preferences?.emailReport}
              onChange={(e) => handleCheckboxChange('emailReport', e?.target?.checked)}
              disabled={!preferences?.generateReport}
            />

            <Checkbox
              label="Include Video Highlights"
              description="Add key moments to the report"
              checked={preferences?.videoHighlights}
              onChange={(e) => handleCheckboxChange('videoHighlights', e?.target?.checked)}
              disabled={!preferences?.generateReport}
            />

            <Checkbox
              label="Export to PDF"
              description="Generate PDF version of the report"
              checked={preferences?.pdfExport}
              onChange={(e) => handleCheckboxChange('pdfExport', e?.target?.checked)}
              disabled={!preferences?.generateReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingPreferences;