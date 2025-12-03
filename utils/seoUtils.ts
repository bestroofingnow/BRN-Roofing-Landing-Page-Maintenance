

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  schema?: Record<string, any>;
}

const DEFAULT_SEO: SEOData = {
  title: "Best Roofers Now | Charlotte Roofing & Storm Restoration Experts",
  description: "Best Roofers Now is Charlotte's trusted expert for residential & commercial roofing, storm damage repair, and free drone inspections. 50-Year Warranty. Licensed in NC/SC.",
  keywords: "Roofing Charlotte NC, Roof Replacement, Storm Damage Repair, Commercial Roofing Charlotte, TPO Roofing, Metal Roofing, GAF Master Elite, Insurance Claim Roofer, Drone Roof Inspection, Best Roofers Now, Roof Repair",
  image: "https://storage.googleapis.com/msgsndr/YnvUmp9cZqt5xmVLrnoq/media/6927385cc3c18274f73920b2.png",
  url: "https://bestroofingnow.com",
  type: "business.business"
};

export const resetSEO = () => {
  updateSEO(DEFAULT_SEO);
};

export const updateSEO = (data: SEOData) => {
  // Update Title
  document.title = data.title;

  // Update Meta Tags
  setMeta('name', 'description', data.description);
  if (data.keywords) setMeta('name', 'keywords', data.keywords);

  // Open Graph
  setMeta('property', 'og:title', data.title);
  setMeta('property', 'og:description', data.description);
  setMeta('property', 'og:url', data.url || window.location.href);
  setMeta('property', 'og:type', data.type || 'website');
  if (data.image) setMeta('property', 'og:image', data.image);

  // Twitter Card
  setMeta('name', 'twitter:title', data.title);
  setMeta('name', 'twitter:description', data.description);
  if (data.image) setMeta('name', 'twitter:image', data.image);

  // Canonical URL
  if (data.url) setLink('canonical', data.url);

  // Update JSON-LD Schema
  const dynamicScriptId = 'dynamic-json-ld';
  let script = document.getElementById(dynamicScriptId) as HTMLScriptElement | null;

  if (data.schema) {
    if (!script) {
      script = document.createElement('script');
      script.id = dynamicScriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data.schema);
  } else {
    // If no schema is provided (e.g. reset), remove the dynamic script so we fall back to static schema
    if (script) {
      script.remove();
    }
  }
};

function setMeta(attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}