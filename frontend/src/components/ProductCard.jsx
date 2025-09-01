"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      className="relative p-5 rounded-2xl cursor-pointer overflow-hidden
             bg-white/10 backdrop-blur-xl border border-white/20 
             shadow-lg group"
    >
      {/* Liquid Shine Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
               transition duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, 
        rgba(255,255,255,0.25), transparent 40%)`,
        }}
      />

      <div className="flex items-start gap-5 relative z-10">
        {/* Icon / Initial */}
        <div
          className="w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-lg
                 bg-gradient-to-br from-indigo-500 to-pink-500 
                 flex items-center justify-center text-white font-bold text-2xl 
                 shadow-md aspect-square"
        >
          {product.product_name?.slice(0, 1) || "P"}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg drop-shadow-sm">
            {product.product_name}
          </h3>
          <p className="text-m text-slate-300 mt-1 leading-relaxed line-clamp-2">
            {product.product_desc}
          </p>

          {/* Extra Details */}
          <div className="mt-3 text-sm text-slate-300 space-y-1">
            <p>
              <span className="font-bold">Created:</span>{" "}
              {new Date(product.created_at).toLocaleString()}{" "}
            </p>
          </div>

          {/* Status */}
          <div
            className="mt-3 inline-block px-3 py-1 text-xs rounded-full 
                      bg-green-400/20 text-green-300 shadow-sm"
          >
            Published
          </div>
        </div>
      </div>
    </motion.div>
  );
}
