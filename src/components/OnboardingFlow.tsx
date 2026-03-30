import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Zap, 
  Layout, 
  BarChart3, 
  ChevronRight, 
  X, 
  Sparkles, 
  MousePointer2, 
  Split, 
  ArrowRight,
  Globe,
  Trophy
} from "lucide-react";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  industry?: string;
}

const steps = [
  { id: 1, title: "Welcome to Inner Circle", duration: 30 },
  { id: 2, title: "Pick a Template", duration: 120 },
  { id: 3, title: "Customize in Seconds", duration: 120 },
  { id: 4, title: "Your Page is Live!", duration: 30 },
  { id: 5, title: "Run Your First A/B Test", duration: 60 },
];

const templates = [
  { id: "ecomm-1", name: "High-AOV Checkout", conversion: "94%", type: "commerce" },
  { id: "saas-1", name: "SaaS Signup Flow", conversion: "91%", type: "saas" },
  { id: "agency-1", name: "Agency Lead Gen", conversion: "89%", type: "agencies" },
  { id: "ecomm-2", name: "Product Detail Page", conversion: "92%", type: "commerce" },
];

export default function OnboardingFlow({ isOpen, onClose, userEmail, industry = "E-Commerce" }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [headline, setHeadline] = useState("The Future of Conversion is Here.");

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl p-4 md:p-8 overflow-hidden">
      <div className="absolute top-8 right-8 z-10">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-6xl w-full h-full max-h-[800px] bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden flex flex-col relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            className="h-full bg-orange-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-16">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-orange-500/20 flex items-center justify-center mx-auto mb-12">
                  <Sparkles className="w-10 h-10 text-orange-500" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-8 font-display">
                  Welcome to the <span className="text-orange-500">Inner Circle</span>
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                  Hey {userEmail.split('@')[0]}, you're minutes away from your first high-converting page. We've built the tools—now let's build your machine.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { icon: Layout, label: "Page Builder" },
                    { icon: Split, label: "A/B Testing" },
                    { icon: BarChart3, label: "Analytics" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex flex-col items-center gap-4">
                      <item.icon className="w-8 h-8 text-orange-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={nextStep}
                  className="px-12 py-6 rounded-full bg-orange-500 text-white font-bold text-xl hover:opacity-90 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-orange-500/20"
                >
                  Let's Build Your First Page
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button onClick={onClose} className="mt-8 text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-widest text-xs">
                  Skip to Dashboard
                </button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic mb-4 font-display">
                    Pick a <span className="text-orange-500">Template</span>
                  </h2>
                  <p className="text-zinc-400">Curated for <strong>{industry}</strong> based on 2.5M+ conversion data points.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                  {templates.map((template) => (
                    <motion.div 
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        nextStep();
                      }}
                      className="group cursor-pointer p-1 rounded-[32px] bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/50 transition-all overflow-hidden"
                    >
                      <div className="aspect-[3/4] rounded-[28px] bg-zinc-900 mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent flex flex-col justify-end p-6">
                          <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Conversion Potential: {template.conversion}</div>
                          <div className="text-lg font-black uppercase italic tracking-tighter">{template.name}</div>
                        </div>
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <MousePointer2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic mb-4 font-display">
                      Customize in <span className="text-orange-500">Seconds</span>
                    </h2>
                    <p className="text-zinc-400">Make it yours. Every element is optimized for speed and conversion.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsPublishing(true);
                      setTimeout(() => {
                        setIsPublishing(false);
                        nextStep();
                      }, 2000);
                    }}
                    disabled={isPublishing}
                    className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isPublishing ? "Publishing..." : "Publish Page"}
                    <Zap className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-3 space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Headline Text</div>
                      <textarea 
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm focus:border-orange-500 outline-none transition-all resize-none h-32"
                      />
                    </div>
                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Brand Color</div>
                      <div className="flex gap-2">
                        {["bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500"].map(c => (
                          <div key={c} className={`w-8 h-8 rounded-full ${c} cursor-pointer border-2 border-transparent hover:border-white transition-all`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9 rounded-[40px] bg-white text-zinc-950 p-12 relative overflow-hidden shadow-2xl">
                    <div className="max-w-2xl">
                      <motion.h1 
                        layout
                        className="text-6xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8 font-display"
                      >
                        {headline}
                      </motion.h1>
                      <p className="text-lg text-zinc-600 mb-12">
                        Build your machine. Optimize your future. Win the market.
                      </p>
                      <button className="px-10 py-5 rounded-full bg-orange-500 text-white font-bold text-lg">
                        Start Your Trial
                      </button>
                    </div>
                    <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center animate-pulse">
                      <MousePointer2 className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto text-center py-12"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-12"
                >
                  <Trophy className="w-16 h-16 text-emerald-500" />
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8 font-display">
                  Your Page is <span className="text-emerald-500">Live!</span>
                </h2>
                <div className="p-6 rounded-3xl bg-zinc-800/50 border border-zinc-700/50 inline-flex items-center gap-4 mb-12">
                  <Globe className="w-6 h-6 text-zinc-500" />
                  <span className="text-xl font-mono text-zinc-300">winners.io/my-first-page</span>
                  <button className="px-4 py-2 rounded-lg bg-zinc-700 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-600 transition-all">Copy</button>
                </div>
                <p className="text-xl text-zinc-400 mb-12">
                  Boom! You're now ahead of 90% of your competition. Ready to make it even better?
                </p>
                <button 
                  onClick={nextStep}
                  className="px-12 py-6 rounded-full bg-orange-500 text-white font-bold text-xl hover:opacity-90 transition-all flex items-center gap-3 mx-auto shadow-2xl shadow-orange-500/20"
                >
                  Now Let's Set Up Your First A/B Test
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col"
              >
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic mb-4 font-display">
                    Run Your First <span className="text-orange-500">A/B Test</span>
                  </h2>
                  <p className="text-zinc-400">Don't guess—test. A/B testing lets you run two versions of your page to see which one makes more money.</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-zinc-900 border border-zinc-800 relative">
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Variant A (Original)</div>
                      <div className="pt-8">
                        <div className="h-4 w-3/4 bg-zinc-800 rounded-full mb-4" />
                        <div className="h-4 w-1/2 bg-zinc-800 rounded-full" />
                      </div>
                    </div>
                    <div className="p-8 rounded-[40px] bg-zinc-900 border-2 border-orange-500 relative">
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-widest text-white">Variant B (New)</div>
                      <div className="pt-8">
                        <div className="h-4 w-3/4 bg-orange-500/20 rounded-full mb-4" />
                        <div className="h-4 w-1/2 bg-orange-500/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6">Create a Test Variation</h3>
                    <p className="text-zinc-400 mb-12 leading-relaxed">
                      We'll automatically split your traffic 50/50 between these two versions. In 24 hours, we'll tell you which one is the winner.
                    </p>
                    <button 
                      onClick={onClose}
                      className="px-12 py-6 rounded-full bg-orange-500 text-white font-bold text-xl hover:opacity-90 transition-all flex items-center gap-3 shadow-2xl shadow-orange-500/20 mx-auto md:mx-0"
                    >
                      Start A/B Test
                      <Zap className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex gap-2">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`w-2 h-2 rounded-full transition-all ${currentStep === step.id ? "bg-orange-500 w-8" : "bg-zinc-700"}`} 
              />
            ))}
          </div>
          <div className="flex gap-4">
            {currentStep > 1 && currentStep < 4 && (
              <button onClick={prevStep} className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-400 font-bold text-sm hover:text-white transition-all">
                Back
              </button>
            )}
            {currentStep < 4 && (
              <button onClick={nextStep} className="px-6 py-3 rounded-full bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition-all">
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
