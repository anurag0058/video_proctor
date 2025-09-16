import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CandidateInfoForm = ({ formData, onChange, errors }) => {
  const positionOptions = [
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'qa-engineer', label: 'QA Engineer' },
    { value: 'business-analyst', label: 'Business Analyst' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '150', label: '2.5 hours' },
    { value: '180', label: '3 hours' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Candidate Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter candidate's full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          className="mb-4"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="candidate@company.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          className="mb-4"
        />

        <Select
          label="Position"
          placeholder="Select position"
          options={positionOptions}
          value={formData?.position}
          onChange={(value) => handleInputChange('position', value)}
          error={errors?.position}
          required
          searchable
          className="mb-4"
        />

        <Select
          label="Interview Duration"
          placeholder="Select duration"
          options={durationOptions}
          value={formData?.duration}
          onChange={(value) => handleInputChange('duration', value)}
          error={errors?.duration}
          required
          className="mb-4"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          className="mb-4"
        />

        <Input
          label="Interview ID"
          type="text"
          placeholder="Auto-generated"
          value={formData?.interviewId}
          disabled
          description="Unique identifier for this interview session"
          className="mb-4"
        />
      </div>
      <div className="mt-4">
        <Input
          label="Additional Notes"
          type="text"
          placeholder="Any special instructions or requirements..."
          value={formData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          description="Optional notes for the interviewer"
          className="mb-0"
        />
      </div>
    </div>
  );
};

export default CandidateInfoForm;