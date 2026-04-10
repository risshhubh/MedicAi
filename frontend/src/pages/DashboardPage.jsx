import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileText, 
  MessageSquare, 
  Stethoscope,
  Heart,
  Droplets,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const stats = [
    { label: "Total Analyses", value: "12", icon: <FileText className="text-teal-600" />, trend: "+2 this week" },
    { label: "Consultations", value: "8", icon: <MessageSquare className="text-blue-600" />, trend: "Active" },
    { label: "Health Score", value: "94", icon: <Zap className="text-amber-600" />, trend: "Optimal" },
  ];

  const activities = [
    { title: "Blood Report Analysis", type: "Clinical", date: "2 hours ago", status: "Completed" },
    { title: "Medication Query: Amoxicillin", type: "Neural Consult", date: "1 day ago", status: "Verified" },
    { title: "X-Ray Interpretation", type: "Clinical", date: "3 days ago", status: "Archived" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Health Dashboard</h1>
          <p className="text-slate-500 font-medium italic">Welcome back. Here is your clinical overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-4xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/dashboard" className="flex items-center justify-between p-6 bg-white/10 hover:bg-white/15 rounded-[24px] border border-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold">New Ai Analysis</span>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/chat" className="flex items-center justify-between p-6 bg-white/10 hover:bg-white/15 rounded-[24px] border border-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold">Neural Consult</span>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">Recent Activity</h2>
                <button className="text-xs font-black text-teal-600 uppercase tracking-widest hover:text-teal-700">View All</button>
              </div>
              <div className="space-y-6">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        {act.type === 'Clinical' ? <Stethoscope size={20} /> : <Zap size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{act.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          <span>{act.type}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{act.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-8">
            <div className="bg-teal-600 rounded-[40px] p-8 text-white shadow-xl shadow-teal-600/20">
              <Heart className="w-10 h-10 mb-6" />
              <h3 className="text-xl font-black mb-2 italic">Clinical Tip</h3>
              <p className="text-teal-50 text-sm leading-relaxed mb-6 opacity-80">
                Increasing your daily water intake to 3L could improve the metabolic markers seen in your last blood report.
              </p>
              <button className="w-full py-4 bg-white/20 hover:bg-white/30 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                Learn More
              </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Upcoming Re-tests</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Thyroid Panel</span>
                    <Clock size={14} className="text-amber-500" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">In 14 Days</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">CBC Lipid</span>
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
