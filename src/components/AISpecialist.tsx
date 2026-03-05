import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AISpecialist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);

  const handleConsultation = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setRecommendation(null);
    setRecommendedProducts([]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Você é um especialista em joias de luxo da Lumina Joias. 
        O cliente disse: "${prompt}". 
        Com base nisso, sugira o estilo de joia ideal e escolha 2 ou 3 produtos da nossa lista que combinem.
        Produtos disponíveis: ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category })))}
        
        Responda em JSON com o seguinte formato:
        {
          "advice": "seu conselho de especialista aqui",
          "productIds": ["id1", "id2"]
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advice: { type: Type.STRING },
              productIds: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["advice", "productIds"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setRecommendation(data.advice);
      const filtered = products.filter(p => data.productIds.includes(p.id));
      setRecommendedProducts(filtered);
    } catch (error) {
      console.error(error);
      setRecommendation("Desculpe, tive um problema ao processar sua consulta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-brand-black text-white p-4 rounded-none shadow-2xl hover:bg-primary transition-all z-50 flex items-center gap-2 group"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-[11px] uppercase tracking-widest">
          Consultoria IA
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-8 md:w-96 bg-white shadow-2xl z-50 md:rounded-none flex flex-col overflow-hidden border border-stone-100"
          >
            <div className="bg-brand-black p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="serif text-[20px] uppercase tracking-tight">Especialista Lumina</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-none">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {!recommendation && !loading && (
                <p className="text-stone-500 text-[11px] leading-relaxed uppercase tracking-widest">
                  Olá! Sou sua consultora de estilo Lumina. Para qual ocasião você procura uma joia hoje?
                </p>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Analisando brilhos...</p>
                </div>
              )}

              {recommendation && (
                <div className="space-y-6">
                  <div className="bg-stone-50 p-6 rounded-none border border-stone-100">
                    <p className="text-black text-[12px] leading-relaxed italic font-serif">"{recommendation}"</p>
                  </div>
                  
                  {recommendedProducts.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">Sugestões exclusivas:</p>
                      <div className="grid grid-cols-2 gap-4">
                        {recommendedProducts.map(product => (
                          <div key={product.id} className="group cursor-pointer">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-24 object-cover rounded-none border border-stone-100 group-hover:border-primary transition-colors"
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[9px] mt-2 font-bold uppercase tracking-widest truncate">{product.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => { setRecommendation(null); setPrompt(''); }}
                    className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
                  >
                    Nova consulta
                  </button>
                </div>
              )}
            </div>

            {!recommendation && !loading && (
              <div className="p-6 border-t border-stone-100 bg-stone-50">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva o que você busca..."
                  className="w-full p-4 text-[11px] border border-stone-200 rounded-none focus:ring-1 focus:ring-primary focus:border-transparent outline-none resize-none h-24 bg-white"
                />
                <button
                  onClick={handleConsultation}
                  disabled={!prompt.trim()}
                  className="w-full mt-4 bg-brand-black text-white py-4 rounded-none font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-primary disabled:opacity-50 transition-colors"
                >
                  Consultar Especialista
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
