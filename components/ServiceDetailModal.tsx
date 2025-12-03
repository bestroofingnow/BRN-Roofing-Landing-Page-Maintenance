
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { ServiceItem } from '../types';
import TextToSpeechButton from './TextToSpeechButton';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onBook }) => {
  // Handle Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-lg"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-[#0f172a] rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Image Side - Fixed on Desktop */}
            <div className="w-full md:w-2/5 h-48 md:h-auto relative flex-none border-b md:border-b-0 md:border-r border-white/10">
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f172a]" />
              <div className="absolute bottom-4 left-4 p-2 bg-black/60 backdrop-blur-md rounded border border-white/10 z-10">
                 <span className="text-red-500 font-mono text-xs uppercase tracking-widest">
                   {service.category}
                 </span>
              </div>
            </div>

            {/* Content Side - Scrollable */}
            <div className="w-full md:w-3/5 flex flex-col h-full overflow-hidden bg-[#0f172a]">
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                <div className="flex flex-col gap-2 mb-4 pr-12 pt-2">
                  <h2 id="service-modal-title" className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                      {service.title}
                  </h2>
                  {/* TTS Button */}
                  <div>
                    <TextToSpeechButton 
                      text={`${service.title}. ${service.longDescription || service.description}`} 
                      label="Listen to Info"
                    />
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    {service.longDescription || service.description}
                </p>

                {service.processSteps && (
                    <div className="mb-8">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-red-500 mb-4 border-b border-white/10 pb-2">
                        Our Process
                    </h3>
                    <div className="space-y-4">
                        {service.processSteps.map((step, index) => (
                        <div key={index} className="flex gap-4 group">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            {index + 1}
                            </div>
                            <div className="flex-1">
                            <p className="text-white font-medium">{step}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="flex flex-col sm:flex-row gap-4 p-6 border-t border-white/10 bg-[#0f172a] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
                <button
                  onClick={() => {
                    onClose();
                    onBook();
                  }}
                  className="flex-1 bg-red-600 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/20"
                  aria-label="Schedule this service now"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Schedule Now
                </button>
                <a
                  href="https://journeys.demand-iq.com/631cdf2c-ff57-11ef-b232-0a58a9feac02?journeyId=40ddea4c-3884-48bb-9acb-1fcbf409bc60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent border border-white/20 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  aria-label="Get instant estimate (opens new tab)"
                >
                  Instant Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Back Button (Mobile) - Top Left - INCREASED HIT AREA & Z-INDEX */}
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-4 left-4 z-[200] md:hidden bg-black/80 text-white p-4 rounded-full backdrop-blur-md border border-white/20 active:scale-95 transition-transform cursor-pointer shadow-xl pointer-events-auto"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Close Button - Top Right - INCREASED HIT AREA & Z-INDEX */}
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 z-[200] bg-black/80 text-white p-4 rounded-full backdrop-blur-md border border-white/20 hover:bg-red-600 transition-colors active:scale-95 cursor-pointer shadow-xl pointer-events-auto"
              aria-label="Close details popup"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
