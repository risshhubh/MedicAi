import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Shield,
  Zap,
  Sparkles,
  Brain,
  Stethoscope,
  ChevronRight,
  MessageCircle,
  FileSearch,
  Lock,
  Server,
  FileCheck,
  FileUp,
  Plus,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { uploadDocument } from '../api';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatus('Analyzing clinical data...');
    try {
      const data = await uploadDocument(file);
      
      if (!isAuthenticated) {
        navigate('/signup', { state: { message: 'Signup to view your report' } });
        return;
      }

      navigate('/dashboard', { 
        state: { 
          report: {
            analysis: data.insights.summary,
            insightsError: data.insightsError,
            extractedCharacterCount: data.extractedCharacterCount,
          } 
        } 
      });
    } catch (error) {
      setStatus('Processing failed. Please try again.');
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-plus-jakarta text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30 bg-gradient-to-b from-teal-200 to-transparent blur-3xl rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left lg:pt-10"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-medium text-sm mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Empowering Patients with AI Clinical Insights
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                Understand Your Health. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                  Clearer & Faster.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-xl text-slate-600 mb-10">
                Transform complex medical reports into simple, actionable insights.
                MedicAi uses state-of-the-art Llama-3 models to help you navigate your clinical journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/chat" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1">
                  Chat with AI
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-lg font-bold rounded-2xl text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all">
                  How it Works
                </Link>
              </div>
            </motion.div>

            {/* Hero Feature Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:pl-10 w-full"
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col relative h-[480px] w-full">
                {/* Feature 1: The AI Analysis Tool (Interactive Card) */}
                <motion.div 
                  layout
                  animate={{ 
                    height: hoveredCard === 'chat' ? 0 : hoveredCard === 'analysis' ? '480px' : '230px',
                    opacity: hoveredCard === 'chat' ? 0 : 1,
                    marginBottom: hoveredCard === 'analysis' ? 0 : 20,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onMouseEnter={() => setHoveredCard('analysis')}
                  onClick={() => navigate('/analysis')}
                  className="bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100 group overflow-hidden relative cursor-pointer"
                >
                  <motion.div layout className="flex items-start gap-6 h-full">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${uploading ? 'bg-teal-600 scale-110' : 'bg-teal-50 text-teal-600'}`}>
                      <FileUp className={`w-7 h-7 ${uploading ? 'animate-bounce text-white' : ''}`} />
                    </div>
                    <div className="flex-1 flex flex-col h-full">
                      <h3 className="text-xl font-black text-slate-900 mb-1">Instant Report Analysis</h3>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        {uploading ? status : 'Upload any medical report (PDF/Image) for an instant AI summary.'}
                      </p>
                      
                      {/* Expanded Content for Analysis */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredCard === 'analysis' ? 1 : 0,
                          y: hoveredCard === 'analysis' ? 0 : 10,
                        }}
                        className="space-y-4 mb-8"
                        style={{ display: hoveredCard === 'analysis' ? 'block' : 'none' }}
                      >
                        {[
                          "Precise Structural Mapping",
                          "Historical Trend Analysis",
                          "Clinical Jargon Synthesis"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item}</p>
                          </div>
                        ))}
                      </motion.div>
                      
                      <div className="mt-auto">
                        {!uploading ? (
                          <label 
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 cursor-pointer text-xs font-black text-white bg-teal-600 px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Select Clinical File</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={handleFileUpload}
                              accept=".pdf,image/*" 
                            />
                          </label>
                        ) : (
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              className="bg-teal-600 h-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 3 }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Feature 2: The Neural Chat Assistant (Interactive Card) */}
                <motion.div
                  layout
                  animate={{ 
                    height: hoveredCard === 'analysis' ? 0 : hoveredCard === 'chat' ? '480px' : '230px',
                    opacity: hoveredCard === 'analysis' ? 0 : 1
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onMouseEnter={() => setHoveredCard('chat')}
                  className="bg-slate-900 rounded-[32px] p-8 shadow-2xl shadow-slate-900/20 border border-slate-800 group overflow-hidden relative"
                >
                  <Link to="/chat" className="flex items-start gap-6 h-full w-full">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-black text-white">Neural Consult AI</h3>
                        <div className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-[9px] font-black uppercase tracking-widest border border-teal-500/30">
                          Active
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        Ask about medications, dosages, or general health concerns in real-time.
                      </p>
                      
                      {/* Expanded Content for Chat */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredCard === 'chat' ? 1 : 0,
                          y: hoveredCard === 'chat' ? 0 : 10,
                        }}
                        className="space-y-4 mb-8"
                        style={{ display: hoveredCard === 'chat' ? 'block' : 'none' }}
                      >
                        {[
                          "Multimodal Photo Support",
                          "RAG Document Retrieval",
                          "Verified Clinical Sources"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item}</p>
                          </div>
                        ))}
                      </motion.div>
                      <div className="mt-auto flex items-center gap-2 text-xs font-black text-teal-400 uppercase tracking-widest group-hover:gap-3 transition-all">
                        <span>Start Consultation</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Stats / Trust Sub-bar */}
                <motion.div 
                  animate={{ opacity: hoveredCard ? 0 : 1 }}
                  className="absolute -bottom-10 inset-x-0 flex items-center justify-between px-4 pt-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                          {i === 3 ? '+5k' : <User size={14} />}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trusted by Physicians</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-teal-500" />
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">HIPAA Compliant</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute -z-10 -bottom-10 -left-10 w-80 h-80 bg-blue-200/20 blur-[120px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Visualizer Section */}
      <section id="demo" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Activity className="w-4 h-4 mr-2" />
                Live Engine Simulator
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Watch the <br />
                <span className="text-teal-600">Intelligence</span> in Action.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                Our engine doesn't just read—it synthesizes. Watch how MedicAi transforms raw clinical data into meaningful patient insights in real-time.
              </p>

              <div className="space-y-6">
                {[
                  { t: "OCR Structural Mapping", d: "Digitizing complex lab tables with 99% accuracy." },
                  { t: "Medical Entity Extraction", d: "Identifying Hemoglobin, RBC, and Platelet trends." },
                  { t: "Human-Readable Synthesis", d: "Generating compassionate clinical summaries." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.t}</h4>
                      <p className="text-slate-500 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Simulator Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 rounded-[40px] p-1 shadow-2xl shadow-teal-900/20 aspect-square lg:aspect-video relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                  {/* Scanning Bar */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent z-20 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                  />

                  {/* Content */}
                  <div className="p-10 h-full flex flex-col justify-between">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center opacity-50">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      <div className="text-[10px] text-white font-mono uppercase tracking-widest">Processing_082.PDF</div>
                    </div>

                    {/* Mock Report Content */}
                    <div className="flex-1 mt-8 mb-4 overflow-hidden relative">
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className="flex items-center gap-4">
                            <div className={`h-2 rounded-full bg-white/10 ${i % 2 === 0 ? 'w-full' : 'w-2/3'}`} />
                            <div className="w-12 h-2 rounded-full bg-teal-500/20" />
                          </div>
                        ))}
                      </div>

                      {/* Result Overlay */}
                      <motion.div
                        animate={{ opacity: [0, 0, 1, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-x-0 bottom-4 bg-teal-600/90 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl"
                      >
                        <div className="text-white text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Analysis Result</div>
                        <div className="text-white font-medium leading-relaxed leading-snug">
                          "Patients Hemoglobin (10.2) is slightly below average. Focus on iron-rich leafy greens and consult Dr. Lal."
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Floating Dots */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 blur-[60px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Functional Bento Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Platform Infrastructure</h2>
            <p className="text-slate-500 mt-2 italic">Built for clinical scale and precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between group">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                <FileSearch />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Deep Ingestion</h3>
                <p className="text-slate-500 text-sm">Our LlamaParse pipeline identifies table structures, handwritten notes, and nested medical data points with extreme accuracy.</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[32px] text-white flex flex-col justify-between">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Brain className="text-teal-400" />
              </div>
              <h3 className="text-lg font-bold">RAG Architecture</h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">Retrieval-Augmented Generation ensures every AI insight is grounded in your medical history.</p>
            </div>

            <div className="bg-teal-600 p-8 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-teal-600/20">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" />
              </div>
              <h3 className="text-lg font-bold">Insta-Report</h3>
              <p className="text-teal-50/80 text-xs leading-relaxed mt-2">Processing speed of &lt; 5 seconds for multi-page document synthesis.</p>
            </div>

            <div className="md:col-span-4 bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Patient-Doctor Bridge</h3>
                <p className="text-slate-600 leading-relaxed">MedicAi automatically translates complex codes (like ICD-10) and jargon into plain English, creating a direct feedback loop between your reports and your health literacy.</p>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <Link to="/analysis" className="px-8 py-4 bg-slate-100 rounded-2xl font-bold text-slate-800 hover:bg-slate-200 transition-all flex items-center gap-2">
                  Launch Ai Analysis
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-medium text-sm mb-6">
                <Lock className="w-4 h-4 mr-2" />
                Security First Philosophy
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Your Privacy is Our Priority</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">AES-256 Encryption</h4>
                    <p className="text-slate-400 text-sm">All uploaded files are encrypted at rest and during transit. Your data is invisible to everyone except our clinical engine.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Immediate Deletion</h4>
                    <p className="text-slate-400 text-sm">Once your analysis is generated, temporary processing files are immediately purged from our secure cloud servers.</p>
                  </div>
                </div>
                <div className="pt-6">
                  <Link to="/security" className="text-teal-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    View Full Security Whitepaper
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 border border-white/10 rounded-[32px] p-12 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Our Secure Protocols</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  SOC2 Type II Complaint Architecture
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  Multi-Factor Authentication (MFA) Protected
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  Regular External Security Audits
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  Strict HIPAA-Aligned Data Governance
                </li>
              </ul>
              <div className="mt-10 p-6 bg-teal-500/10 rounded-2xl border border-teal-500/20">
                <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-2">Compliance Note</p>
                <p className="text-slate-300 text-sm italic italic">"MedicAi is built on an enterprise-grade infrastructure that meets the world's most rigorous data privacy standards."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                <Activity size={18} />
              </div>
              <span className="text-xl font-bold text-slate-900">MedicAi</span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-500">
              <a href="#" className="hover:text-teal-600">Privacy Policy</a>
              <a href="#" className="hover:text-teal-600">Terms of Service</a>
              <a href="#" className="hover:text-teal-600">Contact Support</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} MedicAi Technologies. All rights reserved. Not intended to replace professional medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}

