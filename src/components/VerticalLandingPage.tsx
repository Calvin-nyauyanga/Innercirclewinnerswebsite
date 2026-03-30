import { motion } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  Zap, 
  Users, 
  BarChart3, 
  Cpu, 
  Split, 
  UserCheck, 
  Layout, 
  Target, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

interface VerticalLandingPageProps {
  vertical: "commerce" | "agencies" | "saas";
  onSignup: () => void;
}

const verticalData = {
  commerce: {
    accent: "orange-500",
    headline: "Increase your AOV & conversion rate.",
    subheadline: "Most e-comm brands do within 30 days.",
    description: "Stop losing money on abandoned carts and low-intent traffic. Use the AI-powered builder designed specifically for high-volume commerce.",
    socialProof: "2.1M+ products optimized across 4,500+ global stores.",
    features: [
      {
        icon: Target,
        title: "One-Click Checkout Optimization",
        description: "Reduce friction at the most critical stage of the funnel with battle-tested checkout layouts."
      },
      {
        icon: Zap,
        title: "Dynamic Upsell Engine",
        description: "Increase AOV by showing the right product at the right time using AI-driven recommendations."
      },
      {
        icon: Layout,
        title: "Mobile-First Performance",
        description: "70% of your traffic is mobile. We make sure it converts like desktop with zero layout shift."
      }
    ],
    caseStudy: {
      quote: "Inner Circle Winners didn't just change our site; they changed our bottom line. We saw a 340% revenue increase in just 90 days.",
      author: "Sarah J., Head of Growth at LuxeCommerce",
      stat: "340% Revenue Increase"
    },
    cta: "Start optimizing (free for 14 days)",
    logos: ["Shopify Plus", "Magento", "BigCommerce", "WooCommerce", "Salesforce"]
  },
  agencies: {
    accent: "blue-500",
    headline: "Build client sites in 1/3 the time.",
    subheadline: "And resell the platform.",
    description: "The white-label optimization platform built for agencies who want to scale without adding headcount. Deliver elite results, faster.",
    socialProof: "500+ agencies building 12,000+ client sites on Inner Circle.",
    features: [
      {
        icon: UserCheck,
        title: "White-Label Reporting",
        description: "Send high-impact conversion reports under your own brand. Prove ROI every single week."
      },
      {
        icon: Layout,
        title: "Bulk Template Management",
        description: "Deploy winning structures across multiple client accounts in seconds. Standardize excellence."
      },
      {
        icon: Cpu,
        title: "Multi-Tenant Dashboard",
        description: "Manage 100+ clients from a single, high-speed interface. Total control, zero friction."
      }
    ],
    caseStudy: {
      quote: "We doubled our revenue per project by switching to Inner Circle. We spend less time coding and more time strategizing for our clients.",
      author: "Mark T., Founder of ScaleAgency",
      stat: "2x Revenue Per Project"
    },
    cta: "Schedule a partner call",
    logos: ["WPP", "Publicis", "Omnicom", "Dentsu", "Havas"]
  },
  saas: {
    accent: "emerald-500",
    headline: "Lower CAC. Higher retention.",
    subheadline: "Through optimized signup flows.",
    description: "Your product is great. Your signup flow is the bottleneck. Fix it with the only builder optimized for the SaaS lifecycle.",
    socialProof: "10M+ signups optimized for the world's fastest-growing SaaS brands.",
    features: [
      {
        icon: TrendingUp,
        title: "Trial-to-Paid Optimization",
        description: "Specialized blocks designed to move users from 'Free' to 'Pro' by highlighting value at the right moment."
      },
      {
        icon: BarChart3,
        title: "Cohort Analysis Integration",
        description: "See exactly which landing page variants bring in the highest-LTV users. Optimize for quality, not just quantity."
      },
      {
        icon: Split,
        title: "Frictionless Onboarding",
        description: "Build multi-step signup flows that feel like a native part of your app. Reduce drop-off by 40%."
      }
    ],
    caseStudy: {
      quote: "Inner Circle helped us bridge the gap between marketing and product. We increased our trial-to-paid conversion from 12% to 28% in two months.",
      author: "Elena R., VP Product at SaaSFlow",
      stat: "12% → 28% Conversion"
    },
    cta: "Book a strategy call",
    logos: ["Slack", "Zoom", "Figma", "Notion", "Airtable"]
  }
};

export default function VerticalLandingPage({ vertical, onSignup }: VerticalLandingPageProps) {
  const data = verticalData[vertical];
  const accentColor = `text-${data.accent}`;
  const accentBg = `bg-${data.accent}`;
  const accentBorder = `border-${data.accent}/20`;
  const accentShadow = `shadow-${data.accent}/20`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${accentBg}/10 blur-[140px] rounded-full`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8 font-display">
                {data.headline} <br />
                <span className={accentColor}>{data.subheadline}</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignup}
                  className={`px-8 py-4 md:px-10 md:py-5 rounded-full ${accentBg} text-white font-bold text-lg hover:opacity-90 transition-all flex items-center gap-2 group shadow-xl ${accentShadow} min-h-[56px]`}
                >
                  {data.cta} 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              <div className="mt-12 flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                {data.socialProof}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className={`aspect-square rounded-[40px] bg-zinc-900/50 border ${accentBorder} p-8 flex flex-col justify-between relative overflow-hidden group`}>
                <div className={`absolute inset-0 ${accentBg}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${accentBg}/20 flex items-center justify-center mb-8`}>
                    <Star className={`w-8 h-8 ${accentColor}`} />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Winning Result</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Our AI engine analyzed 2.5M+ data points to generate this high-converting structure.
                  </p>
                </div>
                <div className="relative z-10 pt-8 border-t border-zinc-800">
                  <div className={`text-5xl font-black ${accentColor} italic mb-2`}>{data.caseStudy.stat}</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Verified Conversion Lift</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-50">
            {data.logos.map(logo => (
              <span key={logo} className="text-xl font-black uppercase italic tracking-tighter text-zinc-400">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className={`text-[10px] font-bold uppercase tracking-[0.4em] ${accentColor} mb-6`}>The Edge</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic font-display">Engineered for {vertical === 'commerce' ? 'Revenue' : vertical === 'agencies' ? 'Scale' : 'Growth'}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-8 group-hover:${accentBg} transition-all`}>
                  <feature.icon className={`w-7 h-7 ${accentColor} group-hover:text-white transition-colors`} />
                </div>
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">{feature.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-32 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`p-12 md:p-24 rounded-[60px] bg-zinc-900 border ${accentBorder} relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-96 h-96 ${accentBg}/10 blur-[120px] rounded-full -mr-48 -mt-48`} />
            <div className="relative z-10 max-w-3xl">
              <Star className={`w-12 h-12 ${accentColor} mb-8`} />
              <p className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-12">
                "{data.caseStudy.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden">
                  <img src="https://picsum.photos/seed/ceo/64/64" alt="CEO" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">{data.caseStudy.author}</h5>
                  <p className={`text-sm font-bold ${accentColor} uppercase tracking-widest`}>{data.caseStudy.stat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8 font-display leading-none">
              Ready to <span className={accentColor}>Win</span>?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join the world's most ambitious {vertical === 'commerce' ? 'brands' : vertical === 'agencies' ? 'agencies' : 'SaaS companies'} and start optimizing your future today.
            </p>
            <button 
              onClick={onSignup}
              className={`px-12 py-6 rounded-full ${accentBg} text-white font-bold text-xl hover:opacity-90 transition-all shadow-2xl ${accentShadow}`}
            >
              {data.cta}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
