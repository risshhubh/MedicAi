import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function LoadingScreen({ message = "Signing you in to MedicAi..." }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center font-plus-jakarta">
      <div className="relative">
        {/* Pulse Waves */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-teal-500 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1.8, 1.2], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 bg-teal-400 rounded-full"
        />
        
        {/* Main Icon Container */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 bg-teal-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-teal-600/40 z-10"
        >
          <Activity size={48} className="animate-pulse" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{message}</h2>
        <div className="flex items-center justify-center mt-4">
          <div className="w-32 h-8 relative">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-teal-600 stroke-2 fill-none">
              <motion.path
                d="M0,10 L20,10 L25,2 L30,18 L35,10 L50,10 L55,0 L60,20 L65,10 L100,10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Heartbeat Line Mockup */}
      <div className="absolute bottom-20 w-64 h-20 opacity-10">
        <svg viewBox="0 0 100 20" className="w-full h-full stroke-teal-600 stroke-[0.5] fill-none">
          <motion.path
            d="M0,10 L20,10 L25,5 L30,15 L35,10 L50,10 L55,0 L60,20 L65,10 L100,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    </div>
  );
}
