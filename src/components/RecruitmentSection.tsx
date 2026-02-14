import { motion } from "framer-motion";
import { Crosshair, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface RecruitmentSectionProps {
  onOpenRegistration: () => void;
}

const RecruitmentSection = ({ onOpenRegistration }: RecruitmentSectionProps) => {
  const targetDate = new Date(2026, 1, 15, 23, 59, 59).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired =
    timeLeft.days +
      timeLeft.hours +
      timeLeft.minutes +
      timeLeft.seconds ===
    0;

  return (
    <section
      id="recruitment-section"
      className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="glass-card p-1 rounded-3xl overflow-hidden relative group">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

          <div className="bg-black/80 rounded-[22px] border border-white/5 p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-2 left-2 md:top-4 md:left-4 text-primary/40">
              <Crosshair className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="absolute top-2 right-2 md:top-4 md:right-4 text-primary/40">
              <Crosshair className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-primary/40">
              <Crosshair className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-primary/40">
              <Crosshair className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex justify-center mb-8 mt-10 md:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold text-primary tracking-widest">
                  SYSTEM STATUS: RECRUITING
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-8 items-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-text-shimmer text-center">
                MEMBER BOARD <span className="text-[2.3rem] md:text-[4.88rem] leading-none">2</span>
              </h2>

              {/* Countdown */}
              <div className="px-6 py-4 rounded-md border border-red-500/30 bg-red-500/10 text-center">
                <p className="text-xs md:text-sm font-mono tracking-wider text-red-400 mb-2">
                  APPLICATION CLOSES IN
                </p>

                <div className="flex gap-4 justify-center text-red-300 font-mono">
                  {[
                    { label: "DAYS", value: timeLeft.days },
                    { label: "HRS", value: timeLeft.hours },
                    { label: "MIN", value: timeLeft.minutes },
                    { label: "SEC", value: timeLeft.seconds },
                  ].map((t) => (
                    <div key={t.label}>
                      <span className="text-lg md:text-xl font-bold">
                        {t.value}
                      </span>
                      <p className="text-[10px]">{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={onOpenRegistration}
                disabled={isExpired}
                className={`cyber-button-solid text-lg md:text-xl px-6 py-4 md:px-10 md:py-5 w-full md:w-auto flex justify-center items-center gap-3 relative overflow-hidden
                ${
                  isExpired
                    ? "opacity-50 cursor-not-allowed"
                    : "group"
                }`}
              >
                <Users className="w-5 h-5" />
                {isExpired ? "REGISTRATIONS CLOSED" : "APPLY NOW"}
                {!isExpired && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
              </button>
            </div>

            {/* Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent -z-10" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RecruitmentSection;
