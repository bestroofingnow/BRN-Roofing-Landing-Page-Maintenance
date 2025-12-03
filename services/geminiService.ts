
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";

// Safely retrieve API Key, handling environments where process is not defined
// We use an indirect reference to prevent the JS engine from throwing a ReferenceError
// on the word 'process' before the typeof check in some strict environments.
let API_KEY = '';

try {
  // @ts-ignore
  const globalProcess = typeof process !== 'undefined' ? process : undefined;
  // @ts-ignore
  if (globalProcess && globalProcess.env) {
    // @ts-ignore
    API_KEY = globalProcess.env.API_KEY || '';
  }
} catch (e) {
  console.warn("Environment variables not accessible");
}

let chatSession: Chat | null = null;
let audioContext: AudioContext | null = null;

const KNOWLEDGE_BASE = `
COMPANY: Best Roofers Now LLC
FOUNDERS: Fred Turner and James Turner (Father-son team)
LOCATION: 10130 Mallard Creek Road, Suite 300, Charlotte, NC 28262
EMAIL: james@bestroofingnow.com, admin@bestroofingnow.com
PHONE: (704) 605-6047

VALUES: Integrity with Transparency, Love of Community, Commitment to Excellence, Crafting Magical Moments, Work Hard to Play Hard, Sharing Knowledge.

SERVICES:
1. Residential Roofing (New installations, repairs, storm restoration)
2. Commercial Roofing (TPO, Coatings, Replacements)
3. Emergency Services (24/7 tarping, storm response)
4. Specialized: Drone inspections, solar, gutters.

WARRANTIES:
- Lifetime Warranty on new roof systems.
- 1-Year Workmanship on repairs.
- 50-year manufacturer warranty (GAF/CertainTeed).
- WIMAR Coatings: 15-year wind, 10-year hail.

MAINTENANCE PLANS (Platinum & Commercial):
- Residential: Includes annual inspection, debris removal, gutter cleaning.
- Commercial: Comprehensive care for flat/commercial roofs.
- Pricing: Customized based on property size. Contact for quote.

PROCESS (Insurance):
- Free inspection (Drone/AI).
- File claim if damage found.
- Meet adjuster.
- Approval & Install.

TECH STACK:
- Drone Technology for inspections.
- AI Analysis for damage detection.
- Customer Portal for updates.

LINKS:
- Instant Estimate: https://journeys.demand-iq.com/631cdf2c-ff57-11ef-b232-0a58a9feac02
- Booking: https://manage.bestroofingnow.com/widget/bookings/bestroofingnowconsultation

OBJECTIONS HANDLING:
- Cost: "Quality is an investment. We offer 50-year warranties and financing."
- Time: "Drone tech makes inspections fast (<1hr)."
`;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Assistant for 'Best Roofers Now', a premier roofing company in Charlotte, NC.
      
      Your goal is to be helpful, professional, and knowledgeable.
      Use the following Knowledge Base to answer questions: ${KNOWLEDGE_BASE}
      
      Tone: Professional, friendly, trustworthy, concise. 
      Do not invent services we don't offer.
      If asked for a quote, provide the Instant Estimate link or suggest booking a consultation.
      Use emojis sparingly (🏠, 🛠️, ✅).
      Keep answers under 60 words unless detailed explanation is needed.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm currently offline (API Key missing). Please call our office at (704) 605-6047.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the server. Please try again in a moment.";
  }
};

/**
 * Text-to-Speech Generation using Gemini 2.5 Flash Preview TTS
 */
export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
  if (!API_KEY) return null;

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // We use generateContent with specific audio modality config
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this professionally and enthusiastically: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Professional voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      // Ensure context is running (mobile browsers suspend it sometimes)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      return await decodeAudioData(base64Audio, audioContext);
    }
    return null;

  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

/**
 * Helper to decode raw PCM audio from Gemini
 */
async function decodeAudioData(
  base64: string,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert Int16 to Float32
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playAudioBuffer = (buffer: AudioBuffer): AudioBufferSourceNode => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
  return source;
};
