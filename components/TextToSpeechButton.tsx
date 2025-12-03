
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square, Loader2 } from 'lucide-react';
import { generateSpeech, playAudioBuffer } from '../services/geminiService';

interface TextToSpeechButtonProps {
  text: string;
  className?: string;
  label?: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text, className = "", label = "Listen" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleTogglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    const audioBuffer = await generateSpeech(text);
    setIsLoading(false);

    if (audioBuffer) {
      setIsPlaying(true);
      sourceRef.current = playAudioBuffer(audioBuffer);
      
      // Reset state when audio finishes naturally
      sourceRef.current.onended = () => {
        setIsPlaying(false);
        sourceRef.current = null;
      };
    }
  };

  return (
    <button
      onClick={handleTogglePlay}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium uppercase tracking-wider text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-wait ${className}`}
      aria-label={isPlaying ? "Stop reading" : "Read text aloud"}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <Square className="w-4 h-4 fill-current" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      {label && <span>{isPlaying ? 'Stop' : isLoading ? 'Loading...' : label}</span>}
    </button>
  );
};

export default TextToSpeechButton;
