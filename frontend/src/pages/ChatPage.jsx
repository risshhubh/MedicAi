import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  Search,
  Activity,
  ChevronRight,
  BookOpen,
  Paperclip,
  Image as ImageIcon,
  X,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUser?._id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/history/${currentUser._id}`);
          if (response.data.length > 0) {
            setMessages(response.data);
          } else {
            setMessages([
              { role: 'assistant', content: 'Hello! I am your MedicAi assistant. You can ask me anything about medications or health reports from our secure clinical dataset.' }
            ]);
          }
        } catch (error) {
          console.error('History fetch error:', error);
          setMessages([
            { role: 'assistant', content: 'Hello! I am your MedicAi assistant. How can I help you today?' }
          ]);
        }
      } else {
        setMessages([
          { role: 'assistant', content: 'Hello! Please log in to save your chat history. I am still here to help you with medical questions though!' }
        ]);
      }
      setHistoryLoading(false);
    };

    fetchHistory();
  }, [currentUser]);

  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // Use a timeout to wait for React to finish rendering the new message
      setTimeout(() => {
        if (lastMessage.role === 'user') {
          // If it is a user message, scroll to the absolute bottom
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        } else {
          // If it is an AI message, find the start of THIS specific message and scroll to it
          const messageElements = scrollRef.current.querySelectorAll('.message-item');
          const lastMsgElement = messageElements[messageElements.length - 1];
          
          if (lastMsgElement) {
            // Use offsetTop to scroll exactly to the top of the message
            // Subtracting 40px for a bit of padding so it's not tucked right under the header
            const targetScroll = lastMsgElement.offsetTop - 40;
            scrollRef.current.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || loading) return;

    const userMessageContent = selectedFile
      ? `${input} (Attached: ${selectedFile.name})`
      : input;

    const userMessage = { id: Date.now(), role: 'user', content: userMessageContent };
    setMessages(prev => [...prev, userMessage]);

    const currentInput = input;
    const currentFile = selectedFile;

    setInput('');
    setSelectedFile(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', currentInput);
      formData.append('userId', currentUser?._id || '');
      if (currentFile) {
        formData.append('file', currentFile);
      }

      const response = await axios.post('http://localhost:5000/api/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now() + 2, role: 'assistant', content: 'Sorry, I encountered an error connecting to the neural engine. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (e, msgId) => {
    e.stopPropagation(); // Prevent selecting the message
    if (!msgId) return;

    try {
      await axios.delete(`http://localhost:5000/api/chat/${msgId}`);
      setMessages(prev => prev.filter(m => m._id !== msgId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-plus-jakarta text-slate-900 flex overflow-hidden h-screen">
      {/* Sidebar - History */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-white border-r border-slate-100 flex flex-col hidden lg:flex relative z-20"
      >
        <div className="p-6 pb-2">
          <Link to="/" className="flex items-center space-x-2 mb-8 group">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">MedicAi</span>
          </Link>

          <button
            onClick={() => setMessages([{ role: 'assistant', content: 'Hello! I am your MedicAi assistant. How can I help you today?' }])}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white rounded-2xl py-4 font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 mb-8"
          >
            <Sparkles size={18} className="text-teal-400" />
            New Consult
          </button>

          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent History</span>
            <MessageSquare size={14} className="text-slate-300" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6 custom-scrollbar">
          {messages.filter(m => m.role === 'user').reverse().map((msg, i) => (
            <div key={msg._id || i} className="group relative">
              <button 
                className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all overflow-hidden"
              >
                <p className="text-xs font-semibold text-slate-700 truncate pr-10">{msg.content}</p>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <button 
                    onClick={(e) => handleDeleteMessage(e, msg._id)}
                    className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={14} className="text-teal-500" />
                </div>
              </button>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-10">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed px-10">
                No recent interactions found for your profile.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Authorized Physician'}</p>
              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">Clinical Access Level 1</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header for Mobile/Title */}
        <div className="absolute top-0 inset-x-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-10 lg:hidden flex items-center px-6 justify-between">
          <Link to="/" className="text-xl font-black text-slate-900 tracking-tight">MedicAi</Link>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
        </div>

        {/* Global Glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-50/50 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-50/50 blur-[120px] pointer-events-none rounded-full" />

        {/* Messages Container */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full pt-24 lg:pt-20 relative z-0 h-full">
          {/* Header Info */}
          <div className="px-8 pt-10 pb-6 hidden lg:flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Neural Engine Chat</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Consultation Session</span>
              </div>
            </div>

            <div className="flex items-center bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100/50">
              <BookOpen className="w-4 h-4 text-teal-600 mr-2" />
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Clinical Dataset Synced</span>
            </div>
          </div>

          {/* Actual Chat List */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-8 space-y-8 py-8 custom-scrollbar scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`flex message-item ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-6 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-teal-600 text-white'}`}>
                    {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                  </div>
                  <div className={`p-6 rounded-3xl ${msg.role === 'user' ? 'bg-white text-slate-900 rounded-tr-none shadow-xl shadow-slate-200/40 border border-slate-100' : 'bg-slate-50 text-slate-900 border border-slate-100 rounded-tl-none shadow-sm'}`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === 'assistant' && (
                      <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Source: Clinical Dataset</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Verified insights</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-6 max-w-[85%] items-center">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg">
                    <Sparkles size={24} className="animate-spin-slow" />
                  </div>
                  <div className="flex space-x-1.5 p-5 bg-slate-50/50 rounded-3xl">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-teal-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Panel */}
          <div className="p-8 shrink-0">
            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="absolute -top-20 left-4 right-4 bg-white border border-teal-100 p-3 rounded-2xl shadow-xl z-20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                        {selectedFile.type.includes('image') ? <ImageIcon size={20} /> : <Paperclip size={20} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 truncate max-w-[200px]">{selectedFile.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024).toFixed(1)} KB • Ready to analyze</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSendMessage} className="relative z-10 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 hover:bg-slate-50 text-slate-400 hover:text-teal-600 rounded-2xl transition-all"
                  >
                    <Paperclip size={22} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="hidden"
                    accept=".pdf,image/*"
                  />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about meds or attach a clinical report..."
                  className="w-full bg-white border border-slate-200 rounded-[30px] py-6 pl-24 pr-24 text-base focus:outline-none focus:ring-8 focus:ring-teal-500/5 focus:border-teal-400 transition-all shadow-2xl shadow-slate-200/80 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-14 bg-slate-900 text-white rounded-[22px] flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20 disabled:opacity-50 group-hover:shadow-teal-900/10"
                >
                  <Send size={24} />
                </button>
              </form>
              <p className="mt-5 text-center text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
                MedicAi • Multimodal Neural Engine • PDFs & Images Supported
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
