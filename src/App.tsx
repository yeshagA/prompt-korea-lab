import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import StudentPage from "./pages/StudentPage";
import JobSeekerPage from "./pages/JobSeekerPage";
import EmployeePage from "./pages/EmployeePage";
import PlaygroundPage from "./pages/PlaygroundPage";
import DashboardPage from "./pages/DashboardPage";
import LearnPage from "./pages/LearnPage";
import PersonaPathsPage from "./pages/PersonaPathsPage";
import RoadmapPage from "./pages/RoadmapPage";
import ExamplesPage from "./pages/ExamplesPage";
import VerifyPage from "./pages/VerifyPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/job-seeker" element={<JobSeekerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/paths" element={<PersonaPathsPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
