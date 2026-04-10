import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Trash2, 
  ChevronRight, 
  Moon, 
  Database,
  Globe,
  Mail,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const sections = [
    {
      id: "profile",
      title: "Core Profile",
      icon: <User className="w-5 h-5" />,
      fields: [
        { label: "Full Name", value: user?.name || "Rishabh", type: "text" },
        { label: "Email Address", value: user?.email || "user@medicai.com", type: "email" },
      ]
    },
    {
      id: "security",
      title: "Security & Access",
      icon: <Lock className="w-5 h-5" />,
      links: [
        { label: "Change Password", status: "Secure" },
        { label: "Two-Factor Authentication", status: "Enabled" },
        { label: "Device Management", status: "1 Active" },
      ]
    },
    {
      id: "data",
      title: "Medical Data Privacy",
      icon: <Database className="w-5 h-5" />,
      desc: "Manage how MedicAi handles your clinical records.",
      actions: [
        { label: "Export Clinical History", icon: <Globe size={16} /> },
        { label: "Clear Analysis Cache", icon: <RefreshCcw size={16} />, dangerous: true },
      ]
    },
    {
      id: "support",
      title: "Support & Resources",
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { label: "Help Center & FAQ", status: "Guides" },
        { label: "Contact Clinical Support", status: "24/7" },
        { label: "Report a Technical Issue", status: "" },
      ]
    }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-plus-jakarta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Account Settings</h1>
            <p className="text-slate-500 font-medium italic">Configure your clinical identity and privacy.</p>
          </div>
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
          >
            {saved ? "System Updated" : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{section.title}</h2>
                </div>

                {section.fields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">{field.label}</label>
                        <input 
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.links && (
                  <div className="space-y-4">
                    {section.links.map((link, idx) => {
                      const Component = link.to ? Link : 'button';
                      return (
                        <Component 
                          key={idx} 
                          to={link.to}
                          className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group"
                        >
                          <span className="font-bold text-slate-700">{link.label}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{link.status}</span>
                            <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Component>
                      );
                    })}
                  </div>
                )}

                {section.actions && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">{section.desc}</p>
                    <div className="flex flex-wrap gap-4">
                      {section.actions.map((action, idx) => (
                        <button 
                          key={idx}
                          className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                            action.dangerous 
                              ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100" 
                              : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-100"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Danger Zone */}
          <div className="pt-8">
            <button className="flex items-center gap-3 px-6 py-4 bg-white border border-rose-100 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-50 transition-all w-full md:w-auto">
              <Trash2 size={18} />
              Temporarily Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy icon for the clear analysis
function RefreshCcw({size}) {
  return <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
}
