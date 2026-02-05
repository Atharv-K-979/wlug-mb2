import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLoaderProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: "> INITIALIZING KERNEL...", delay: 0 },
  { text: "> LOADING MODULES... [OK]", delay: 600 },
  { text: "> MOUNTING FILESYSTEMS... [OK]", delay: 1200 },
  { text: "> ESTABLISHING SECURE CONNECTION...", delay: 1800 },
  { text: "> AUTHENTICATING NETWORK NODES...", delay: 2400 },
  { text: "> SYSTEM READY", delay: 3000 },
];

const BootLoader = ({ onComplete }: BootLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessages, setCurrentMessages] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Message typing animation
    bootMessages.forEach(({ text, delay }) => {
      setTimeout(() => {
        setCurrentMessages((prev) => [...prev, text]);
      }, delay);
    });

    // Trigger glitch and complete
    const completeTimer = setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1,
          filter: "brightness(2)",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-8 ${isGlitching ? "animate-[screen-glitch_0.5s_ease-in-out]" : ""
          }`}
      >
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 border-b-0 rounded-t-lg">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-xs text-muted-foreground font-mono">
              WLUG_SYSTEM_V.2.0
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-black/60 border border-white/10 border-t-0 rounded-b-lg p-6 min-h-[300px]">
            {/* Boot messages */}
            <div className="space-y-2 mb-8">
              {currentMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="font-mono text-sm"
                >
                  <span className={message.includes("[OK]") || message.includes("READY") ? "text-green-400" : "text-primary"}>
                    {message}
                  </span>
                </motion.div>
              ))}

              {/* Blinking cursor */}
              {currentMessages.length < bootMessages.length && (
                <div className="terminal-cursor text-primary text-sm" />
              )}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>LOADING SYSTEM</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-black/40 border border-white/10 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Corner decorations */}
        <div className="fixed top-4 left-4 text-primary/30 font-mono text-xs">
          [ BOOT_SEQ ]
        </div>
        <div className="fixed top-4 right-4 text-primary/30 font-mono text-xs">
          SYS_INIT
        </div>
        <div className="fixed bottom-4 left-4 text-primary/30 font-mono text-xs">
          MEM: 16384MB
        </div>
        <div className="fixed bottom-4 right-4 text-primary/30 font-mono text-xs">
          CPU: 100%
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootLoader;
