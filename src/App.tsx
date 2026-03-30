import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookshelf from "./pages/Bookshelf";
import DocumentDetail from "./pages/DocumentDetail";
import DocumentEditor from "./pages/DocumentEditor";
import ReviewWorkspace from "./pages/ReviewWorkspace";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import RAGPanel from "./components/shared/RAGPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/document/:id" element={<DocumentDetail />} />
            <Route path="/editor" element={<DocumentEditor />} />
            <Route path="/review" element={<ReviewWorkspace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RAGPanel />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
