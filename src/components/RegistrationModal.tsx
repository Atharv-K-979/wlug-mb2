import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import RegistrationWizard from "./RegistrationWizard";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.5
            }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-auto"
          >
            <div className="glass-vault rounded-t-3xl border-t border-x border-white/10">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-sm text-muted-foreground">
                      NEW USER PROTOCOL // V.2.0
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <RegistrationWizard />
              </div>

              {/* Bottom decoration */}
              <div className="h-8 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Corner brackets decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 left-4 z-50 text-primary/40 font-mono text-xs"
          >
            [ REGISTRATION_MODE ]
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50 text-primary/40 font-mono text-xs"
          >
            ESC_TO_EXIT
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
