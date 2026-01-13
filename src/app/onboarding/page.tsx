"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, User, Target, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const EXPERIENCES = ["Student", "New Grad", "Professional", "Changer"];
const GOALS = ["Get a Job", "Learn a Skill", "Build a Project", "Just Exploring"];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        goal: "",
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Submit and redirect to dashboard
            if (typeof window !== "undefined") {
                localStorage.setItem("vidya_onboarding", JSON.stringify(formData));
                localStorage.setItem("vidya_user_goal", formData.goal);
            }
            router.push("/dashboard?welcome=true"); 
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="bg-white dark:bg-slate-900 p-8 border-b border-slate-100 dark:border-slate-800 text-center">
                    <div className="flex justify-center mb-4">
                         <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            {step === 1 && <User className="h-6 w-6" />}
                            {step === 2 && <Briefcase className="h-6 w-6" />}
                            {step === 3 && <Target className="h-6 w-6" />}
                         </div>
                    </div>
                    <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                        {step === 1 && "Tell us about yourself"}
                        {step === 2 && "What describes you best?"}
                        {step === 3 && "What describes your goal?"}
                    </h1>
                     <p className="text-sm text-slate-500 dark:text-slate-400">
                        Step {step} of 3
                    </p>
                </div>
                
                <CardContent className="p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label>What should we call you?</Label>
                                    <Input 
                                        placeholder="Your Name" 
                                        className="h-12"
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {EXPERIENCES.map((exp) => (
                                    <button
                                        key={exp}
                                        onClick={() => setFormData({...formData, experience: exp})}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-all hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900",
                                            formData.experience === exp && "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600"
                                        )}
                                    >
                                        <div className="h-10 w-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                                            <Checks active={formData.experience === exp} />
                                        </div>
                                        <span className="font-medium text-sm">{exp}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === 3 && (
                             <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                 {GOALS.map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => setFormData({...formData, goal: goal})}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-all hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900",
                                            formData.goal === goal && "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600"
                                        )}
                                    >
                                        <span className="font-medium text-sm">{goal}</span>
                                        {formData.goal === goal && <CheckCircle2 className="h-5 w-5 text-indigo-600" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button onClick={handleNext} className="w-full mt-8 h-12 text-base font-bold shadow-lg shadow-indigo-500/20">
                        {step === 3 ? "Complete Setup" : "Continue"} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

function Checks({ active }: { active: boolean }) {
    if (active) return <CheckCircle2 className="h-5 w-5 text-indigo-600" />;
    return <div className="h-5 w-5 rounded-full border border-slate-300 dark:border-slate-600" />;
}
