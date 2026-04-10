import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, Server, HardDrive, RefreshCcw, Bell, Key, Fingerprint, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SecurityPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] pt-40 pb-32 font-plus-jakarta text-white selection:bg-teal-500/40 overflow-hidden">
      {/* Aurora Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8"
          >
            Digital Resilience
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
            The <span className="text-white">Vault</span> <br />
            <span className="text-teal-500 italic">Standard.</span>
          </h1>
          <p className="text-2xl text-slate-500 font-bold max-w-2xl text-balance italic mb-12">
            Security isn't a feature. It's our substrate.
            We protect your history with uncompromising technical rigor.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-teal-500/50 via-white/10 to-transparent" />
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[250px] mb-32">

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-3 lg:col-span-4 rounded-[40px] bg-white/5 border border-white/10 p-10 flex flex-col justify-between"
          >
            <Lock className="w-8 h-8 text-teal-400" />
            <div>
              <h3 className="text-2xl font-black mb-3 italic">AES-256</h3>
              <p className="text-slate-500 text-sm font-bold">Military grade encryption for data at rest and in transit.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-3 lg:col-span-8 rounded-[40px] bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 p-10 flex flex-col justify-end relative overflow-hidden"
          >
            <div className="absolute top-10 right-10">
              <Fingerprint className="w-20 h-20 text-teal-500/20" />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">Zero-Knowledge Architecture</h3>
            <p className="text-slate-400 text-lg font-medium max-w-md">Your PII is stripped and anonymized before any machine learning processes begin.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-7 rounded-[40px] bg-white/5 border border-white/10 p-10 flex items-center gap-10"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
              <RefreshCcw className="w-8 h-8 text-slate-400 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2 italic">Ephemeral Sessions</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">Processing files are instantly purged. We don't store your history unless you explicitly choose to archive it.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-5 rounded-[40px] bg-white/5 border border-white/10 p-10 flex flex-col justify-center text-center items-center"
          >
            <Shield className="w-10 h-10 text-white mb-6" />
            <h3 className="text-2xl font-black mb-2 uppercase tracking-widest">HIPAA Ready</h3>
            <p className="text-slate-500 text-xs font-bold font-mono">CCPA • GDPR • SOC2 COMPLIANT STACK</p>
          </motion.div>

        </div>

        {/* Secure CTA */}
        <div className="text-center">
          <Link
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-teal-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative px-12 py-6 bg-white text-black font-black rounded-full transition-all group-hover:-translate-y-1">
              {isAuthenticated ? "Go to Dashboard" : "Join the Secure Network"}
            </div>
          </Link>
          <div className="mt-12 flex items-center justify-center gap-8 opacity-50 text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
            <span>ISO 27001</span>
            <span>•</span>
            <span>End-to-End Encryption</span>
          </div>
        </div>

      </div>
    </div>
  );
}
