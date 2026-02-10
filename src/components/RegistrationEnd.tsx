import { motion } from "framer-motion";
import { Crosshair } from "lucide-react";

const RegistrationEnd = () => {
    return (
        <section
            id="registration-end"
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

                        {/* System Status: Offline (Red) */}
                        {/* <div className="flex justify-center mb-8 mt-10 md:mt-0">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] md:text-xs font-mono font-bold text-red-500 tracking-widest">
                                    SYSTEM STATUS: OFFLINE
                                </span>
                            </div>
                        </div> */}

                        {/* Content */}
                        <div className="flex flex-col gap-6 items-center max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-text-shimmer">
                                MEMBER BOARD <span className="text-[2.4rem] md:text-[4.88rem] leading-none">2</span>
                            </h2>

                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
                                REGISTRATIONS CLOSED
                            </h1>

                            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                                Thank you for your interest! The registration period has ended.
                            </p>
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

export default RegistrationEnd;
