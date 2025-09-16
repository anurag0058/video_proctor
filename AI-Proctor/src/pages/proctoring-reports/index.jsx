import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportFilters from './components/ReportFilters';
import SummaryCards from './components/SummaryCards';
import ReportsTable from './components/ReportsTable';
import DetailedReportModal from './components/DetailedReportModal';
import VideoPlayerModal from './components/VideoPlayerModal';

const ProctoringReports = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    integrityScore: 'all',
    violationType: 'all',
    searchTerm: '',
    startDate: '',
    endDate: ''
  });
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [resultsCount, setResultsCount] = useState(1247);

  useEffect(() => {
    document.title = 'Proctoring Reports - AI-Proctor';
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Mock filtering logic - in real app, this would filter the data
    let mockCount = 1247;
    if (newFilters?.searchTerm) mockCount = Math.floor(mockCount * 0.3);
    if (newFilters?.integrityScore !== 'all') mockCount = Math.floor(mockCount * 0.6);
    if (newFilters?.violationType !== 'all') mockCount = Math.floor(mockCount * 0.4);
    setResultsCount(mockCount);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const handleExportPDF = async (report) => {
    setIsExporting(true);
    // Mock PDF export
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `proctoring-report-${report?.id}.pdf`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      setIsExporting(false);
    }, 2000);
  };

  const handlePlayVideo = (report) => {
    setSelectedReport(report);
    setIsVideoModalOpen(true);
  };

  const handleBulkExport = () => {
    setIsExporting(true);
    // Mock bulk export
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'proctoring-reports-bulk.csv';
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      setIsExporting(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="space-y-2 mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground">Proctoring Reports</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of completed interview sessions with detailed integrity assessments
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleBulkExport}
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
              >
                Export All
              </Button>
              
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
              >
                Generate Report
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Filters */}
          <ReportFilters 
            onFiltersChange={handleFiltersChange}
            resultsCount={resultsCount}
          />

          {/* Reports Table */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Interview Reports</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
            </div>

            <ReportsTable
              onViewReport={handleViewReport}
              onExportPDF={handleExportPDF}
              onPlayVideo={handlePlayVideo}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 p-4 bg-card border border-border rounded-lg">
            <div className="text-sm text-muted-foreground">
              Showing 1-20 of {resultsCount} results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronLeft" size={16} />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                <Button variant="default" size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <span className="px-2 text-muted-foreground">...</span>
                <Button variant="ghost" size="sm">62</Button>
              </div>
              <Button variant="outline" size="sm">
                Next
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <DetailedReportModal
        report={selectedReport}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedReport(null);
        }}
      />
      <VideoPlayerModal
        report={selectedReport}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedReport(null);
        }}
      />
      {/* Loading Overlay */}
      {isExporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 shadow-modal">
            <div className="flex items-center space-x-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Exporting Reports</p>
                <p className="text-sm text-muted-foreground">Please wait while we prepare your files...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProctoringReports;