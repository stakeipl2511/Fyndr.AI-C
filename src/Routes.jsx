import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CourseDetailLearning from "pages/course-detail-learning";
import RecruiterDashboard from "pages/recruiter-dashboard";
import AiCareerCoachChat from "pages/ai-career-coach-chat";
import CandidateDiscoverySourcing from "pages/candidate-discovery-sourcing";
import ApplicationTrackingPipeline from "pages/application-tracking-pipeline";
import AdminDashboardSystemManagement from "pages/admin-dashboard-system-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/course-detail-learning" element={<CourseDetailLearning />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/ai-career-coach-chat" element={<AiCareerCoachChat />} />
        <Route path="/candidate-discovery-sourcing" element={<CandidateDiscoverySourcing />} />
        <Route path="/application-tracking-pipeline" element={<ApplicationTrackingPipeline />} />
        <Route path="/admin-dashboard-system-management" element={<AdminDashboardSystemManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;