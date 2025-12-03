
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ServiceArea } from '../types';

interface ServiceMapProps {
  areas: ServiceArea[];
  onSelectArea: (area: ServiceArea) => void;
}

const ServiceMap: React.FC<ServiceMapProps> = ({ areas, onSelectArea }) => {
  return (
    <div className="relative w-full aspect-square md:aspect-[16/9] max-w-4xl mx-auto bg-[#0f172a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Background Grid/Map Effect */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px' 
      }}></div>

      {/* Stylized Map Container */}
      <div className="absolute inset-0 p-8 md:p-12">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          {/* Connecting Lines */}
          <motion.path
            d="M50 60 L40 30 M50 60 L70 30 M50 60 L70 80 M50 60 L80 65 M70 30 L75 15"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Area Nodes */}
          {areas.map((area, i) => (
            <g 
              key={area.id} 
              onClick={() => onSelectArea(area)}
              className="cursor-pointer group"
            >
              {/* Pulse Effect */}
              <motion.circle
                cx={area.coordinates.x}
                cy={area.coordinates.y}
                r="3"
                fill="none"
                stroke={area.id === 'charlotte' ? '#ef4444' : '#3b82f6'}
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              />
              
              {/* Pin Icon / Dot */}
              <motion.circle
                cx={area.coordinates.x}
                cy={area.coordinates.y}
                r={area.id === 'charlotte' ? 2 : 1.5}
                className={area.id === 'charlotte' ? 'fill-red-500' : 'fill-blue-500 group-hover:fill-red-400'}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: i * 0.1 }}
              />

              {/* Label */}
              <foreignObject 
                x={area.coordinates.x - 15} 
                y={area.coordinates.y + 3} 
                width="30" 
                height="10" 
                className="overflow-visible pointer-events-none"
              >
                <div className={`text-[3px] text-center font-bold tracking-widest uppercase transition-colors ${
                  area.id === 'charlotte' ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {area.name}
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        {/* Floating Info Box for Desktop */}
        <div className="hidden md:block absolute top-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Interactive Map</span>
          </div>
          <p className="text-xs text-gray-400">
            Select a location to see specific services and local team availability in your neighborhood.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceMap;
