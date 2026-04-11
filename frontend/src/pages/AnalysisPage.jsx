import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  FileUp,
  HeartPulse,
  AlertTriangle,
  ListChecks,
  MessageCircleQuestion,
  Sparkles,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadDocument } from '../api';

export default function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [report, setReport] = useState(location.state?.report || null);

  useEffect(() => {
    if (report && !isAuthenticated) {
      setReport(null);
      navigate('/signup', { state: { message: 'Signup to view your report' } });
    }
  }, [report, isAuthenticated, navigate]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    setStatus('Ingesting document…');
    setReport(null);
    try {
      const data = await uploadDocument(file);
      
      if (!isAuthenticated) {
        navigate('/signup', { state: { message: 'Signup to view your report' } });
        return;
      }

      setStatus(`Analyzed successfully`);
      setReport({
        analysis: data.insights.summary,
        insightsError: data.insightsError,
        extractedCharacterCount: data.extractedCharacterCount,
      });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Upload failed';
      setStatus(`Error: ${errorMsg}`);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-plus-jakarta text-slate-800 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
            <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors group mb-6">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go to Home Page
            </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Groq Llama-3 Analysis Online</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Clinical Document Analysis</h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto text-balance">
            Upload your medical reports, scan results, or clinical notes for a compassionate, 
            AI-driven breakdown in simple terms.
          </p>
        </div>

        {/* Upload Section */}
        {!report && (
          <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 transition-all">
            <label className="group relative flex flex-col items-center justify-center w-full min-h-[20rem] border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer bg-slate-50/30 hover:bg-teal-50/30 hover:border-teal-400/50 transition-all duration-300">
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center mb-6 transition-all duration-500 ${uploading ? 'bg-teal-600 text-white scale-110' : 'bg-white border border-slate-200 text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 group-hover:shadow-xl group-hover:shadow-teal-600/20'}`}>
                  <FileUp className={`w-10 h-10 ${uploading ? 'animate-bounce' : ''}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 text-center">Drop your medical report here</h3>
                <p className="text-sm text-slate-500 text-center mt-3 max-w-sm leading-relaxed text-balance">
                  PDFs, Photos, or Scans. Our AI will extract the data and provide a patient-friendly explanation.
                </p>
                <div className="mt-8 px-6 py-2.5 bg-white rounded-full border border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:border-teal-200 group-hover:text-teal-600 transition-all">
                  Browse Files
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,application/pdf,image/*"
                disabled={uploading}
              />
            </label>
            
            {status && (
              <div className="mt-8 flex items-center justify-center">
                <div className={`flex items-center px-6 py-3 rounded-2xl text-sm font-bold shadow-sm ${status.includes('failed') ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-teal-50 text-teal-700 border border-teal-100'}`}>
                  {uploading && (
                    <div className="mr-3">
                      <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {status}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {report && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
              <div className="px-10 py-8 border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">AI Clinical Insight</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Generated by MedicAi Engine</p>
                  </div>
                </div>
                <button 
                  onClick={() => setReport(null)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all active:scale-95"
                >
                  Start New Analysis
                </button>
              </div>
              
              <div className="p-10">
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-ul:list-disc prose-ul:marker:text-teal-500">
                  <ReactMarkdown>{report.analysis}</ReactMarkdown>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 justify-between text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Important Disclaimer</p>
                      <p className="text-[11px] text-slate-500 max-w-md italic">This AI analysis is for educational purposes only. It does not replace professional medical advice. Always consult your doctor.</p>
                    </div>
                  </div>
                  {typeof report.extractedCharacterCount === 'number' && (
                    <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Extraction Quality</p>
                      <p className="text-xs font-bold text-slate-700 mt-1">{report.extractedCharacterCount.toLocaleString()} Characters Mapped</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-rose-50/50 rounded-3xl p-6 border border-rose-100/50">
              <div className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-rose-900">Immediate Medical Attention?</p>
                  <p className="text-xs text-rose-800/70 leading-relaxed mt-1">If you are experiencing a medical emergency, please call your local emergency services immediately. Do not wait for AI analysis in critical situations.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

