import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Bot,
  AlertCircle,
  Info,
  FileText,
  Sparkles,
  Shield,
  Stethoscope,
} from 'lucide-react';
import { chatWithAi } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello — I am MedicAi, your clinical information assistant. Ask questions about the medical documents you have indexed, or general topics grounded in your knowledge base.',
      timestamp: new Date().toISOString(),
      disclaimer:
        'Educational use only. Not a substitute for professional medical advice, diagnosis, or treatment.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAi(input);
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.answer,
        sources: response.sources,
        timestamp: response.timestamp,
        disclaimer: response.disclaimer,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Connection to the clinical engine failed. Please verify the API is running and try again.',
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      {/* Clinical header */}
      <header className="shrink-0 px-6 lg:px-10 pt-6 pb-4 border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-teal-900/10 shrink-0">
              <Stethoscope className="text-white w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                Clinical dialogue
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 max-w-xl leading-snug">
                Responses combine retrieval from your uploaded PDFs with verified-style prompting. Always confirm with a licensed clinician.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-100/80">
              <Sparkles className="w-3.5 h-3.5" />
              RAG
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200/80">
              <FileText className="w-3.5 h-3.5" />
              Source-aware
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-100/80">
              <Shield className="w-3.5 h-3.5" />
              Non-diagnostic
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex max-w-4xl mx-auto ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[min(100%,42rem)] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border
                  ${
                    msg.type === 'user'
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  {msg.type === 'user' ? (
                    <User className="text-white w-5 h-5" />
                  ) : (
                    <Bot className="text-teal-700 w-5 h-5" />
                  )}
                </div>

                <div className="space-y-2 min-w-0">
                  <div
                    className={`px-5 py-4 rounded-2xl leading-relaxed text-[15px]
                    ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-br from-teal-700 to-teal-800 text-white font-medium shadow-md shadow-teal-900/15'
                        : msg.isError
                          ? 'bg-red-50 text-red-800 border border-red-100'
                          : 'bg-white text-slate-800 border border-slate-200/90 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-0.5">
                      {msg.sources.map((source, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-teal-900/80 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-100 shadow-sm"
                        >
                          <FileText className="w-3 h-3 text-teal-600" />
                          {source}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.disclaimer && (
                    <div className="flex gap-2 items-start text-[11px] text-slate-500 bg-slate-50/90 p-3 rounded-xl border border-slate-100">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                      <span>{msg.disclaimer}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start max-w-4xl mx-auto">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <Activity className="text-teal-500 w-5 h-5 animate-pulse" />
              </div>
              <div className="h-11 w-40 bg-white border border-slate-100 rounded-2xl shadow-sm animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 px-6 lg:px-10 pb-8 pt-2 bg-gradient-to-t from-slate-100/80 to-transparent">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <label htmlFor="clinical-input" className="sr-only">
            Clinical inquiry
          </label>
          <input
            id="clinical-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your reports, symptoms in context, or guideline questions…"
            className="w-full bg-white border border-slate-200/90 rounded-2xl px-6 py-4 pr-16 shadow-lg shadow-slate-200/40 focus:outline-none focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500/50 transition-all placeholder:text-slate-400 text-slate-800"
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-12 w-12 bg-teal-700 hover:bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-teal-900/10 disabled:shadow-none active:scale-[0.98]"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="max-w-4xl mx-auto mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-500">
          <p className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              Answers prioritize your indexed documents when relevant. Emergency? Call local emergency services — do not rely on chat.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Activity = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default ChatWindow;
