import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BootLoader from "@/components/BootLoader";
import LandingPage from "@/components/LandingPage";
import RegistrationModal from "@/components/RegistrationModal";
import RecruitmentSection from "@/components/RecruitmentSection";
import Footer from "@/components/Footer";
import RegistrationEnd from "@/components/RegistrationEnd";
const queryClient = new QueryClient();

const App = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  const handleOpenRegistration = useCallback(() => {
    setIsRegistrationOpen(true);
  }, []);

  const handleCloseRegistration = useCallback(() => {
    setIsRegistrationOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isRegistrationOpen) {
        handleCloseRegistration();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRegistrationOpen, handleCloseRegistration]);

  const scrollToRecruitment = useCallback(() => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <div className="bg-background min-h-screen overflow-y-auto scroll-smooth">
          <div className="scanline-overlay" />
          <div className="noise-overlay" />

          {/* Boot Loader */}
          <AnimatePresence mode="wait">
            {isBooting && <BootLoader onComplete={handleBootComplete} />}
          </AnimatePresence>

          {/* Main Content */}
          {!isBooting && (
            <main className="flex flex-col w-full relative">
              <section id="home">
                <LandingPage
                  onScrollToRecruitment={scrollToRecruitment}
                  isBlurred={isRegistrationOpen}
                />
              </section>
              <section id="register">
                {/* <RecruitmentSection onOpenRegistration={handleOpenRegistration} /> */}
                <RegistrationEnd />
              </section>
              <section id="footer">
                <Footer />
              </section>
            </main>
          )}

          {/* Registration Modal */}
          <RegistrationModal
            isOpen={isRegistrationOpen}
            onClose={handleCloseRegistration}
          />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
