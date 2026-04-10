import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, FileSearch, Sparkles, Activity, ShieldCheck, HeartPulse, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FeaturesPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      id: "analysis",
      title: "Intelligent Ingestion",
      subtitle: "Beyond simple OCR",
      desc: "Our engine uses context-aware LlamaParse technology to digitize clinical notes, lab tables, and diagnostic scans with 99.9% structural integrity.",
      icon: <FileSearch className="w-10 h-10 text-teal-500" />,
      gradient: "from-teal-500/10 to-transparent",
      tag: "Process"
    },
    {
      id: "explanation",
      title: "Jargon Translation",
      subtitle: "English, but simpler",
      desc: "We transform hyper-technical clinical summaries into compassionate, plain-language insights that help you understand exactly what's happening.",
      icon: <MessageCircle className="w-10 h-10 text-blue-500" />,
      gradient: "from-blue-500/10 to-transparent",
      tag: "Insight"
    },
    {
      id: "personalized",
      title: "Tailored Wellness",
      subtitle: "Analysis that fits you",
      desc: "Every report generates a custom health trajectory, including suggested questions for your next appointment and lifestyle adjustments.",
      icon: <Brain className="w-10 h-10 text-purple-500" />,
      gradient: "from-purple-500/10 to-transparent",
      tag: "Growth"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900 font-plus-jakarta overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-40 pb-32">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] uppercase tracking-widest font-bold mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Core Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
          >
            Clinical <br />
            <span className="text-teal-600">Precision.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed font-medium"
          >
            MedicAi isn't just an AI; it's a bridge between cold clinical data and human understanding.
            We've redesigned the medical experience from the ground up.
          </motion.p>
        </div>

        <div className="space-y-40">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-start gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2">
                <div className={`aspect-[4/3] rounded-[48px] bg-gradient-to-br ${feature.gradient} border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-white opacity-40 group-hover:opacity-10 transition-opacity" />
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 pt-4">
                <span className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4 block italic">{feature.tag}</span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{feature.title}</h3>
                <h4 className="text-xl text-slate-400 font-semibold mb-6">{feature.subtitle}</h4>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {feature.desc}
                </p>
                <div className="flex gap-4">
                  <div className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold text-sm shadow-sm">
                    HIPAA Compliant
                  </div>
                  <div className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold text-sm shadow-sm">
                    Llama-3 Power
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-60 text-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-teal-500 to-transparent mx-auto mb-12" />
          <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Experience Global Class Intelligence.</h2>
          <Link
            to={isAuthenticated ? "/analysis" : "/signup"}
            className="inline-flex items-center gap-3 px-10 py-5 bg-teal-600 text-white font-black rounded-full hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95"
          >
            Get Started Now
            <Zap className="w-5 h-5 fill-white" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
