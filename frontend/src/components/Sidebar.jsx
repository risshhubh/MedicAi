import React, { useState } from 'react';
import {
  FileUp,
  HeartPulse,
  AlertTriangle,
  ListChecks,
  MessageCircleQuestion,
  Sparkles,
  BrainCircuit,
  Scan,
  Lock,
  BookMarked,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { uploadDocument } from '../api';

const features = [
  {
    icon: BrainCircuit,
    title: 'Evidence-grounded chat',
    desc: 'Answers use retrieval (RAG) from PDFs you upload plus safe prompting — not open-ended guessing.',
    accent: 'from-teal-600 to-cyan-600',
  },
  {
    icon: Scan,
    title: 'Document intelligence',
    desc: 'PDFs are scanned, indexed for search, and can trigger an AI overview: summary, key findings, and precautions tied to the text.',
    accent: 'from-cyan-600 to-blue-600',
  },
  {
    icon: BookMarked,
    title: 'Source transparency',
    desc: 'Replies can list document sources so you know what material grounded the response.',
    accent: 'from-blue-600 to-indigo-600',
  },
  {
    icon: Lock,
    title: 'Privacy-minded design',
    desc: 'Built for clinical-style workflows; always follow your org’s policies for PHI and data retention.',
    accent: 'from-slate-600 to-slate-700',
  },
];

function FeatureCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="group flex gap-3 p-3 rounded-xl bg-white/80 border border-slate-200/70 hover:border-teal-200/80 hover:shadow-md hover:shadow-teal-900/5 transition-all duration-200">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-md shrink-0`}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[13px] font-semibold text-slate-900 leading-tight flex items-center gap-1">
          {item.title}
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </h3>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [report, setReport] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    setStatus('Ingesting document…');
    setReport(null);
    try {
      const data = await uploadDocument(file);
      setStatus(`Indexed · ${data.chunkCount ?? 0} segments`);
      setReport({
        insights: data.insights,
        insightsError: data.insightsError,
        overviewDisclaimer: data.overviewDisclaimer,
        chunkCount: data.chunkCount,
        extractedCharacterCount: data.extractedCharacterCount,
      });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('Upload failed');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const ins = report?.insights;

  return (
    <aside className="w-[min(100%,22rem)] lg:w-96 medical-sidebar-bg border-r border-slate-200/80 flex flex-col h-full overflow-hidden shadow-[4px_0_24px_-12px_rgba(15,23,42,0.08)]">
      {/* Brand */}
      <div className="p-5 pb-4 border-b border-slate-200/60 shrink-0 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-teal-900/15">
            <HeartPulse className="text-white w-6 h-6" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">MedicAi</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest">
                Assistant online
              </span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-3 leading-relaxed pl-0.5">
          Clinical-style information workspace — combine uploads, summaries, and dialogue in one place.
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Capabilities */}
        <div className="px-4 pt-4 pb-2 shrink-0">
          <p className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
            Platform capabilities
          </p>
          <div className="space-y-2 max-h-[38vh] lg:max-h-none overflow-y-auto pr-1">
            {features.map((f) => (
              <FeatureCard key={f.title} item={f} />
            ))}
          </div>
        </div>

        {/* Intake */}
        <div className="px-4 py-3 shrink-0 border-t border-slate-200/50">
          <p className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
            Document intake
          </p>
          <label className="group flex flex-col items-center justify-center w-full min-h-[7.5rem] border-2 border-dashed border-teal-200/80 rounded-2xl cursor-pointer bg-gradient-to-b from-teal-50/40 to-white hover:from-teal-50/80 hover:border-teal-400/60 transition-all">
            <div className="flex flex-col items-center justify-center py-5 px-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  uploading ? 'bg-teal-100 text-teal-600' : 'bg-white border border-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600'
                }`}
              >
                <FileUp className={`w-5 h-5 ${uploading ? 'animate-bounce' : ''}`} />
              </div>
              <p className="text-xs font-semibold text-slate-800 text-center">Upload medical PDF</p>
              <p className="text-[10px] text-slate-500 text-center mt-1 leading-snug">
                Text extraction · vector index · optional report overview
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,application/pdf"
              disabled={uploading}
            />
          </label>
          {status && (
            <p
              className={`text-center text-[10px] font-semibold uppercase tracking-wider mt-2 ${
                status.includes('failed') ? 'text-red-600' : 'text-teal-700'
              }`}
            >
              {status}
            </p>
          )}
        </div>

        {/* Report overview */}
        {(ins || report?.insightsError) && (
          <div className="flex-1 min-h-0 flex flex-col px-4 pb-3 border-t border-slate-200/50 pt-3">
            <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Report overview
              </div>
              {typeof report?.extractedCharacterCount === 'number' && (
                <span className="text-[9px] text-slate-400 tabular-nums font-medium">
                  {report.extractedCharacterCount.toLocaleString()} chars
                </span>
              )}
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-white border border-slate-200/80 shadow-sm p-3 space-y-3">
              {report?.insightsError && (
                <div className="text-[11px] text-red-700 bg-red-50 border border-red-100 rounded-lg p-2.5">
                  Overview unavailable: {report.insightsError}
                </div>
              )}

              {ins?.summary && (
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Summary</p>
                  <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{ins.summary}</p>
                </div>
              )}

              {ins?.keyFindings?.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <ListChecks className="w-3 h-3" />
                    Key findings
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pl-3 list-disc marker:text-teal-500">
                    {ins.keyFindings.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ins?.precautions?.length > 0 && (
                <div className="bg-amber-50/90 border border-amber-100/80 rounded-xl p-2.5">
                  <p className="text-[9px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    Precautions (from document)
                  </p>
                  <ul className="text-[11px] text-amber-950/90 space-y-1 pl-3 list-disc">
                    {ins.precautions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ins?.suggestedFollowup?.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MessageCircleQuestion className="w-3 h-3" />
                    For your clinician
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 pl-3 list-decimal marker:text-slate-300">
                    {ins.suggestedFollowup.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ins?.limitations && (
                <p className="text-[10px] text-slate-400 italic leading-relaxed border-l-2 border-slate-200 pl-2">
                  {ins.limitations}
                </p>
              )}

              {report?.overviewDisclaimer && (
                <p className="text-[9px] text-slate-400 leading-relaxed pt-1 border-t border-slate-100">
                  {report.overviewDisclaimer}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Emergency strip */}
        <div className="px-4 py-3 shrink-0 border-t border-slate-200/60 bg-rose-50/50">
          <div className="flex gap-2 items-start">
            <Phone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-rose-900/90 leading-relaxed">
              <span className="font-semibold">Urgent or emergency care?</span> Use your local emergency number or services — do not rely on this tool.
            </p>
          </div>
        </div>

        {/* Trust */}
        <div className="p-4 pt-3 border-t border-slate-200/60 bg-slate-50/80 shrink-0">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">Clinical use notice</p>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            MedicAi supports education and workflow efficiency. It does not replace licensed professionals, institutional protocols, or the medical record.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
