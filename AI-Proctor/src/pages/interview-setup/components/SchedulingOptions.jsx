import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SchedulingOptions = ({ scheduling, onChange, errors }) => {
  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (field, checked) => {
    onChange(field, checked);
  };

  // Get current date and time for minimum values
  const now = new Date();
  const currentDate = now?.toISOString()?.split('T')?.[0];
  const currentTime = now?.toTimeString()?.slice(0, 5);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Scheduling Options</h3>
      </div>
      <div className="space-y-4">
        {/* Session Type */}
        <div className="flex items-center space-x-6">
          <Checkbox
            label="Start Immediately"
            description="Begin interview session right now"
            checked={scheduling?.immediate}
            onChange={(e) => handleCheckboxChange('immediate', e?.target?.checked)}
          />
          
          <Checkbox
            label="Schedule for Later"
            description="Set specific date and time"
            checked={!scheduling?.immediate}
            onChange={(e) => handleCheckboxChange('immediate', !e?.target?.checked)}
          />
        </div>

        {/* Scheduled Session Details */}
        {!scheduling?.immediate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <Input
              label="Interview Date"
              type="date"
              value={scheduling?.date}
              onChange={(e) => handleChange('date', e?.target?.value)}
              min={currentDate}
              error={errors?.date}
              required
            />

            <Input
              label="Interview Time"
              type="time"
              value={scheduling?.time}
              onChange={(e) => handleChange('time', e?.target?.value)}
              error={errors?.time}
              required
            />

            <Select
              label="Timezone"
              options={timezoneOptions}
              value={scheduling?.timezone}
              onChange={(value) => handleChange('timezone', value)}
              error={errors?.timezone}
              required
              searchable
              description="Select candidate's timezone"
            />

            <Input
              label="Buffer Time (minutes)"
              type="number"
              placeholder="15"
              value={scheduling?.bufferTime}
              onChange={(e) => handleChange('bufferTime', e?.target?.value)}
              min="0"
              max="60"
              description="Extra time before interview starts"
            />
          </div>
        )}

        {/* Notification Settings */}
        <div className="border-t border-border pt-4">
          <h4 className="text-md font-medium text-foreground mb-3">Notification Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Send Email Invitation"
              description="Email interview link to candidate"
              checked={scheduling?.sendEmail}
              onChange={(e) => handleCheckboxChange('sendEmail', e?.target?.checked)}
            />

            <Checkbox
              label="SMS Reminder"
              description="Send SMS reminder 30 minutes before"
              checked={scheduling?.smsReminder}
              onChange={(e) => handleCheckboxChange('smsReminder', e?.target?.checked)}
            />

            <Checkbox
              label="Calendar Integration"
              description="Add to interviewer's calendar"
              checked={scheduling?.calendarIntegration}
              onChange={(e) => handleCheckboxChange('calendarIntegration', e?.target?.checked)}
            />

            <Checkbox
              label="Auto-start Session"
              description="Automatically start recording at scheduled time"
              checked={scheduling?.autoStart}
              onChange={(e) => handleCheckboxChange('autoStart', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Session Access */}
        <div className="border-t border-border pt-4">
          <h4 className="text-md font-medium text-foreground mb-3">Session Access</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Session Password"
              type="password"
              placeholder="Optional security password"
              value={scheduling?.sessionPassword}
              onChange={(e) => handleChange('sessionPassword', e?.target?.value)}
              description="Additional security for interview access"
            />

            <Input
              label="Waiting Room Duration (minutes)"
              type="number"
              placeholder="10"
              value={scheduling?.waitingRoom}
              onChange={(e) => handleChange('waitingRoom', e?.target?.value)}
              min="0"
              max="30"
              description="Time candidate waits before interview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingOptions;