
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  artist: ServiceItem;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ artist, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
      role="listitem"
      aria-label={`View details for ${artist.title}`}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={artist.image} 
          alt={artist.title} 
          loading="lazy"
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.6, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-blue-900/20 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">
             {artist.action}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-red-600 text-white rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" aria-hidden="true" />
           </motion.div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mix-blend-normal drop-shadow-lg will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {artist.title}
            </motion.h3>
          </div>
          <motion.p 
            className="text-sm font-medium uppercase tracking-widest text-red-500 mt-2 will-change-transform"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {artist.category}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
