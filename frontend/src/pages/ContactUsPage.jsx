import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  Headset
} from 'lucide-react';

export default function ContactUsPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      title: "Direct Support",
      info: "Mail us for assistance",
      href: "mailto:rishabhsrivastava921@gmail.com",
      desc: "Our clinical team typically responds within 2 hours.",
      icon: <Mail className="w-6 h-6 text-teal-600" />,
      bg: "bg-teal-50"
    },
    {
      title: "Emergency Line",
      info: "+91 800 MEDI CAI",
      desc: "Priority line for urgent technical integrations.",
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-[10px] uppercase tracking-[0.2em] mb-6"
          >
            <Headset size={14} className="mr-2" />
            Clinical Concierge
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
            We’re here to <br />
            <span className="text-teal-600">Help You Thrive.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 font-medium">
            Have questions about your report analysis or local datasets? 
            Our medical AI specialists are on standby.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {contactMethods.map((method, i) => {
              const Container = method.href ? 'a' : 'div';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Container 
                    href={method.href} 
                    className={`block bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all ${method.href ? 'hover:shadow-md hover:border-teal-200 cursor-pointer' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${method.bg} flex items-center justify-center mb-6`}>
                      {method.icon}
                    </div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{method.title}</h3>
                    <p className="text-xl font-black text-slate-900 mb-2">{method.info}</p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{method.desc}</p>
                  </Container>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50"
            >
              {submitted ? (
                <div className="h-[450px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Message Transmitted.</h2>
                  <p className="text-slate-500 font-medium">Our clinical team has received your query and will respond shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm font-black text-teal-600 uppercase tracking-widest hover:underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Report Analysis Query"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">How can we help?</label>
                    <textarea 
                      required
                      rows="5"
                      placeholder="Describe your query in detail..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      <Send size={16} />
                      Transmit Inquiry
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                      <ShieldCheck size={12} className="text-teal-500" />
                      Encrypted End-to-End Clinical Communication
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-32 border-t border-slate-200 pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Enterprise Solutions</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Are you a hospital or diagnostic clinic looking to integrate MedicAi? 
              Contact our partnership wing for bespoke API access.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center">
            <button className="px-10 py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              Partnership Inquiries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
