
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-gray-700">
              <h3 id="booking-modal-title" className="text-white font-heading font-bold tracking-wider">SCHEDULE CONSULTATION</h3>
              <button 
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                aria-label="Close booking modal"
              >
                <X className="w-8 h-8" aria-hidden="true" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 w-full bg-white relative">
                <iframe 
                  src="https://manage.bestroofingnow.com/widget/bookings/bestroofingnowconsultation" 
                  className="w-full h-full border-0"
                  title="Booking Calendar Widget"
                  allow="camera; microphone; autoplay; encrypted-media;"
                />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
