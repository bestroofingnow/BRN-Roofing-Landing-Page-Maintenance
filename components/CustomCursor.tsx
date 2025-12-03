
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {/* House Icon Cursor */}
      <motion.div
        className="relative flex items-center justify-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        animate={{
          scale: isHovering ? 1.5 : 1, 
          rotate: isHovering ? 0 : -15
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-12 h-12"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.632 8.632a.75.75 0 0 1-.53 1.28h-1.382v7.497a.75.75 0 0 1-.75.75H13.25V16a.75.75 0 0 0-.75-.75h-1a.75.75 0 0 0-.75.75v6H5.5a.75.75 0 0 1-.75-.75V13.753H3.368a.75.75 0 0 1-.53-1.28L11.47 3.841Z" />
        </svg>

        {/* Text appears below house when hovering */}
        <motion.span 
          className="absolute top-full mt-2 text-white font-black uppercase tracking-widest text-[10px] whitespace-nowrap bg-red-600 px-2 py-0.5 rounded-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
            y: isHovering ? 0 : -10
          }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
