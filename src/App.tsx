import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import { Sidebar } from "./components/Sidebar";
import { validateStep1, validateStep2 } from "./utils/validation";
import { useFormContext } from "./context/FormContext";
import Step1Basics from "./pages/Step1Basics";
import Step2Rewards from "./pages/Step2Rewards";
import Step3Backer from "./pages/Step3Backer";
import Confirmation from "./pages/Confirmation";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { formData } = useFormContext();

  const canNavigateToStep = (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) {
      return validateStep1(formData.step1).isValid;
    }
    if (step === 3) {
      return (
        validateStep1(formData.step1).isValid &&
        validateStep2(formData.step2).isValid
      );
    }
    return false;
  };

  return (
    // Changed from flex to responsive grid layout
    <div className="flex min-h-screen w-full md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      <Sidebar canNavigateToStep={canNavigateToStep} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FormProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/step/1" replace />} />
            <Route
              path="/step/1"
              element={
                <AppLayout>
                  <Step1Basics />
                </AppLayout>
              }
            />
            <Route
              path="/step/2"
              element={
                <AppLayout>
                  <Step2Rewards />
                </AppLayout>
              }
            />
            <Route
              path="/step/3"
              element={
                <AppLayout>
                  <Step3Backer />
                </AppLayout>
              }
            />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FormProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;