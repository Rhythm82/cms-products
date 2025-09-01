"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="relative flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-white drop-shadow-md hover:text-gray-300 transition">
          My CMS
        </h1>
      </Link>

      {/* Shiny Admin Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="relative px-5 py-2 rounded-xl text-white font-semibold 
                   bg-purple-400/30 hover:bg-purple-600/50 from-cyan-500/40 to-blue-500/40 
                   backdrop-blur-lg border border-white/20 shadow-md cursor-pointer
                   overflow-hidden"
      >
        <Link href={"/admin"}>
          <span className="relative z-10 ">Admin Panel</span>
        </Link>

        {/* Infinite Shiny Liquid Effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1, // adjust speed (higher = slower)
            ease: "linear",
          }}
        />
      </motion.button>
    </nav>
  );
}
