/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import VerticalLandingPage from "./components/VerticalLandingPage";
import OnboardingFlow from "./components/OnboardingFlow";
import PerformanceDashboard from "./components/PerformanceDashboard";
import { 
  CheckCircle2, 
  Zap, 
  Users, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  Target, 
  TrendingUp, 
  Layout,
  MousePointer2,
  Split,
  UserCheck,
  Play,
  ArrowUpRight,
  Sparkles,
  Quote,
  Star,
  ShieldCheck,
  Globe,
  Lock,
  Check,
  Layers,
  Monitor,
  HelpCircle,
  Plus,
  Minus,
  CreditCard,
  Gift,
  Calculator,
  ArrowDown,
  X,
  Percent
} from "lucide-react";

// Analytics Tracking Utility
const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  console.log(`[Analytics] Event: ${eventName}`, params);
  // In a real app, this would call window.gtag('event', eventName, params)
  // or another analytics provider.
};

const RoiCalculator = () => {
  const [traffic, setTraffic] = useState(10000);
  const [currentCr, setCurrentCr] = useState(2);
  const [targetCr, setTargetCr] = useState(4);
  const [aov, setAov] = useState(50);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentRevenue = traffic * (currentCr / 100) * aov;
  const targetRevenue = traffic * (targetCr / 100) * aov;
  const lift = targetRevenue - currentRevenue;

  const handleCalculate = () => {
    trackEvent('roi_calc_use', { traffic, currentCr, targetCr, aov, lift });
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-8 rounded-[40px] bg-zinc-900/60 border border-zinc-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-orange-500" />
        </div>
        <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">ROI Calculator</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Monthly Traffic</label>
            <input 
              type="range" min="1000" max="100000" step="1000"
              value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-white italic">
              <span>{traffic.toLocaleString()} visitors</span>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Current CR (%)</label>
            <input 
              type="range" min="0.1" max="10" step="0.1"
              value={currentCr} onChange={(e) => setCurrentCr(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-white italic">
              <span>{currentCr}%</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Target CR (%)</label>
            <input 
              type="range" min="0.1" max="15" step="0.1"
              value={targetCr} onChange={(e) => setTargetCr(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-white italic">
              <span>{targetCr}%</span>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Average Order Value ($)</label>
            <input 
              type="range" min="10" max="500" step="10"
              value={aov} onChange={(e) => setAov(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-white italic">
              <span>${aov}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-orange-500 text-white text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isCalculating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4"
            >
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Calculating Potential...</p>
            </motion.div>
          ) : showSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest">ROI Optimized!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCalculate}
              className="cursor-pointer group"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Monthly Revenue Lift</p>
              <p className="text-5xl font-black italic tracking-tighter group-hover:scale-105 transition-transform">${lift.toLocaleString()}</p>
              <p className="text-xs font-medium mt-4 opacity-90">That's ${ (lift * 12).toLocaleString() } in extra annual revenue.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SignupModal = ({ isOpen, onClose, trafficSource, onSignupSuccess }: any) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('form_start', { form_id: 'signup_modal', form_name: 'Trial Signup' });

    // Mock API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      trackEvent('form_complete', { 
        form_id: 'signup_modal', 
        lead_type: 'trial', 
        traffic_source: trafficSource 
      });
      setTimeout(() => {
        onSignupSuccess(email);
        onClose();
        setIsSuccess(false);
        setEmail("");
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[48px] p-12 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
            <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-4">You're In!</h3>
                  <p className="text-zinc-400">Redirecting to your Winner's Dashboard...</p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Target className="w-10 h-10 text-orange-500" />
                  </div>
                  
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-4">Join the Inner Circle.</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    Start your <span className="text-white font-bold">14-day free trial</span> today. No credit card required.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-5 rounded-full bg-zinc-950 border border-zinc-800 text-white focus:border-orange-500 focus:outline-none transition-all"
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>Start Winning Free <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                  <p className="mt-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    By signing up, you agree to our <a href="#" className="underline hover:text-zinc-400">Terms</a> and <a href="#" className="underline hover:text-zinc-400">Privacy Policy</a>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ExitIntentModal = ({ isOpen, onClose, onSignup }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[48px] p-12 text-center overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Percent className="w-10 h-10 text-orange-500" />
          </div>
          
          <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-4">Wait! Don't Leave Empty Handed.</h3>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            We want you to win. Grab <span className="text-white font-bold">25% OFF</span> your first month and start scaling today.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                trackEvent('cta_click', { cta_location: 'exit_intent', cta_text: 'Claim My 25% Discount' });
                onSignup();
                onClose();
              }}
              className="w-full py-5 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
            >
              Claim My 25% Discount
            </button>
            <button onClick={onClose} className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-400 transition-colors">
              No thanks, I'll pay full price later
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const PricingCard = ({ tier, price, description, features, isPopular, billingCycle, onSignup }: any) => (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-[40px] border transition-all duration-500 ${isPopular ? 'bg-white text-zinc-950 border-orange-500 scale-105 shadow-2xl z-10' : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-700 shadow-xl hover:shadow-orange-500/5'}`}
    >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h4 className={`text-xl font-black uppercase tracking-tighter italic mb-2 ${isPopular ? 'text-zinc-950' : 'text-white'}`}>{tier}</h4>
      <p className="text-sm font-medium opacity-70">{description}</p>
    </div>
    <div className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black italic">$</span>
        <span className="text-6xl font-black italic tracking-tighter">{price}</span>
        <span className="text-sm font-bold opacity-60">/{billingCycle === 'monthly' ? 'mo' : 'mo'}</span>
      </div>
      {billingCycle === 'yearly' && (
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-2">Billed Annually</p>
      )}
    </div>
    <div className="space-y-4 mb-10">
      {features.map((feature: string, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <Check className={`w-5 h-5 ${isPopular ? 'text-orange-500' : 'text-orange-500'}`} />
          <span className="text-sm font-medium">{feature}</span>
        </div>
      ))}
    </div>
    <button 
      onClick={() => {
        trackEvent('cta_click', { cta_location: 'pricing', cta_tier: tier, cta_text: 'Get Started' });
        onSignup();
      }}
      className={`w-full py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${isPopular ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
    >
      Get Started <ArrowRight className="w-4 h-4" />
    </button>
  </motion.div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-900">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all ${isOpen ? 'bg-orange-500 border-orange-500 rotate-45' : 'group-hover:border-zinc-700'}`}>
          <Plus className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-zinc-500'}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 text-sm leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, benefit, description, stat, cta, interaction }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-[32px] bg-zinc-900/40 border border-zinc-800/50 hover:border-orange-500/30 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-orange-500/5"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500">
            <Icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Proof Point</p>
            <p className="text-sm font-black text-white italic">{stat}</p>
          </div>
        </div>

        <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white mb-2">{benefit}</h3>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">{title}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {description}
        </p>

        <div className="h-24 mb-8 rounded-2xl bg-zinc-950/50 border border-zinc-800/50 flex items-center justify-center overflow-hidden">
          {interaction(isHovered)}
        </div>

        <button className="flex items-center gap-2 text-sm font-bold text-white group/btn">
          {cta} <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, company, quote, metric, image }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/60 transition-all group"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/20">
        <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{name}</h4>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{company}</p>
      </div>
    </div>
    <div className="relative mb-6">
      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-500/10" />
      <p className="text-zinc-300 text-sm leading-relaxed italic relative z-10">"{quote}"</p>
    </div>
    <div className="pt-6 border-t border-zinc-800">
      <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Key Result</p>
      <p className="text-lg font-black text-white italic tracking-tight">{metric}</p>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description, time, stat, visual, isActive }: any) => (
  <div className={`relative p-8 rounded-[40px] transition-all duration-500 ${isActive ? 'bg-white text-zinc-950 scale-105 shadow-2xl z-10' : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800'}`}>
    <div className="flex items-center justify-between mb-8">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black italic ${isActive ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
        {number}
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Time Estimate</p>
        <p className={`text-xs font-bold ${isActive ? 'text-zinc-950' : 'text-zinc-300'}`}>{time}</p>
      </div>
    </div>
    <h4 className={`text-2xl font-black uppercase tracking-tighter italic mb-3 ${isActive ? 'text-zinc-950' : 'text-white'}`}>{title}</h4>
    <p className="text-sm font-medium leading-relaxed mb-8">{description}</p>
    
    <div className="aspect-video rounded-2xl bg-zinc-950/10 mb-8 overflow-hidden border border-zinc-200/20">
      {visual}
    </div>

    <div className={`p-4 rounded-2xl ${isActive ? 'bg-zinc-100' : 'bg-zinc-950/30'}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Winner's Stat</p>
      <p className={`text-sm font-black italic ${isActive ? 'text-orange-500' : 'text-zinc-300'}`}>{stat}</p>
    </div>
  </div>
);

const StickyFooter = ({ trafficSource }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[60] md:left-auto md:right-12 md:w-[400px]"
        >
          <div className="p-6 rounded-[32px] bg-white text-zinc-950 shadow-2xl border border-zinc-200 flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Ready to Win?</p>
              <p className="text-sm font-bold leading-tight">Start building your highest-converting page today.</p>
            </div>
            <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap">
              {trafficSource === "cold" ? "Start Free" : "Join Now"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [trafficSource, setTrafficSource] = useState<"cold" | "warm">("cold");
  const [activeStep, setActiveStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const isReferral = window.location.search.includes("ref=winner");
    if (isReferral) setTrafficSource("warm");

    const interval = setInterval(() => {
      setActiveStep(prev => (prev % 3) + 1);
    }, 5000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsExitModalOpen(true);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <ScrollToTop />
      <StickyFooter trafficSource={trafficSource} />
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
        trafficSource={trafficSource}
        onSignupSuccess={(email: string) => {
          setUserEmail(email);
          setIsOnboardingOpen(true);
        }}
      />
      <OnboardingFlow 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
        userEmail={userEmail || "Winner"}
      />
      <ExitIntentModal 
        isOpen={isExitModalOpen} 
        onClose={() => setIsExitModalOpen(false)} 
        onSignup={() => setIsSignupModalOpen(true)}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic font-display">Inner Circle Winners</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link to="/commerce" className="hover:text-white transition-colors">E-Comm</Link>
            <Link to="/agencies" className="hover:text-white transition-colors">Agencies</Link>
            <Link to="/saas" className="hover:text-white transition-colors">SaaS</Link>
            <div className="w-[1px] h-4 bg-zinc-800" />
            <Link to="/" className="hover:text-white transition-colors">What We Deliver</Link>
            <Link to="/" className="hover:text-white transition-colors">How It Works</Link>
            <Link to="/" className="hover:text-white transition-colors">Proof</Link>
            <Link to="/" className="hover:text-white transition-colors">Pricing</Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackEvent('cta_click', { cta_location: 'navbar', cta_text: trafficSource === "cold" ? "Start Building" : "Join Inner Circle" });
                setIsSignupModalOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-orange-500 hover:text-white transition-all font-bold text-sm min-h-[48px] flex items-center gap-2 group"
            >
              {trafficSource === "cold" ? "Start Building" : "Join Inner Circle"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-zinc-900 bg-zinc-950 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-sm font-bold uppercase tracking-widest text-zinc-400">
                <Link to="/commerce" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">E-Comm</Link>
                <Link to="/agencies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Agencies</Link>
                <Link to="/saas" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">SaaS</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">What We Deliver</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">How It Works</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Proof</Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Pricing</Link>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSignupModalOpen(true);
                  }}
                  className="w-full py-4 rounded-full bg-orange-500 text-white font-bold text-sm"
                >
                  {trafficSource === "cold" ? "Start Building" : "Join Inner Circle"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Routes>
        <Route path="/commerce" element={<VerticalLandingPage vertical="commerce" onSignup={() => setIsSignupModalOpen(true)} />} />
        <Route path="/agencies" element={<VerticalLandingPage vertical="agencies" onSignup={() => setIsSignupModalOpen(true)} />} />
        <Route path="/saas" element={<VerticalLandingPage vertical="saas" onSignup={() => setIsSignupModalOpen(true)} />} />
        <Route path="/dashboard" element={<PerformanceDashboard />} />
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="w-3 h-3" /> 2.5M+ Conversions Optimized
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8 font-display">
                Stop Guessing. <br />
                Start <span className="text-orange-500">Winning</span>.
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12">
                Stop wasting weeks on development. Launch battle-tested, AI-optimized pages that turn cold traffic into loyal customers in minutes. No code. No guesswork. Just growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackEvent('cta_click', { cta_location: 'hero', cta_text: trafficSource === "cold" ? "Start Building Free" : "Join Inner Circle" });
                    setIsSignupModalOpen(true);
                  }}
                  animate={{ 
                    boxShadow: ["0 0 0 0 rgba(249, 115, 22, 0)", "0 0 0 20px rgba(249, 115, 22, 0)"],
                  }}
                  transition={{ 
                    boxShadow: { repeat: Infinity, duration: 1.5 }
                  }}
                  className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all flex items-center gap-2 group shadow-xl shadow-orange-500/20 min-h-[56px]"
                >
                  {trafficSource === "cold" ? "Start Building Free" : "Join Inner Circle"} 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackEvent('cta_click', { cta_location: 'hero', cta_text: 'See How It Works' })}
                  className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold text-lg hover:bg-zinc-800 transition-all flex items-center gap-2 min-h-[56px] group"
                >
                  <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" /> See How It Works
                </motion.button>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-zinc-500">
                  <span className="text-white font-bold tracking-tight">10,000+</span> winners built this month.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative group"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-8 bg-orange-500/20 blur-[100px] rounded-full -z-10"
              />
              <div className="relative z-10 p-2 rounded-[48px] bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                <div className="rounded-[40px] overflow-hidden bg-zinc-950 aspect-[4/5] relative border border-zinc-700/50">
                  <img 
                    src="https://picsum.photos/seed/app-ui/800/1000" 
                    alt="Inner Circle App UI" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 left-8 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Live Optimization</span>
                    </div>
                    <p className="text-lg font-black italic text-white">+34% CR</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    className="absolute bottom-8 right-8 p-4 rounded-2xl bg-orange-500 shadow-xl cursor-pointer"
                  >
                    <Zap className="w-6 h-6 text-white fill-white" />
                  </motion.div>
                </div>
              </div>
              <div className="absolute -inset-4 border border-orange-500/20 rounded-[56px] pointer-events-none group-hover:border-orange-500/40 transition-colors" />
              <div className="absolute -inset-8 border border-orange-500/10 rounded-[64px] pointer-events-none group-hover:border-orange-500/20 transition-colors" />
            </motion.div>
          </div>

          {/* Trust Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24 pt-12 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
            {['Stripe', 'Airbnb', 'Shopify', 'Nike', 'Tesla'].map((logo) => (
              <span key={logo} className="text-xl font-black text-white uppercase italic tracking-tighter">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-zinc-900/20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">The Winner's Workflow</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic font-display">Getting Started in 3 Steps</h3>
            <p className="text-zinc-400 mt-6 max-w-2xl mx-auto">Zero friction. Immediate ROI. Your journey from blank page to conversion machine starts here.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <StepCard 
              number="01"
              title="Pick Your Winner"
              description="Stop starting from scratch. Choose from 500+ battle-tested templates that have already generated $250M+ in revenue for brands like yours."
              time="2 Minutes"
              stat="92% of winners launch their first page in under 15 minutes"
              isActive={activeStep === 1}
              visual={
                <div className="w-full h-full flex items-center justify-center bg-zinc-100/10">
                  <Layout className="w-12 h-12 text-orange-500 opacity-50" />
                </div>
              }
            />
            <StepCard 
              number="02"
              title="Optimize with AI"
              description="Let our AI engine rewrite your copy and rearrange your layout based on real-time conversion data. No more guessing what works."
              time="5 Minutes"
              stat="Users see an average 34% lift in conversion rate within 48 hours"
              isActive={activeStep === 2}
              visual={
                <div className="w-full h-full flex items-center justify-center bg-zinc-100/10">
                  <Split className="w-12 h-12 text-orange-500 opacity-50" />
                </div>
              }
            />
            <StepCard 
              number="03"
              title="Scale Your Revenue"
              description="Watch your dashboard turn green. Our system automatically routes traffic to your highest-performing variations while you focus on growth."
              time="Instant"
              stat="Inner Circle members save an average of 15 hours per week on dev"
              isActive={activeStep === 3}
              visual={
                <div className="w-full h-full flex items-center justify-center bg-zinc-100/10">
                  <TrendingUp className="w-12 h-12 text-orange-500 opacity-50" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section id="features" className="py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">What We Deliver</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-tight font-display">
                Engineered for <span className="text-orange-500">Outcomes</span>, <br />Not Just Features.
              </h3>
            </div>
            <div className="p-8 rounded-[40px] bg-zinc-900/50 border border-zinc-800">
              <p className="text-zinc-400 mb-8 italic">"The ROI was immediate. We stopped guessing and started winning."</p>
              <button className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                Try Free for 14 Days
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Cpu}
              title="AI-Powered Page Builder"
              benefit="Launch 82% Faster"
              description="Stop wasting weeks on development. Our AI engine generates high-converting layouts tailored to your niche instantly, so you can go live today and start scaling your revenue."
              stat="82% Faster Launch"
              cta="Explore AI Builder"
              interaction={(hover: boolean) => (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: hover ? "100%" : "0%" }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {hover ? "Generating Winner Layout..." : "Hover to Generate"}
                  </span>
                </div>
              )}
            />

            <FeatureCard 
              icon={Split}
              title="Built-in A/B Testing"
              benefit="Stop Leaving Money on the Table"
              description="Eliminate guesswork by letting data decide. Our automated split testing finds your winning variations while you sleep, maximizing every dollar spent."
              stat="+34% CR Lift"
              cta="See A/B Testing"
              interaction={(hover: boolean) => (
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-colors ${hover ? 'border-zinc-700 bg-zinc-800 text-zinc-500' : 'border-orange-500 bg-orange-500/10 text-orange-500'}`}>A</div>
                  <div className="w-8 h-[2px] bg-zinc-800" />
                  <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-colors ${hover ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-700 bg-zinc-800 text-zinc-500'}`}>B</div>
                </div>
              )}
            />

            <FeatureCard 
              icon={UserCheck}
              title="Real-Time Personalization"
              benefit="Turn Every Click into a Customer"
              description="Deliver a unique experience to every visitor based on their intent. Maximize the value of every single click by showing them exactly what they need to see."
              stat="2.5x Engagement"
              cta="Learn Personalization"
              interaction={(hover: boolean) => (
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={hover ? "b" : "a"}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm font-bold text-white italic"
                    >
                      {hover ? "Hello, CEO from London!" : "Hello, Visitor!"}
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            />

            <FeatureCard 
              icon={BarChart3}
              title="Conversion Analytics"
              benefit="Fix Your Funnel Leaks"
              description="Stop flying blind. Our visual dashboard highlights friction points in real-time, giving you the clarity to fix leaks and recover lost revenue instantly."
              stat="90% Leak Detection"
              cta="View Analytics"
              interaction={(hover: boolean) => (
                <div className="flex items-end gap-1 h-12">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: hover ? `${h}%` : "20%" }}
                      className="w-3 bg-orange-500 rounded-t-sm"
                    />
                  ))}
                </div>
              )}
            />

            <FeatureCard 
              icon={Layout}
              title="Template Library (500+)"
              benefit="Start with a $250M Advantage"
              description="Skip the blank page syndrome. Access over 500+ battle-tested templates that have generated over $250M in verified revenue for the world's top 1% of brands."
              stat="12k+ Brands"
              cta="Browse Templates"
              interaction={(hover: boolean) => (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ x: hover ? -20 * i : 0 }}
                      className="w-16 h-20 bg-zinc-800 rounded-md border border-zinc-700 shrink-0"
                    />
                  ))}
                </div>
              )}
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[32px] bg-orange-500 flex flex-col justify-center items-center text-center text-white"
            >
              <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Ready to Win?</h4>
              <p className="text-sm font-medium mb-8 opacity-90">Join the inner circle and start optimizing your future today.</p>
              <button className="w-full py-4 rounded-full bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-all flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">The Proof</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic font-display">Results That Speak Louder</h3>
          </div>

          {/* Quantified Wins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
              <p className="text-5xl font-black text-white italic mb-2">2.1% → 5.8%</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Conversion Rate Lift in 60 Days</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
              <p className="text-5xl font-black text-white italic mb-2">15h/Week</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Saved on Page Redesign & Testing</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
              <p className="text-5xl font-black text-white italic mb-2">340%</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Year-Over-Year Revenue Growth</p>
            </div>
          </div>

          {/* Logo Marquee */}
          <div className="mb-32 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
            <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
              {['Stripe', 'Airbnb', 'Shopify', 'Nike', 'Tesla', 'HubSpot', 'Slack', 'Zoom', 'Figma', 'Notion'].map((logo) => (
                <span key={logo} className="text-3xl font-black text-zinc-800 uppercase italic tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default">
                  {logo}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {['Stripe', 'Airbnb', 'Shopify', 'Nike', 'Tesla', 'HubSpot', 'Slack', 'Zoom', 'Figma', 'Notion'].map((logo) => (
                <span key={`${logo}-2`} className="text-3xl font-black text-zinc-800 uppercase italic tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            <TestimonialCard 
              name="Sarah J."
              company="CEO @ Bloom"
              quote="Inner Circle tripled our lead flow. The AI builder is magic."
              metric="2.1% → 5.8% CR"
              image="https://i.pravatar.cc/100?u=sarah"
            />
            <TestimonialCard 
              name="Mark T."
              company="Agency Owner @ ScaleUp"
              quote="Saved 15 hours/week on dev. My team is finally focused on strategy."
              metric="15h Saved/Week"
              image="https://i.pravatar.cc/100?u=mark"
            />
            <TestimonialCard 
              name="Elena R."
              company="E-com Director @ Luxe"
              quote="Revenue grew 340% YoY. The personalization engine is elite."
              metric="340% YoY Growth"
              image="https://i.pravatar.cc/100?u=elena"
            />
            <TestimonialCard 
              name="David K."
              company="Founder @ TechFlow"
              quote="The A/B testing is a game changer. We found our winner in 48 hours."
              metric="+42% AOV"
              image="https://i.pravatar.cc/100?u=david"
            />
            <TestimonialCard 
              name="Jessica M."
              company="Marketing @ SaaSify"
              quote="Launched 10 pages in one day. Unheard of before Inner Circle."
              metric="10x Launch Speed"
              image="https://i.pravatar.cc/100?u=jessica"
            />
            <TestimonialCard 
              name="Ryan P."
              company="Growth @ FitLife"
              quote="Best ROI of any tool we use. The analytics spot leaks instantly."
              metric="5.2x ROAS"
              image="https://i.pravatar.cc/100?u=ryan"
            />
            <TestimonialCard 
              name="Aisha B."
              company="Creative @ StudioX"
              quote="Templates that actually convert. No more blank page syndrome."
              metric="92% NPS"
              image="https://i.pravatar.cc/100?u=aisha"
            />
            <TestimonialCard 
              name="Tom H."
              company="Ops @ GlobalLogistics"
              quote="Simplified our entire funnel. CAC dropped significantly."
              metric="-40% CAC"
              image="https://i.pravatar.cc/100?u=tom"
            />
          </div>

          {/* Community Stats & Trust */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="p-12 rounded-[40px] bg-orange-500 text-white">
              <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Community Metrics</h4>
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Active Builders</span>
                  <span className="text-2xl font-black italic">15,000+</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Winning Variations Tested</span>
                  <span className="text-2xl font-black italic">2 Million+</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Net Promoter Score</span>
                  <span className="text-2xl font-black italic">92% NPS</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white">SOC 2 Type II</p>
                <p className="text-[10px] text-zinc-500 mt-1">Enterprise Security</p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center text-center">
                <Lock className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white">GDPR Compliant</p>
                <p className="text-[10px] text-zinc-500 mt-1">Global Privacy</p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center text-center">
                <Globe className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white">99.99% Uptime</p>
                <p className="text-[10px] text-zinc-500 mt-1">SLA Guaranteed</p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center text-center">
                <Users className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white">24/7 Support</p>
                <p className="text-[10px] text-zinc-500 mt-1">Winner's Concierge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-orange-500/5 blur-[160px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Invest in Winning</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic font-display">Simple, Performance-Driven Pricing</h3>
            
            <div className="mt-12 inline-flex items-center p-1 rounded-full bg-zinc-900 border border-zinc-800">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-zinc-950' : 'text-zinc-500 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-white text-zinc-950' : 'text-zinc-500 hover:text-white'}`}
              >
                Yearly <span className="text-orange-500 ml-1">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center mb-32">
            <PricingCard 
              tier="Solo Builder"
              price={billingCycle === 'monthly' ? '0' : '0'}
              description="Launch Your First Winner. Start scaling your solo venture with zero upfront cost."
              billingCycle={billingCycle}
              onSignup={() => setIsSignupModalOpen(true)}
              features={[
                "1 High-Converting Website",
                "Basic AI Page Generation",
                "1,000 Monthly Visitors",
                "Community Access",
                "Email Support"
              ]}
            />
            <PricingCard 
              tier="Agency Pro"
              price={billingCycle === 'monthly' ? '129' : '99'}
              description="Scale Your Agency. Deliver 10x more value to clients with AI-optimized speed."
              isPopular={true}
              billingCycle={billingCycle}
              onSignup={() => setIsSignupModalOpen(true)}
              features={[
                "20 High-Converting Websites",
                "Full AI Optimization Suite",
                "Unlimited A/B Testing",
                "50,000 Monthly Visitors",
                "Priority Support",
                "White-label Reports"
              ]}
            />
            <PricingCard 
              tier="E-com Team"
              price={billingCycle === 'monthly' ? '499' : '399'}
              description="Maximize Every Transaction. Enterprise-grade optimization for high-volume revenue."
              billingCycle={billingCycle}
              onSignup={() => setIsSignupModalOpen(true)}
              features={[
                "Unlimited Websites",
                "Enterprise AI Model",
                "500,000 Monthly Visitors",
                "Dedicated Success Concierge",
                "Advanced Analytics",
                "Custom Integrations"
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h4 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-6">Calculate Your <span className="text-orange-500">Winning</span> Potential</h4>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                See exactly how much revenue you're leaving on the table. Our ROI calculator uses your real data to project the impact of elite optimization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-bold text-zinc-300">30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-bold text-zinc-300">No Questions Asked Refund</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <RoiCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Common Objections</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight mb-8 font-display">
                Everything You Need <br />To Know Before <br />You <span className="text-orange-500">Win</span>.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-12">
                Still have questions? Our team of winners is ready to help you scale. Reach out anytime for a personalized strategy session.
              </p>
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
                <p className="text-sm font-bold text-white mb-4">Need a custom demo?</p>
                <button className="flex items-center gap-2 text-orange-500 font-bold text-sm group">
                  Book a Strategy Call <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <FAQItem 
                question="Will I actually have time to learn this? I'm already swamped."
                answer="We get it—you’re running a business, not a development shop. Inner Circle Winners was built to eliminate the 'learning curve.' Our AI builder handles the layout, copy, and optimization logic for you. 92% of our members launch their first high-converting page in under 15 minutes."
              />
              <FAQItem 
                question="Is it better than other landing page builders?"
                answer="While others focus on 'pretty design,' we focus on 'winning conversions.' We aren't just a builder; we are a conversion engine powered by 2.5M+ data points. Users who switch to Inner Circle see an average 34% lift in conversion rate within the first 60 days."
              />
              <FAQItem 
                question="Do I need coding knowledge, or is it really no-code?"
                answer="It is 100% no-code. If you can drag a mouse and type a sentence, you can build an elite landing page. Over 10,000 non-technical founders use our platform every day to manage their entire marketing funnel without writing a single line of code."
              />
              <FAQItem 
                question="What if we don't see a conversion lift? Will we get our money back?"
                answer="Investing in your growth should never feel like a gamble. We offer a 30-day, no-questions-asked money-back guarantee on all paid plans. If you're not winning, you don't pay. It's that simple."
              />
              <FAQItem 
                question="How much setup is required before we see results?"
                answer="Onboarding takes less than 5 minutes. Connect your domain, pick a template, and you're live. Our average member sees their first conversion within 48 hours of joining."
              />
              <FAQItem 
                question="Is our data secure and GDPR compliant?"
                answer="Your data and your customers' privacy are our top priority. We are SOC 2 Type II certified and fully GDPR compliant. We maintain 99.99% uptime and use enterprise-grade encryption to keep your assets safe."
              />
              <FAQItem 
                question="Do we get real support, or just a help desk chatbot?"
                answer="You'll never be stuck talking to a bot. Every member gets 24/7 access to our 'Winner's Concierge' team—real humans who are experts in conversion optimization, ready to help you scale."
              />
              <FAQItem 
                question="What happens if I want to leave? Do I lose my pages?"
                answer="Platform lock-in is a nightmare, so we built a 'Full Export' feature. At any time, you can download the raw HTML/CSS of your pages and host them anywhere else. You own your assets; we just help them win."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="p-16 md:p-24 rounded-[64px] bg-orange-500 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-12 font-display">
                Stop Building. <br />Start <span className="text-zinc-950">Winning</span>.
              </h3>
              <p className="text-xl md:text-2xl font-medium mb-16 opacity-90 max-w-2xl mx-auto">
                Join 15,000+ ambitious brands who have eliminated technical debt and maximized their growth.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => {
                    trackEvent('cta_click', { cta_location: 'final_cta', cta_text: trafficSource === "cold" ? "Start Building" : "Join Inner Circle" });
                    setIsSignupModalOpen(true);
                  }}
                  className="px-10 py-6 rounded-full bg-zinc-950 text-white font-bold text-xl hover:bg-zinc-900 transition-all flex items-center gap-3 shadow-2xl"
                >
                  {trafficSource === "cold" ? "Start Building" : "Join Inner Circle"} <ArrowRight className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => {
                    trackEvent('cta_click', { cta_location: 'final_cta', cta_text: 'See Pricing' });
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-6 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xl hover:bg-white/20 transition-all"
                >
                  See Pricing
                </button>
              </div>
              <p className="mt-12 text-sm font-bold uppercase tracking-widest opacity-70">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">Inner Circle Winners</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                The elite website generation and optimization platform for ambitious entrepreneurs and agencies. Build faster, optimize ruthlessly, and win bigger.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Platform</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link to="/commerce" className="hover:text-orange-500 transition-colors">E-Comm</Link></li>
                <li><Link to="/agencies" className="hover:text-orange-500 transition-colors">Agencies</Link></li>
                <li><Link to="/saas" className="hover:text-orange-500 transition-colors">SaaS</Link></li>
                <li><Link to="/" className="hover:text-orange-500 transition-colors">AI Builder</Link></li>
                <li><Link to="/" className="hover:text-orange-500 transition-colors">A/B Testing</Link></li>
                <li><Link to="/" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
                <li><Link to="/" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                <li><Link to="/dashboard" className="hover:text-orange-500 transition-colors">Performance Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Company</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">© 2026 Inner Circle Winners. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Monitor className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><ShieldCheck className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
          </>
        } />
      </Routes>
    </div>
  );
}
