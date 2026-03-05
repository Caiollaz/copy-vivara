import React from 'react';
import { Product } from '../types';
import { Plus, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-50 rounded-none mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 p-2 rounded-none text-stone-400 hover:text-primary transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-brand-black text-white py-4 rounded-none font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">{product.category}</span>
        <h3 className="serif text-[18px] text-black group-hover:text-primary transition-colors uppercase tracking-tight">{product.name}</h3>
        <p className="text-stone-500 text-[11px] font-medium tracking-widest">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </p>
      </div>
    </motion.div>
  );
};
