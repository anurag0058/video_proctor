import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SummaryCard from './components/SummaryCard';
import InterviewTable from './components/InterviewTable';
import UpcomingInterviews from './components/UpcomingInterviews';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import FilterControls from './components/FilterControls';
import Button from '../../components/ui/Button';


const InterviewDashboard = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'today',
    sortBy: 'startTime'
  });

  // Mock data for interviews
  const mockInterviews = [
    {
      id: 'INT-001',
      candidateName: 'Sarah Johnson',
      position: 'Frontend Developer',
      startTime: '2025-01-15T09:00:00Z',
      duration: 45,
      status: 'active',
      integrityScore: 92,
      alertCount: 1,
      interviewer: 'John Smith'
    },
    {
      id: 'INT-002',
      candidateName: 'Michael Chen',
      position: 'Backend Developer',
      startTime: '2025-01-15T10:30:00Z',
      duration: 60,
      status: 'completed',
      integrityScore: 88,
      alertCount: 3,
      interviewer: 'Emily Davis'
    },
    {
      id: 'INT-003',
      candidateName: 'Jessica Rodriguez',
      position: 'Full Stack Developer',
      startTime: '2025-01-15T14:00:00Z',
      duration: 0,
      status: 'scheduled',
      integrityScore: 0,
      alertCount: 0,
      interviewer: 'David Wilson'
    },
    {
      id: 'INT-004',
      candidateName: 'Alex Thompson',
      position: 'DevOps Engineer',
      startTime: '2025-01-15T11:15:00Z',
      duration: 55,
      status: 'completed',
      integrityScore: 95,
      alertCount: 0,
      interviewer: 'Sarah Lee'
    },
    {
      id: 'INT-005',
      candidateName: 'Maria Garcia',
      position: 'UI/UX Designer',
      startTime: '2025-01-15T15:30:00Z',
      duration: 0,
      status: 'scheduled',
      integrityScore: 0,
      alertCount: 0,
      interviewer: 'Mike Johnson'
    }
  ];

  // Mock data for upcoming interviews
  const mockUpcomingInterviews = [
    {
      id: 'INT-003',
      candidateName: 'Jessica Rodriguez',
      position: 'Full Stack Developer',
      startTime: '2025-01-15T14:00:00Z',
      interviewer: 'David Wilson',
      isUrgent: false,
      notes: 'Technical interview focusing on React and Node.js'
    },
    {
      id: 'INT-005',
      candidateName: 'Maria Garcia',
      position: 'UI/UX Designer',
      startTime: '2025-01-15T15:30:00Z',
      interviewer: 'Mike Johnson',
      isUrgent: true,
      notes: 'Portfolio review and design thinking assessment'
    },
    {
      id: 'INT-006',
      candidateName: 'Robert Kim',
      position: 'Data Scientist',
      startTime: '2025-01-15T16:45:00Z',
      interviewer: 'Lisa Chen',
      isUrgent: false,
      notes: null
    }
  ];

  // Mock data for recent activities
  const mockRecentActivities = [
    {
      id: 'ACT-001',
      type: 'interview_completed',
      title: 'Interview Completed',
      description: 'Michael Chen completed technical interview with 88% integrity score',
      timestamp: '2025-01-15T11:30:00Z',
      metadata: {
        candidate: 'Michael Chen',
        session: 'INT-002',
        score: 88
      }
    },
    {
      id: 'ACT-002',
      type: 'alert_triggered',
      title: 'Suspicious Activity Detected',
      description: 'Multiple face detection alert triggered during active session',
      timestamp: '2025-01-15T09:15:00Z',
      metadata: {
        candidate: 'Sarah Johnson',
        session: 'INT-001'
      }
    },
    {
      id: 'ACT-003',
      type: 'interview_started',
      title: 'Interview Started',
      description: 'Sarah Johnson joined the interview session',
      timestamp: '2025-01-15T09:00:00Z',
      metadata: {
        candidate: 'Sarah Johnson',
        session: 'INT-001'
      }
    },
    {
      id: 'ACT-004',
      type: 'candidate_joined',
      title: 'Candidate Joined',
      description: 'New candidate registered for upcoming interview',
      timestamp: '2025-01-15T08:45:00Z',
      metadata: {
        candidate: 'Robert Kim'
      }
    },
    {
      id: 'ACT-005',
      type: 'report_generated',
      title: 'Report Generated',
      description: 'Proctoring report created for completed interview',
      timestamp: '2025-01-15T08:30:00Z',
      metadata: {
        candidate: 'Alex Thompson',
        session: 'INT-004',
        score: 95
      }
    }
  ];

  // Calculate summary statistics
  const summaryStats = {
    todayInterviews: mockInterviews?.length,
    activeInterviews: mockInterviews?.filter(i => i?.status === 'active')?.length,
    completedInterviews: mockInterviews?.filter(i => i?.status === 'completed')?.length,
    averageIntegrity: Math.round(
      mockInterviews?.filter(i => i?.integrityScore > 0)?.reduce((sum, i) => sum + i?.integrityScore, 0) / 
      mockInterviews?.filter(i => i?.integrityScore > 0)?.length
    )
  };

  // Filter interviews based on search and filters
  useEffect(() => {
    let filtered = [...mockInterviews];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(interview =>
        interview?.candidateName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        interview?.position?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(interview => interview?.status === filters?.status);
    }

    // Apply date filter (simplified for demo)
    // In real implementation, this would filter by actual dates

    setFilteredInterviews(filtered);
  }, [searchTerm, filters]);

  // Event handlers
  const handleJoinSession = (interviewId) => {
    navigate('/live-interview-monitor', { state: { interviewId } });
  };

  const handleViewReport = (interviewId) => {
    navigate('/proctoring-reports', { state: { interviewId } });
  };

  const handleViewRecording = (interviewId) => {
    // In real implementation, this would open recording viewer
    console.log('View recording for:', interviewId);
  };

  const handleNewInterview = () => {
    navigate('/interview-setup');
  };

  const handleStartInterview = (interviewId) => {
    navigate('/live-interview-monitor', { state: { interviewId } });
  };

  const handleEditInterview = (interviewId) => {
    navigate('/interview-setup', { state: { interviewId, mode: 'edit' } });
  };

  const handleViewReports = () => {
    navigate('/proctoring-reports');
  };

  const handleSystemSettings = () => {
    navigate('/interview-setup');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    // In real implementation, this would refetch data
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Interview Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor and manage your proctored interview sessions
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={handleRefresh}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              <Button
                variant="default"
                onClick={handleNewInterview}
                iconName="Plus"
                iconPosition="left"
              >
                New Interview
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Today's Interviews"
              value={summaryStats?.todayInterviews}
              subtitle="Scheduled sessions"
              icon="Calendar"
              trend="up"
              trendValue="+2"
              color="primary"
            />
            <SummaryCard
              title="Active Sessions"
              value={summaryStats?.activeInterviews}
              subtitle="Currently running"
              icon="Monitor"
              trend=""
              trendValue=""
              color="success"
            />
            <SummaryCard
              title="Completed Today"
              value={summaryStats?.completedInterviews}
              subtitle="Finished sessions"
              icon="CheckCircle"
              trend="up"
              trendValue="+1"
              color="accent"
            />
            <SummaryCard
              title="Avg Integrity Score"
              value={`${summaryStats?.averageIntegrity}%`}
              subtitle="Overall performance"
              icon="Shield"
              trend="up"
              trendValue="+3%"
              color="warning"
            />
          </div>

          {/* Filter Controls */}
          <FilterControls
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onRefresh={handleRefresh}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Interview Table */}
            <div className="lg:col-span-2 space-y-8">
              <InterviewTable
                interviews={filteredInterviews}
                onJoinSession={handleJoinSession}
                onViewReport={handleViewReport}
                onViewRecording={handleViewRecording}
              />
              
              <QuickActions
                onNewInterview={handleNewInterview}
                onViewReports={handleViewReports}
                onSystemSettings={handleSystemSettings}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <UpcomingInterviews
                interviews={mockUpcomingInterviews}
                onStartInterview={handleStartInterview}
                onEditInterview={handleEditInterview}
              />
              
              <RecentActivity activities={mockRecentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewDashboard;