
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  action: string;
  description: string;
  longDescription?: string;
  processSteps?: string[];
  metaDescription?: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  coordinates: { x: number; y: number }; // Percentage for SVG placement
  description: string;
  features: string[];
  image: string;
  metaDescription: string;
  keywords: string;
  mapId?: string; // Project MapIt ID
  variant?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  TECHNOLOGY = 'technology',
  PLANS = 'plans',
  AREAS = 'areas',
}