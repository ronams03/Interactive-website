import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Origin from "@/pages/Origin";
import Depth from "@/pages/Depth";
import Pulse from "@/pages/Pulse";
import Ascend from "@/pages/Ascend";
import { ROUTE_PATHS } from "@/lib/index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route
              path={ROUTE_PATHS.HOME}
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.ORIGIN}
              element={
                <Layout>
                  <Origin />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.DEPTH}
              element={
                <Layout>
                  <Depth />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.PULSE}
              element={
                <Layout>
                  <Pulse />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.ASCEND}
              element={
                <Layout>
                  <Ascend />
                </Layout>
              }
            />
          </Routes>
        </HashRouter>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
