import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedReportModal = ({ report, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !report) return null;

  const violationTimeline = [
    { time: '00:05:23', type: 'Focus Loss', description: 'Candidate looked away from screen for 8 seconds', severity: 'medium' },
    { time: '00:12:45', type: 'Phone Detected', description: 'Mobile device detected in video frame', severity: 'high' },
    { time: '00:18:12', type: 'Focus Loss', description: 'Candidate looked away from screen for 6 seconds', severity: 'medium' },
    { time: '00:25:33', type: 'Multiple Faces', description: 'Additional person detected in background', severity: 'high' },
    { time: '00:31:07', type: 'Books Detected', description: 'Reference material detected on desk', severity: 'medium' },
    { time: '00:38:45', type: 'No Face', description: 'No face detected for 12 seconds', severity: 'high' }
  ];

  const focusStatistics = {
    totalFocusTime: '41:23',
    focusLossEvents: 8,
    averageFocusLossDuration: '7.2 seconds',
    longestFocusLoss: '15 seconds',
    focusPercentage: 89.4
  };

  const integrityBreakdown = {
    baseScore: 100,
    deductions: [
      { reason: 'Focus Loss Events (8)', points: -8 },
      { reason: 'Phone Detection (1)', points: -5 },
      { reason: 'Multiple Faces (1)', points: -3 },
      { reason: 'Reference Material (1)', points: -2 }
    ],
    finalScore: 82
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'focus', label: 'Focus Analysis', icon: 'Eye' },
    { id: 'scoring', label: 'Scoring', icon: 'Calculator' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'AlertTriangle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Detailed Report</h2>
            <p className="text-sm text-muted-foreground">
              {report?.candidateName} - {report?.position} - {report?.date}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Candidate Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium text-foreground">{report?.candidateName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium text-foreground">{report?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Position:</span>
                      <span className="font-medium text-foreground">{report?.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interviewer:</span>
                      <span className="font-medium text-foreground">{report?.interviewer}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Session Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium text-foreground">{report?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Time:</span>
                      <span className="font-medium text-foreground">{report?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">{report?.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{report?.integrityScore}%</div>
                  <div className="text-sm text-muted-foreground">Integrity Score</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{report?.violationCount}</div>
                  <div className="text-sm text-muted-foreground">Total Violations</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">89.4%</div>
                  <div className="text-sm text-muted-foreground">Focus Time</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-sm text-muted-foreground">Focus Loss Events</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Violation Timeline</h3>
              <div className="space-y-4">
                {violationTimeline?.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className={`p-2 rounded-lg ${getSeverityColor(event?.severity)}`}>
                      <Icon name={getSeverityIcon(event?.severity)} size={16} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{event?.type}</h4>
                        <span className="text-sm text-muted-foreground">{event?.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'focus' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Focus Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Focus Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Focus Time:</span>
                      <span className="font-medium text-foreground">{focusStatistics?.totalFocusTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Focus Loss Events:</span>
                      <span className="font-medium text-foreground">{focusStatistics?.focusLossEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Loss Duration:</span>
                      <span className="font-medium text-foreground">{focusStatistics?.averageFocusLossDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Longest Focus Loss:</span>
                      <span className="font-medium text-foreground">{focusStatistics?.longestFocusLoss}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Focus Percentage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Focus Time</span>
                      <span>{focusStatistics?.focusPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: `${focusStatistics?.focusPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Integrity Score Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium text-foreground">Base Score</span>
                  <span className="text-lg font-bold text-success">+{integrityBreakdown?.baseScore}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Deductions</h4>
                  {integrityBreakdown?.deductions?.map((deduction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-error/5 rounded-lg">
                      <span className="text-muted-foreground">{deduction?.reason}</span>
                      <span className="font-medium text-error">{deduction?.points}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                    <span className="text-lg font-semibold text-foreground">Final Integrity Score</span>
                    <span className="text-2xl font-bold text-primary">{integrityBreakdown?.finalScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Report generated on {new Date()?.toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => window.print()}>
              <Icon name="Printer" size={16} className="mr-2" />
              Print Report
            </Button>
            <Button variant="default">
              <Icon name="Download" size={16} className="mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReportModal;