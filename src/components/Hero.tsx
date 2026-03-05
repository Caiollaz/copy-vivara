import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Jewelry" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4 block">
            Coleção Majestá
          </span>
          <h2 className="serif text-[32px] text-white font-light leading-tight mb-6 uppercase tracking-tight">
            Tendência em <br />
            <span className="italic">cada detalhe</span>
          </h2>
          <p className="text-white/80 text-[11px] mb-8 font-normal max-w-xs uppercase tracking-widest leading-relaxed">
            Descubra a perfeição artesanal em peças exclusivas criadas para durar gerações.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-brand-black text-white px-10 py-4 rounded-none font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-2 border border-white/10">
              Explorar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
