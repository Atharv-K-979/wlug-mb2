import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Shield, Users, Zap } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

interface LandingPageProps {
  onScrollToRecruitment: () => void;
  isBlurred: boolean;
}

const LandingPage = ({ onScrollToRecruitment, isBlurred }: LandingPageProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <motion.div
      animate={{
        scale: isBlurred ? 0.95 : 1,
        filter: isBlurred ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative min-h-screen bg-transparent"
      id="home"
    >
      {/* Digital grid floor */}
      <div className="digital-grid" />

      {/* HUD Elements */}
      <HUDElements currentTime={currentTime} formatTime={formatTime} />

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 md:mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative p-4 border border-primary/30 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <img
                src="/wlug-logo.jpeg"
                alt="WLUG Logo"
                className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl md:text-5xl font-bold font-display text-center mb-4 glitch-text cursor-default"
        >
          <span className="text-glow">WALCHAND</span>
          <span className="text-secondary ml-4">LINUX USERS' GROUP</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl font-mono text-center mb-12 max-w-2xl mx-auto"
        >
          Join a vibrant community of Linux enthusiasts and master the World of Open Source.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Cpu, text: "Linux Mastery" },
            { icon: Shield, text: "Open Source" },
            { icon: Zap, text: "Innovation" },
          ].map(({ icon: Icon, text }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-full"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-foreground/80">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Main CTA Button */}
        <div className="mb-20 md:mb-0">
          <MagneticButton onClick={onScrollToRecruitment}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-primary/10 border-2 border-primary text-primary font-bold uppercase tracking-[0.2em] font-mono pulse-button transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-primary/60 group-hover:text-primary-foreground/60">[</span>
                INITIALIZE REGISTRATION
                <span className="text-primary/60 group-hover:text-primary-foreground/60">]</span>
              </span>
            </motion.div>
          </MagneticButton>
        </div>

        {/* Decorative brackets around CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center gap-4 text-muted-foreground/50 font-mono text-xs"
        >
          <span>{'<'}</span>
          <span>MB_2_RECRUITMENT</span>
          <span>{'/'}</span>
          <span>ACTIVE</span>
          <span>{'>'}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// HUD Elements Component
const HUDElements = ({
  currentTime,
  formatTime,
}: {
  currentTime: Date;
  formatTime: (date: Date) => string;
}) => {
  return (
    <>
      {/* Mobile Sticky Header Removed as per request */}

      {/* Top Right - System Time */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-6 z-20 hidden md:block"
      >
        <div className="hud-bracket p-4">
          <div className="text-xs text-muted-foreground font-mono mb-1">
            SYSTEM_TIME
          </div>
          <div className="text-2xl font-mono text-primary text-glow">
            {formatTime(currentTime)}
          </div>
        </div>
      </motion.div>

      {/* Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-6 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-primary/50 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-display font-bold text-foreground">WLUG</div>
            <div className="text-xs text-muted-foreground font-mono">V.2.0</div>
          </div>
        </div>
      </motion.div>
      {/* Bottom Left - Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-6 left-6 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded">
          <div className="status-dot" />
          <span className="text-xs font-mono text-muted-foreground">
            STATUS: <span className="text-green-400">ONLINE</span>
          </span>
        </div>
      </motion.div>

      {/* Bottom Right - Network Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-6 right-6 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">
          </span>
        </div>
      </motion.div>

      {/* Crosshair decorations */}
      <div className="fixed top-1/2 left-8 -translate-y-1/2 text-primary/20 text-2xl font-mono z-10 hidden md:block">
        +
      </div>
      <div className="fixed top-1/2 right-8 -translate-y-1/2 text-primary/20 text-2xl font-mono z-10 hidden md:block">
        +
      </div>
    </>
  );
};

export default LandingPage;