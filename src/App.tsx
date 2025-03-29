
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationBar from "./components/NavigationBar";
import DashboardSidebar from "./components/Dashboard/DashboardSidebar";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Analytics from "./pages/Analytics";
import StudyPlanner from "./pages/StudyPlanner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Auth guard component to check if user is logged in
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const hasSeenAbout = localStorage.getItem('hasSeenAbout') === 'true';
  const location = useLocation();
  
  if (!isLoggedIn && !['/', '/login', '/register', '/about'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in but hasn't seen about page, redirect there first
  if (isLoggedIn && !hasSeenAbout && location.pathname !== '/about' && location.pathname !== '/') {
    return <Navigate to="/about" replace />;
  }
  
  return <>{children}</>;
};

// Create a component to conditionally render the sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showSidebar = ['/home', '/courses', '/analytics', '/study-planner'].includes(location.pathname);
  
  return (
    <>
      <NavigationBar />
      {showSidebar && <DashboardSidebar />}
      <div className={showSidebar ? "md:pl-60" : ""}>
        {children}
      </div>
    </>
  );
};

// Wrapper component for routes that need the AppLayout
const WrappedRoutes = () => {
  const location = useLocation();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  
  useEffect(() => {
    // Mark about page as seen when visited
    if (location.pathname === '/about') {
      localStorage.setItem('hasSeenAbout', 'true');
    }
  }, [location.pathname]);
  
  return (
    <AuthGuard>
      <AppLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </AuthGuard>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/*" element={<WrappedRoutes />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
