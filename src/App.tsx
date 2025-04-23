
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerPaymentsPage from "./pages/FarmerPaymentsPage";
import FarmerContractsPage from "./pages/FarmerContractsPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerContractsPage from "./pages/BuyerContractsPage";
import BuyerPaymentsPage from "./pages/BuyerPaymentsPage";
import ContractPage from "./pages/ContractPage";
import MessagingPage from "./pages/MessagingPage";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import FarmersPage from "./pages/FarmersPage";
import BuyersPage from "./pages/BuyersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/payments" element={<FarmerPaymentsPage />} />
            <Route path="/farmer/contracts" element={<FarmerContractsPage />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/contracts" element={<BuyerContractsPage />} />
            <Route path="/buyer/payments" element={<BuyerPaymentsPage />} />
            <Route path="/contract/:id" element={<ContractPage />} />
            <Route path="/contract/create/:id" element={<ContractPage />} />
            <Route path="/messages" element={<MessagingPage />} />
            <Route path="/messages/:id" element={<MessagingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
