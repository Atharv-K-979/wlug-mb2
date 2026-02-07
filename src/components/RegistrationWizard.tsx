import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Database, Settings, Rocket, Upload, FileText, Image as ImageIcon } from "lucide-react";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
import CyberSelect from "./CyberSelect";
import HolographicCard from "./HolographicCard";
import { supabase } from "@/lib/supabase";

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  branch: string;
  mission: string;
  profilePhoto: File | null;
  resume: File | null;
}

const initialData: FormData = {
  fullName: "",
  email: "",
  mobile: "",
  branch: "",
  mission: "",
  profilePhoto: null,
  resume: null,
};

const branchOptions = [
  { value: "cse", label: "Computer Science" },
  { value: "it", label: "Information Technology" },
  { value: "ece", label: "Electronics" },
  { value: "eee", label: "Electrical" },
  { value: "robotics", label: "Robotics and Automation" },
  { value: "aiml", label: "AI & Machine Learning" },
];

const RegistrationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: "profilePhoto" | "resume") => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
      if (!formData.mobile.trim()) newErrors.mobile = "Required";
      else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) newErrors.mobile = "Invalid mobile";
    }

    if (currentStep === 2) {
      if (!formData.branch) newErrors.branch = "Required";
      if (!formData.mission.trim()) newErrors.mission = "Required";
    }

    if (currentStep === 3) {
      if (!formData.profilePhoto) newErrors.profilePhoto = "Profile photo required";
      if (!formData.resume) newErrors.resume = "Resume required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}_${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('candidates')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('candidates').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // 1. Upload Files
      let profilePhotoUrl = "";
      let resumeUrl = "";

      if (formData.profilePhoto) {
        profilePhotoUrl = await uploadFile(formData.profilePhoto, `photos/${formData.email}`);
      }
      if (formData.resume) {
        resumeUrl = await uploadFile(formData.resume, `resumes/${formData.email}`);
      }

      // 2. Insert Data
      const { error } = await supabase
        .from("wlug_registrations")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            branch: formData.branch,
            mission: formData.mission,
            profile_photo_url: profilePhotoUrl,
            resume_url: resumeUrl,
          },
        ]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const stepIcons = [User, Database, Upload, Rocket];
  const StepIcon = stepIcons[step - 1] || User;

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <HolographicCard name={formData.fullName} email={formData.email} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: shakeCard ? [0, -10, 10, -10, 10, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto overflow-hidden px-4"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 border border-primary/30 rounded">
            <StepIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider uppercase font-display">
              WLUG MEMBER BOARD 2 REGISTRATION
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              STEP_{step}_OF_4
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 font-mono text-lg tracking-widest">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`transition-colors duration-300 ${s <= step ? "text-primary text-glow" : "text-primary/20"
                } ${s === step ? "animate-pulse" : ""}`}
            >
              {s <= step ? "■" : "□"}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[300px] flex flex-col">
        <AnimatePresence mode="wait" custom={step}>

          {/* Step 1: Identity */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 1: Identity Matrix
                </h2>
              </div>
              <FloatingInput
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
              />
              <FloatingInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
              />
              <FloatingInput
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                error={errors.mobile}
              />
            </motion.div>
          )}

          {/* Step 2: Department & Mission */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 2: Department & Intent
                </h2>
              </div>
              <CyberSelect
                label="Department / Branch"
                value={formData.branch}
                onChange={(v) => updateField("branch", v)}
                options={branchOptions}
                error={errors.branch}
              />
              <FloatingTextarea
                label="Why do you want to join WLUG?"
                value={formData.mission}
                onChange={(e) => updateField("mission", e.target.value)}
                error={errors.mission}
              />
            </motion.div>
          )}

          {/* Step 3: Documents (Photo & Resume) */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1 space-y-6"
            >
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 3: Document Upload
                </h2>
              </div>

              {/* Profile Photo Input */}
              <div className="space-y-2">
                <label className="text-xs text-primary uppercase tracking-wider block">Profile Photo</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profilePhoto")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`cyber-input w-full py-3 flex items-center gap-3 ${errors.profilePhoto ? "border-destructive text-destructive" : "text-muted-foreground"}`}>
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm truncate">
                      {formData.profilePhoto ? formData.profilePhoto.name : "Select Profile Photo..."}
                    </span>
                  </div>
                </div>
                {errors.profilePhoto && <span className="text-xs text-destructive">{errors.profilePhoto}</span>}
              </div>

              {/* Resume Input */}
              <div className="space-y-2">
                <label className="text-xs text-primary uppercase tracking-wider block">Resume (PDF)</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`cyber-input w-full py-3 flex items-center gap-3 ${errors.resume ? "border-destructive text-destructive" : "text-muted-foreground"}`}>
                    <FileText className="w-5 h-5" />
                    <span className="text-sm truncate">
                      {formData.resume ? formData.resume.name : "Select Resume (PDF)..."}
                    </span>
                  </div>
                </div>
                {errors.resume && <span className="text-xs text-destructive">{errors.resume}</span>}
              </div>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Step 4: Review Details
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Mobile</span>
                  <span className="font-medium">{formData.mobile}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Dept</span>
                  <span className="font-medium">
                    {branchOptions.find((b) => b.value === formData.branch)?.label}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="font-medium text-right">
                    {formData.profilePhoto?.name} <br />
                    {formData.resume?.name}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10 flex justify-between mt-auto">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 cyber-button py-2 px-4"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`cyber-button-solid py-3 px-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? "Uploading..." : "Execute Script"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RegistrationWizard;