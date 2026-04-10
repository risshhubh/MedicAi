import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  MousePointer2, 
  Settings2, 
  BarChart3,
  MessageSquare,
  Search,
  Zap,
  ShieldCheck,
  Database,
  Sparkles,
  RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HowItWorksPage() {
  const { isAuthenticated } = useAuth();

  const analysisFlow = [
    {
      step: "01",
      title: "Data Intake",
      desc: "Upload medical PDFs or photos. Our high-precision OCR identifies tables, levels, and physician notes.",
      icon: <Upload className="w-6 h-6" />,
      color: "bg-teal-500"
    },
    {
      step: "02",
      title: "Neural Mapping",
      desc: "Llama-3 models categorize data points (like hemoglobin or blood sugar) against clinical benchmarks.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      step: "03",
      title: "Insight Generation",
      desc: "A simplified, human-readable report is generated, highlighting trends and areas needing attention.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-500"
    }
  ];

  const chatFlow = [
    {
      step: "01",
      title: "Contextual Query",
      desc: "Ask anything about symptoms, medicines, or reports. You can even attach files to your chat message.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-rose-500"
    },
    {
      step: "02",
      title: "RAG Retrieval",
      desc: "MedicAi cross-references our massive Indian pharmaceutical and health guide datasets in real-time.",
      icon: <Database className="w-6 h-6" />,
      color: "bg-amber-500"
    },
    {
      step: "03",
      title: "Verified Response",
      desc: "You get a verified response that cites specific database entries, combined with advanced clinical logic.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-32 font-plus-jakarta overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-[10px] uppercase tracking-[0.2em] mb-8"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Operational Intelligence Protocol
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
            How <span className="text-teal-600">MedicAi</span> <br />
            Analyzes Health.
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
            Our platform merges clinical-grade OCR with retrieval-augmented generation to provide the most accurate medical assistance available today.
          </p>
        </div>

        {/* Section 1: Analysis Flow */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-slate-200" />
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Module 01: Clinical Report Analysis</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisFlow.map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all group"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${flow.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                    {flow.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-100 group-hover:text-teal-50 transition-colors uppercase italic">{flow.step}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{flow.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                  {flow.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: AI Chat Flow */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-slate-200" />
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Module 02: Neural Virtual Assistant</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chatFlow.map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 p-10 rounded-[40px] shadow-2xl shadow-slate-900/20 border border-slate-800 hover:-translate-y-2 transition-all group"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${flow.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                    {flow.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-800 group-hover:text-slate-700 transition-colors uppercase italic">{flow.step}</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{flow.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  {flow.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integration Footer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-teal-600 rounded-[50px] p-12 md:p-24 text-white text-center relative overflow-hidden"
        >
          {/* Animated background element */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-64 h-64 border-2 border-white/10 rounded-full"
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter italic">Unified Clinical Ecosystem.</h2>
            <p className="max-w-xl mx-auto text-teal-50 text-lg mb-12 opacity-80">
              Analysis and Consultation are synchronized. Your AI Assistant remembers the reports you've uploaded, providing a truly personalized health journey.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to={isAuthenticated ? "/analysis" : "/signup"}
                className="w-full md:w-auto px-10 py-5 bg-white text-teal-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-50 shadow-xl shadow-teal-900/20 transition-all active:scale-95"
              >
                Launch Ai Analysis
              </Link>
              <Link
                to={isAuthenticated ? "/chat" : "/signup"}
                className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/40 transition-all active:scale-95"
              >
                Start AI Chat
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
