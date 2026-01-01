import React from 'react'

export default function Card({ img, title }) {
  return (
    <div className="w-[280px] rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl 
    border border-white/30 transition-all duration-300 
    hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] cursor-pointer group">

      <div className="relative overflow-hidden">
        <img
          src={img}
          alt="feature"
          className="w-full h-[360px] object-cover transition duration-500 group-hover:scale-110"
        />

        {/* glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
      </div>

      <div className="p-5 text-center">
        <h3 className="text-gray-900 font-bold text-lg tracking-wide group-hover:text-red-600 transition">
          {title}
        </h3>
      </div>

    </div>
  )
}
