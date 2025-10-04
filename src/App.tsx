import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { registerServiceWorker } from "@/utils/serviceWorker";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize performance monitoring
  const { optimizationLevel, shouldReduceAnimations } = usePerformanceMonitoring();

  // Add performance optimization class to body
  React.useEffect(() => {
    document.body.classList.toggle('reduce-animations', shouldReduceAnimations);
    document.body.classList.toggle('high-performance-mode', optimizationLevel === 'high');
  }, [shouldReduceAnimations, optimizationLevel]);

  // Register service worker for performance optimization
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PerformanceMonitor />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
