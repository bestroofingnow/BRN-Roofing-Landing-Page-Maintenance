
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle, Calculator, Calendar, ArrowLeft, Loader2, ExternalLink, AlertCircle, HardHat, Camera } from 'lucide-react';
import { ServiceArea } from '../types';
import TextToSpeechButton from './TextToSpeechButton';
import { getProjectsByCity, Project } from '../services/projectMapItService';

interface LocationModalProps {
  area: ServiceArea | null;
  onClose: () => void;
  onBook: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ area, onClose, onBook }) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Reset states when area changes
  useEffect(() => {
    if (area) {
      setIframeLoading(true);
      setIframeError(false);
      setProjects([]);
      setLoadingProjects(true);

      // Fetch projects from API
      getProjectsByCity(area.name)
        .then(results => {
          setProjects(results);
        })
        .catch(err => {
            console.error("Error loading projects", err);
        })
        .finally(() => {
          setLoadingProjects(false);
        });
    }
  }, [area]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (area) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [area, onClose]);

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleIframeError = () => {
    setIframeLoading(false);
    setIframeError(true);
  };

  // Fallback timeout for iframe loading (8 seconds)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (area?.mapId && iframeLoading) {
      timer = setTimeout(() => {
        if (iframeLoading) {
            setIframeLoading(false);
            setIframeError(true);
        }
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [area, iframeLoading]);

  // Helper to safely format date
  const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Recently Completed";
        }
        return `Completed ${date.toLocaleDateString()}`;
    } catch (e) {
        return "Recently Completed";
    }
  };

  return (
    <AnimatePresence>
      {area && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-lg"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0f172a] rounded-3xl shadow-2xl border border-white/10 flex flex-col lg:flex-row overflow-hidden"
          >
            {/* Left Column: Visuals - Fixed Height/No Scroll on Desktop */}
            <div className="w-full lg:w-1/3 bg-slate-900 relative flex flex-col flex-none h-48 lg:h-auto border-b lg:border-b-0 lg:border-r border-white/10">
               <div className="absolute inset-0 overflow-hidden">
                 <img 
                   src={area.image} 
                   alt={`Roofing projects in ${area.name}`}
                   className="w-full h-full object-cover opacity-80"
                   loading="lazy"
                   onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1000&auto=format&fit=crop';
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a] lg:bg-gradient-to-r" />
               </div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-mono text-sm uppercase tracking-widest">Service Area</span>
                  </div>
                  <h2 id="location-modal-title" className="text-4xl font-heading font-bold text-white mb-2 shadow-black drop-shadow-md">{area.name}, NC</h2>
                  <p className="text-gray-200 text-sm font-medium shadow-black drop-shadow-md">Serving this community with integrity since 2021.</p>
               </div>
            </div>

            {/* Right Column: Content - Scrollable */}
            <div className="w-full lg:w-2/3 flex flex-col h-full overflow-hidden bg-[#0f172a]">
              <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar relative">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-2xl font-bold text-white pr-12 pt-2">Why Best Roofers Now in {area.name}?</h3>
                        <div>
                             <TextToSpeechButton 
                                text={`Why choose Best Roofers Now in ${area.name}? ${area.description}`}
                                label="Listen to Info" 
                            />
                        </div>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {area.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {area.features.map((feature, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3 hover:bg-white/10 transition-colors">
                            <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-200">{feature}</span>
                        </div>
                    ))}
                    </div>

                    {/* Embedded Project MapIt - Increased Height */}
                    {area.mapId ? (
                    <div className="mb-8 w-full min-h-[500px] h-[600px] rounded-xl overflow-hidden border border-white/10 relative bg-black/40 shadow-inner">
                        {/* Loading State */}
                        {iframeLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] z-10">
                            <div className="text-center">
                              <Loader2 className="w-10 h-10 text-red-500 animate-spin mx-auto mb-4" />
                              <p className="text-gray-400 text-sm tracking-widest uppercase">Loading Projects...</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Error State */}
                        {iframeError ? (
                           <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] z-20">
                             <div className="text-center p-6">
                               <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                               <p className="text-white font-bold mb-2">Map Unavailable</p>
                               <p className="text-gray-400 text-sm mb-4">We couldn't load the interactive map for this location.</p>
                               <a 
                                 href={`https://projectmapit.com/best-roofing-now-llc/map?map=${area.mapId.trim()}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
                               >
                                 <ExternalLink className="w-4 h-4" /> Try Opening in New Tab
                               </a>
                             </div>
                           </div>
                        ) : (
                          <iframe 
                            src={`https://projectmapit.com/best-roofing-now-llc/map?map=${area.mapId.trim()}`}
                            className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`}
                            title={`Recent Projects in ${area.name}`}
                            loading="lazy"
                            allow="geolocation"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                          />
                        )}
                        
                        {!iframeLoading && !iframeError && (
                          <div className="absolute bottom-4 right-4 bg-black/80 text-xs text-white px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none border border-white/10">
                            Live Project Map
                          </div>
                        )}
                    </div>
                    ) : (
                      // Fallback if no Map ID
                      <div className="mb-8 w-full h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                         <div className="text-center">
                            <MapPin className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Project map coming soon for {area.name}</p>
                         </div>
                      </div>
                    )}

                    {/* Recent Projects List (From API) */}
                    {(projects.length > 0 || loadingProjects) && (
                      <div className="mb-8 animate-fade-in">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                          <HardHat className="w-5 h-5 text-yellow-500" />
                          <h4 className="text-lg font-bold text-white uppercase tracking-wider">Recent Verified Jobs</h4>
                        </div>
                        
                        {loadingProjects ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                            {projects.map((project, idx) => (
                                <div key={project._id || idx} className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-row items-center gap-4 hover:bg-white/10 transition-colors">
                                    {/* Project Thumbnail */}
                                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-black/30 border border-white/10">
                                        {project.files && project.files.length > 0 ? (
                                            <img 
                                                src={project.files[0].path.small} 
                                                alt="Project thumbnail" 
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Camera className="w-6 h-6 text-white/20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white truncate">{project.street}</p>
                                        <p className="text-xs text-gray-400">{project.city}, {project.state}</p>
                                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            {formatDate(project.createdDate)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )}
                      </div>
                    )}
                </div>
              </div>

              {/* Sticky Footer Action Area */}
              <div className="border-t border-white/10 p-6 lg:px-12 bg-[#0f172a] z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                 <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
                    <button
                    onClick={() => { onClose(); onBook(); }}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-red-900/20"
                    >
                    <Calendar className="w-5 h-5" /> Schedule {area.name} Visit
                    </button>
                    <a
                        href="https://journeys.demand-iq.com/631cdf2c-ff57-11ef-b232-0a58a9feac02?journeyId=40ddea4c-3884-48bb-9acb-1fcbf409bc60"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                    >
                    <Calculator className="w-5 h-5" /> Instant Local Estimate
                    </a>
                 </div>
              </div>
            </div>

            {/* Back Button (Mobile) - Top Left - INCREASED HIT AREA & Z-INDEX */}
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-4 left-4 z-[200] lg:hidden bg-black/80 text-white p-4 rounded-full backdrop-blur-md border border-white/20 active:scale-95 transition-transform cursor-pointer shadow-xl pointer-events-auto"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Close Button - Top Right - INCREASED HIT AREA & Z-INDEX */}
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 z-[200] bg-black/80 text-white p-4 rounded-full backdrop-blur-md border border-white/20 hover:bg-red-600 transition-colors active:scale-95 cursor-pointer shadow-xl pointer-events-auto"
              aria-label="Close location details"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationModal;
