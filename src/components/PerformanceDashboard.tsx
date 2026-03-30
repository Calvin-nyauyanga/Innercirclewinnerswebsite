import { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Calendar,
  Download,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";

const performanceData = [
  { week: "W1", cr: 2.1, traffic: 10200, conversions: 214 },
  { week: "W2", cr: 2.2, traffic: 11500, conversions: 253 },
  { week: "W3", cr: 2.1, traffic: 9800, conversions: 206 },
  { week: "W4", cr: 2.4, traffic: 12100, conversions: 290 },
  { week: "W5", cr: 2.6, traffic: 13400, conversions: 348 },
  { week: "W6", cr: 2.5, traffic: 12800, conversions: 320 },
  { week: "W7", cr: 2.8, traffic: 14200, conversions: 398 },
  { week: "W8", cr: 3.1, traffic: 15600, conversions: 484 },
];

const funnelData = [
  { name: "Homepage", value: 100, label: "100%" },
  { name: "Pricing", value: 32, label: "32%" },
  { name: "Signup", value: 12, label: "12%" },
  { name: "Success", value: 10.5, label: "10.5%" },
];

const abTests = [
  { 
    id: "T-001", 
    name: "Hero Headline Variation", 
    status: "Completed", 
    winner: "Variant B (+14% CR)", 
    confidence: "98%",
    date: "Mar 12, 2026"
  },
  { 
    id: "T-002", 
    name: "Pricing Table Layout", 
    status: "Running", 
    winner: "Variant A (Leading)", 
    confidence: "82%",
    date: "Mar 24, 2026"
  },
  { 
    id: "T-003", 
    name: "Social Proof Placement", 
    status: "Completed", 
    winner: "Variant A (No Change)", 
    confidence: "95%",
    date: "Feb 28, 2026"
  },
];

export default function PerformanceDashboard() {
  const [timeframe, setTimeframe] = useState("Last 8 Weeks");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2 font-display">
              Performance <span className="text-orange-500">Dashboard</span>
            </h1>
            <p className="text-zinc-400">Quarterly Conversion Review & A/B Testing Analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {timeframe}
            </div>
            <button className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all">
              <Download className="w-5 h-5 text-zinc-400" />
            </button>
            <button className="px-6 py-2 rounded-full bg-orange-500 text-white font-bold text-sm hover:opacity-90 transition-all">
              New Test
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Conversion Rate", value: "3.1%", delta: "+15.2%", icon: Target, color: "text-orange-500" },
            { label: "Total Traffic", value: "15,600", delta: "+8.4%", icon: Users, color: "text-blue-500" },
            { label: "Conversions", value: "484", delta: "+22.1%", icon: Zap, color: "text-emerald-500" },
            { label: "Revenue Impact", value: "$72,116", delta: "+18.5%", icon: BarChart3, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.delta.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.delta.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.delta}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                <div className="text-4xl font-black tracking-tighter italic">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Chart */}
          <div className="lg:col-span-8 p-8 rounded-[40px] bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Conversion Rate Trend</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  Current Quarter
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  Previous Quarter
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cr" 
                    stroke="#f97316" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorCr)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funnel Chart */}
          <div className="lg:col-span-4 p-8 rounded-[40px] bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-12">Conversion Funnel</h3>
            <div className="space-y-8">
              {funnelData.map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{item.name}</span>
                    <span className="text-sm font-black italic">{item.label}</span>
                  </div>
                  <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${i === 0 ? 'bg-orange-500' : i === 1 ? 'bg-orange-500/80' : i === 2 ? 'bg-orange-500/60' : 'bg-orange-500/40'}`}
                    />
                  </div>
                  {i < funnelData.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-px h-4 bg-zinc-800" />
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Dropoff: {Math.round(100 - (funnelData[i+1].value / item.value * 100))}%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* A/B Tests Table */}
        <div className="p-8 rounded-[40px] bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Active & Recent A/B Tests</h3>
            <button className="text-xs font-bold text-orange-500 uppercase tracking-widest hover:underline">View All Tests</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Test ID</th>
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Test Name</th>
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Winner / Current</th>
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Confidence</th>
                  <th className="text-left py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                  <th className="text-right py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {abTests.map((test) => (
                  <tr key={test.id} className="group hover:bg-zinc-800/30 transition-colors">
                    <td className="py-6 font-mono text-sm text-zinc-400">{test.id}</td>
                    <td className="py-6 font-bold text-white">{test.name}</td>
                    <td className="py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${test.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {test.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {test.status}
                      </div>
                    </td>
                    <td className="py-6">
                      <span className={`text-sm font-black italic ${test.winner.includes('+') ? 'text-emerald-500' : 'text-zinc-300'}`}>
                        {test.winner}
                      </span>
                    </td>
                    <td className="py-6 font-bold text-zinc-400">{test.confidence}</td>
                    <td className="py-6 text-sm text-zinc-500">{test.date}</td>
                    <td className="py-6 text-right">
                      <button className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
