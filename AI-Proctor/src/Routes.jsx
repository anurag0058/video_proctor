import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProctoringReports from './pages/proctoring-reports';
import LoginPage from './pages/login';
import LiveInterviewMonitor from './pages/live-interview-monitor';
import InterviewSetup from './pages/interview-setup';
import Register from './pages/register';
import InterviewDashboard from './pages/interview-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InterviewDashboard />} />
        <Route path="/proctoring-reports" element={<ProctoringReports />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/live-interview-monitor" element={<LiveInterviewMonitor />} />
        <Route path="/interview-setup" element={<InterviewSetup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interview-dashboard" element={<InterviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
