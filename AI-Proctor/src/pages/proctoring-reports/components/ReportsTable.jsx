import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportsTable = ({ onViewReport, onExportPDF, onPlayVideo }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  const reportsData = [
    {
      id: "INT-2024-001",
      candidateName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      position: "Senior Frontend Developer",
      date: "2024-09-14",
      time: "14:30",
      duration: "45:23",
      integrityScore: 94,
      violationCount: 2,
      violations: ["Focus Loss (1)", "Phone Detected (1)"],
      status: "completed",
      interviewer: "John Smith"
    },
    {
      id: "INT-2024-002",
      candidateName: "Michael Chen",
      email: "michael.chen@email.com",
      position: "Backend Developer",
      date: "2024-09-14",
      time: "10:15",
      duration: "52:17",
      integrityScore: 87,
      violationCount: 4,
      violations: ["Focus Loss (2)", "Multiple Faces (1)", "Books Detected (1)"],
      status: "completed",
      interviewer: "Emily Davis"
    },
    {
      id: "INT-2024-003",
      candidateName: "Jessica Rodriguez",
      email: "jessica.rodriguez@email.com",
      position: "UI/UX Designer",
      date: "2024-09-13",
      time: "16:45",
      duration: "38:42",
      integrityScore: 96,
      violationCount: 1,
      violations: ["Focus Loss (1)"],
      status: "completed",
      interviewer: "David Wilson"
    },
    {
      id: "INT-2024-004",
      candidateName: "Robert Thompson",
      email: "robert.thompson@email.com",
      position: "Full Stack Developer",
      date: "2024-09-13",
      time: "11:20",
      duration: "47:55",
      integrityScore: 78,
      violationCount: 6,
      violations: ["Focus Loss (3)", "Phone Detected (2)", "No Face (1)"],
      status: "completed",
      interviewer: "Lisa Anderson"
    },
    {
      id: "INT-2024-005",
      candidateName: "Amanda Williams",
      email: "amanda.williams@email.com",
      position: "Product Manager",
      date: "2024-09-12",
      time: "15:10",
      duration: "41:33",
      integrityScore: 91,
      violationCount: 3,
      violations: ["Focus Loss (2)", "Books Detected (1)"],
      status: "completed",
      interviewer: "Mark Johnson"
    },
    {
      id: "INT-2024-006",
      candidateName: "Daniel Kim",
      email: "daniel.kim@email.com",
      position: "DevOps Engineer",
      date: "2024-09-12",
      time: "09:30",
      duration: "55:18",
      integrityScore: 85,
      violationCount: 5,
      violations: ["Focus Loss (2)", "Multiple Faces (2)", "Phone Detected (1)"],
      status: "completed",
      interviewer: "Sarah Brown"
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const sortedData = [...reportsData];
    sortedData?.sort((a, b) => {
      if (sortConfig?.key === 'integrityScore' || sortConfig?.key === 'violationCount') {
        const aVal = a?.[sortConfig?.key];
        const bVal = b?.[sortConfig?.key];
        return sortConfig?.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aVal = a?.[sortConfig?.key];
      const bVal = b?.[sortConfig?.key];
      
      if (aVal < bVal) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  const getIntegrityScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getIntegrityScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 75) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground/50" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('candidateName')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Candidate</span>
                  <SortIcon column="candidateName" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Date & Time</span>
                  <SortIcon column="date" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Duration</span>
                  <SortIcon column="duration" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('integrityScore')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Integrity Score</span>
                  <SortIcon column="integrityScore" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('violationCount')}
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <span>Violations</span>
                  <SortIcon column="violationCount" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getSortedData()?.map((report) => (
              <tr key={report?.id} className="border-b border-border hover:bg-muted/30">
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{report?.candidateName}</p>
                    <p className="text-sm text-muted-foreground">{report?.email}</p>
                    <p className="text-xs text-muted-foreground">{report?.position}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{report?.date}</p>
                    <p className="text-sm text-muted-foreground">{report?.time}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-foreground">{report?.duration}</span>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getIntegrityScoreBg(report?.integrityScore)} ${getIntegrityScoreColor(report?.integrityScore)}`}>
                    {report?.integrityScore}%
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        report?.violationCount === 0 ? 'bg-success/10 text-success' :
                        report?.violationCount <= 3 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                      }`}>
                        {report?.violationCount} violations
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {report?.violations?.slice(0, 2)?.join(', ')}
                      {report?.violations?.length > 2 && '...'}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReport(report)}
                      iconName="Eye"
                      iconSize={14}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onExportPDF(report)}
                      iconName="Download"
                      iconSize={14}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPlayVideo(report)}
                      iconName="Play"
                      iconSize={14}
                    >
                      Video
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {getSortedData()?.map((report) => (
          <div key={report?.id} className="bg-muted/30 rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{report?.candidateName}</h3>
                <p className="text-sm text-muted-foreground">{report?.email}</p>
                <p className="text-xs text-muted-foreground">{report?.position}</p>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getIntegrityScoreBg(report?.integrityScore)} ${getIntegrityScoreColor(report?.integrityScore)}`}>
                {report?.integrityScore}%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">{report?.date} {report?.time}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">{report?.duration}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Violations</p>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  report?.violationCount === 0 ? 'bg-success/10 text-success' :
                  report?.violationCount <= 3 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                }`}>
                  {report?.violationCount} total
                </span>
                {report?.violations?.slice(0, 2)?.map((violation, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                    {violation}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewReport(report)}
                iconName="Eye"
                iconSize={14}
                className="flex-1"
              >
                View Report
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onExportPDF(report)}
                iconName="Download"
                iconSize={14}
              >
                PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPlayVideo(report)}
                iconName="Play"
                iconSize={14}
              >
                Video
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTable;