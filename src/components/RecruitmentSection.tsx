import { motion } from "framer-motion";
import { Crosshair, Users } from "lucide-react";

interface RecruitmentSectionProps {
    onOpenRegistration: () => void;
}

const RecruitmentSection = ({ onOpenRegistration }: RecruitmentSectionProps) => {
    return (
        <section
            id="recruitment-section"
            className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden"
        >
            {/* Background decoration */}
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
                    {/* Glowing border effect */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                    <div className="bg-black/80 rounded-[22px] border border-white/5 p-6 md:p-16 relative overflow-hidden">
                        {/* Corner decorations */}
                        <div className="absolute top-4 left-4 text-primary/40"><Crosshair className="w-6 h-6" /></div>
                        <div className="absolute top-4 right-4 text-primary/40"><Crosshair className="w-6 h-6" /></div>
                        <div className="absolute bottom-4 left-4 text-primary/40"><Crosshair className="w-6 h-6" /></div>
                        <div className="absolute bottom-4 right-4 text-primary/40"><Crosshair className="w-6 h-6" /></div>

                        {/* Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-mono font-bold text-primary tracking-widest">
                                    SYSTEM STATUS: RECRUITING
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-6 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-text-shimmer leading-tight pb-2">
                                MEMBER BOARD 2
                            </h2>

                            {/* <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto leading-relaxed">
                                AUTHENTICATE YOUR SKILLS.
                            </p> */}

                            <div className="pt-8">
                                <button
                                    onClick={onOpenRegistration}
                                    className="cyber-button-solid text-lg md:text-xl px-10 py-5 group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        <Users className="w-5 h-5" />
                                        REGISTER NOW
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Background elements inside card */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent -z-10" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default RecruitmentSection;
