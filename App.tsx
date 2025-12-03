
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Menu, X, CheckCircle, Smartphone, FileText, Calculator, Users, Heart, Award, Star, Facebook, Instagram, Linkedin, Youtube, ArrowRight, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard';
import BookingModal from './components/BookingModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import ServiceMap from './components/ServiceMap';
import LocationModal from './components/LocationModal';
import { ServiceItem, ServiceArea, Section } from './types';
import { updateSEO, resetSEO } from './utils/seoUtils';

// Helper Icons defined locally
const TikTokIcon = ({ className, ...props }: any) => (
  <img 
    src="https://storage.googleapis.com/msgsndr/YnvUmp9cZqt5xmVLrnoq/media/692efc8e4fb26d70315b0277.png" 
    alt="TikTok" 
    className={`${className} object-contain rounded-full bg-white`}
    {...props}
  />
);

const Drone = ({ className, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z" />
    <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12" />
    <path d="M2 14h20" />
  </svg>
);

const TwitterX = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Pinterest = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const VideoIcon = ({ className, ...props }: any) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);


// Updated with Rich Content for SEO
// Optimized Images: WebP format, q=75, w=600 for thumbnails
const SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Residential Roofing', 
    category: 'Home Protection', 
    action: 'View Process', 
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Protecting families and their biggest investment. From architectural shingles to luxury metal systems.',
    metaDescription: 'Premier residential roofing in Charlotte, NC. Expert installation of GAF HDZ & luxury shingles with 50-year warranties. Protect your home with Best Roofers Now.',
    longDescription: 'Your home\'s roof is its first line of defense against the elements. At Best Roofers Now, we specialize in high-performance residential roofing systems designed to withstand Charlotte\'s variable climate. We are certified installers for industry-leading manufacturers like GAF and CertainTeed, allowing us to offer exclusive 50-year non-prorated warranties. Whether you need a complete roof replacement using architectural shingles, which offer superior wind resistance and aesthetic appeal, or a specialized repair for a slate or metal roof, our team brings unmatched craftsmanship to every project. We focus on proper ventilation (intake and exhaust) to extend shingle life and lower energy bills, ensuring your investment pays dividends for decades.',
    processSteps: [
      'Comprehensive Digital Inspection (Drone & Manual)',
      'Material Selection Consultation (Good/Better/Best Options)',
      'Property Protection (Tarping & Landscaping Care)',
      'Old Roof Removal & Decking Inspection',
      'Precision Installation with 6-Nail Pattern',
      'Magnetic Clean-up & Final Walkthrough'
    ]
  },
  { 
    id: '2', 
    title: 'Commercial Systems', 
    category: 'Business Solutions', 
    action: 'Learn More', 
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Specialized TPO, EPDM, and coating systems for commercial properties.',
    metaDescription: 'Expert commercial roofing contractors in Charlotte. Specializing in TPO, EPDM, and silicone roof coatings to extend roof life by 20 years. Minimize business disruption.',
    longDescription: 'We understand that commercial roofing requires minimal disruption to your daily operations while delivering maximum durability. Our commercial division specializes in single-ply systems like TPO (Thermoplastic Olefin) and EPDM (Rubber), known for their energy efficiency and longevity on flat roofs. Additionally, we are experts in Elastomeric Roof Coatings (Silicone/Acrylic), a cost-effective alternative to replacement that can extend your roof\'s life by up to 20 years. These restoration systems reflect UV rays, lowering cooling costs, and provide a seamless, waterproof barrier. We handle everything from warehouses and retail centers to multi-family housing complexes.',
    processSteps: [
      'Core Analysis & Infrared Moisture Scanning',
      'Detailed Scope of Work & Budgeting',
      'Surface Preparation, Cleaning & Priming',
      'System Installation/Application (ISO Board & Membrane)',
      'Final Inspection & Manufacturer Warranty Issuance'
    ]
  },
  { 
    id: '3', 
    title: 'Storm Restoration', 
    category: 'Insurance Claims', 
    action: 'Get Help', 
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Expert handling of wind and hail claims. We work directly with your insurance.',
    metaDescription: 'Charlotte\'s storm damage experts. We handle insurance claims for wind and hail damage, offering emergency tarping and full roof restoration services.',
    longDescription: 'Storm damage can be stressful and confusing, but the restoration process shouldn\'t be. Best Roofers Now employs a team of former insurance adjusters and storm specialists who know exactly how to document wind and hail damage. We utilize Xactimate software—the same standard used by insurance carriers—to ensure your claim is accurate and fair. We advocate for you to ensure your claim covers all necessary repairs, including code upgrades, flashing, and collateral damage to gutters or siding. From the initial emergency tarping to the final shingle, we guide you through every step of the insurance claim process.',
    processSteps: [
      'Emergency Tarping & Mitigation (if needed)',
      'Detailed Damage Documentation (Photos & Reports)',
      'Insurance Claim Filing Assistance',
      'On-Site Meeting with Insurance Adjuster',
      'Code Upgrade Verification & Supplementing',
      'Full Restoration & Certificate of Completion'
    ]
  },
  { 
    id: '4', 
    title: 'Drone Inspections', 
    category: 'Advanced Tech', 
    action: 'See Tech', 
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'High-resolution aerial imaging for safe, comprehensive assessments.',
    metaDescription: 'Free high-tech drone roof inspections in Charlotte. Safe, AI-powered thermal analysis to detect hidden leaks and damage without climbing your roof.',
    longDescription: 'Gone are the days of manual, dangerous ladder climbs for estimates that might miss hidden issues. Best Roofers Now utilizes state-of-the-art drone technology to perform safe, comprehensive roof inspections. Our drones capture high-resolution 4K imagery and thermal data, allowing us to spot issues like trapped moisture under membranes, subtle hail impact marks, or granule loss patterns that the naked eye might miss. This AI-powered analysis provides you with an unbiased, detailed health report of your roof, empowering you to make informed decisions about repair or replacement.',
    processSteps: [
      'Automated Flight Path Planning',
      'High-Res Aerial & Thermal Image Capture',
      'AI-Powered Damage Detection & Analysis',
      'Comprehensive PDF Report Generation',
      'Virtual Review Consultation with Homeowner'
    ]
  },
  { 
    id: '5', 
    title: 'Emergency Repair', 
    category: '24/7 Response', 
    action: 'Call Now', 
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Immediate response for leaks and storm damage. Available 24/7.',
    metaDescription: '24/7 Emergency Roof Repair in Charlotte, NC. Rapid response for leaks, storm damage, and tarping. Stop water intrusion immediately with Best Roofers Now.',
    longDescription: 'When a leak happens during a storm, speed is critical to preventing costly interior damage to drywall, flooring, and electrical systems. Our emergency response team is on standby 24/7 to deploy immediately across the Greater Charlotte area. We arrive fully equipped to perform emergency tarping, stop active water intrusion, and assess structural safety. Once the storm passes, we return to develop a permanent repair plan. Don\'t let a small leak turn into a major disaster—trust our rapid response team to protect your property day or night.',
    processSteps: [
      '24/7 Rapid Dispatch Hotline',
      'Emergency Leak Mitigation & Tarping',
      'Interior & Exterior Damage Assessment',
      'Temporary Water Diversion',
      'Permanent Repair Strategy & Scheduling'
    ]
  },
  { 
    id: '6', 
    title: 'Platinum Maintenance', 
    category: 'Annual Care', 
    action: 'Subscribe', 
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Proactive maintenance plans including gutter cleaning and debris removal.',
    metaDescription: 'Extend your roof\'s life with our Platinum Maintenance Plan. Includes annual inspections, gutter cleaning, debris removal, and minor repairs for Charlotte homes.',
    longDescription: 'Your roof is a significant investment that requires regular care to reach its full lifespan. Neglect is the leading cause of premature roof failure. Our Platinum Maintenance Plan is a proactive solution designed to catch small issues—like cracked caulking, loose flashing, or debris buildup—before they become expensive leaks. We handle the dangerous and dirty work, including gutter cleaning and valley clearing, so you don\'t have to. Regular maintenance also ensures your manufacturer warranty remains valid, giving you peace of mind year-round.',
    processSteps: [
      'Annual 50-Point Roof Audit & Inspection',
      'Debris Removal from Valleys & Gutters',
      'Pipe Jack Caulking & Flashing Check',
      'Minor Shingle Repairs (up to 3 per visit)',
      'Detailed Health Status Report & Photos'
    ]
  },
];

// Optimized Service Areas
const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'charlotte',
    name: 'Charlotte',
    slug: 'charlotte-roofing',
    coordinates: { x: 50, y: 55 },
    mapId: '6929921876fb8fa56e295536',
    image: 'https://images.unsplash.com/photo-1596280806439-c1b744572236?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'As the heartbeat of our operation, Charlotte requires roofing solutions that can withstand urban heat islands and frequent summer storms. Best Roofers Now provides tailored residential and commercial services across Queen City.',
    features: ['Urban Heat Island Mitigation', 'Historic District Compliance', 'Commercial Flat Roofing', 'Luxury Slate & Metal Options'],
    metaDescription: 'Top-rated roofing company in Charlotte, NC. Best Roofers Now offers 50-year warranties and expert storm restoration for Queen City homes and businesses.',
    keywords: 'Roofing Charlotte NC, Roof Replacement Charlotte, Uptown Charlotte Roofing, Emergency Roof Repair Charlotte'
  },
  {
    id: 'huntersville',
    name: 'Huntersville',
    slug: 'huntersville-roofing',
    coordinates: { x: 50, y: 25 },
    mapId: '692991c876fb8fa56e29522f',
    image: 'https://images.unsplash.com/photo-1571212515416-f63144632c79?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Lake Norman weather brings unique challenges, including higher wind exposure and humidity. We offer specialized algae-resistant shingles and high-wind rated systems perfect for Huntersville properties.',
    features: ['Algae-Resistant Systems', 'High-Wind Warranty', 'Lakefront Property Protection', 'Debris & Tree Guard Systems'],
    metaDescription: 'Trusted Huntersville, NC roofing contractors. Specialized in lakefront property protection and high-wind resistant roof installations.',
    keywords: 'Roofing Huntersville NC, Lake Norman Roofers, Roof Repair Huntersville, Best Roofers Now Lake Norman'
  },
  {
    id: 'concord',
    name: 'Concord',
    slug: 'concord-roofing',
    coordinates: { x: 75, y: 35 },
    mapId: '692991a9a73e38e6e4a2a783',
    image: 'https://images.unsplash.com/photo-1577745233157-5b23d9a0d85a?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'From historic downtown bungalows to new developments near the Speedway, Concord homes have diverse needs. Our team specializes in blending modern storm protection with traditional aesthetics.',
    features: ['Historic Home Renovation', 'Speedway Area Commercial', 'Wind-Resistant Shingles', 'Custom Flashing Work'],
    metaDescription: 'Expert roofing services in Concord, NC. Specializing in historic home roof replacement and storm damage repair near Charlotte Motor Speedway.',
    keywords: 'Roofers Concord NC, Concord Roof Repair, Cabarrus County Roofing, Storm Damage Concord'
  },
  {
    id: 'mooresville',
    name: 'Mooresville',
    slug: 'mooresville-roofing',
    coordinates: { x: 45, y: 15 },
    mapId: '692991f476fb8fa56e295399',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f8e?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Race City USA deserves premium protection. We serve the greater Mooresville area with high-performance roofing systems designed to withstand severe weather events.',
    features: ['Lake Norman Estates', 'Commercial Industrial Roofing', 'High-Impact Shingles', 'Quick Storm Response'],
    metaDescription: 'Mooresville roofing experts. Serving Race City USA with premium residential and commercial roof replacement.',
    keywords: 'Mooresville Roofers, Lake Norman Roofing, Roofing Contractors Mooresville NC'
  },
  {
    id: 'gastonia',
    name: 'Gastonia',
    slug: 'gastonia-roofing',
    coordinates: { x: 20, y: 55 },
    mapId: '6929923d76fb8fa56e2955c9',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Serving Gaston County with pride. Our team provides affordable, high-quality roofing solutions for Gastonia\'s mix of historic mills and modern suburban homes.',
    features: ['Affordable Financing', 'Historic Mill Renovation', 'Metal Roofing Specialists', 'Storm Damage Experts'],
    metaDescription: 'Reliable Gastonia roofing company. Affordable roof repair and replacement for Gaston County homes and businesses.',
    keywords: 'Roofers Gastonia NC, Gaston County Roofing, Metal Roof Gastonia'
  },
  {
    id: 'cornelius',
    name: 'Cornelius',
    slug: 'cornelius-roofing',
    coordinates: { x: 48, y: 20 },
    mapId: '692991e176fb8fa56e2952dc',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Protecting luxury waterfront homes in Cornelius requires specialized knowledge. We use corrosion-resistant materials and high-wind installation techniques.',
    features: ['Luxury Waterfront Specialists', 'Corrosion Resistant Materials', 'Designer Shingles', 'Slate & Tile Options'],
    metaDescription: 'Cornelius, NC luxury roofing contractors. Protecting waterfront homes with high-end roofing materials.',
    keywords: 'Cornelius Roofers, Waterfront Roofing, Luxury Roofing NC'
  },
  {
    id: 'davidson',
    name: 'Davidson',
    slug: 'davidson-roofing',
    coordinates: { x: 52, y: 15 },
    mapId: '692991eb76fb8fa56e29530f',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Preserving the charm of Davidson. We work closely with homeowners to ensure new roofs complement the classic architectural styles of this college town.',
    features: ['Architectural Preservation', 'Cedar Shake Alternatives', 'Sustainable Roofing', 'College Town Specialists'],
    metaDescription: 'Davidson roofing experts. Preserving local charm with architectural shingles and sustainable roofing options.',
    keywords: 'Roofers Davidson NC, Roof Replacement Davidson, Historic Roofing NC'
  },
  {
    id: 'kannapolis',
    name: 'Kannapolis',
    slug: 'kannapolis-roofing',
    coordinates: { x: 80, y: 20 },
    mapId: '692991baa73e38e6e4a2a7dc',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'As Kannapolis revitalizes, we are there to support both residential renovations and commercial upgrades. Our commercial team is highly active in the area.',
    features: ['Commercial Revitalization', 'TPO & Flat Roofing', 'Affordable Financing', 'Code Upgrade Specialists'],
    metaDescription: 'Kannapolis, NC roofing and restoration experts. Commercial TPO and residential roof replacement services.',
    keywords: 'Roofers Kannapolis NC, Commercial Roofing Kannapolis, Roof Repair Kannapolis'
  },
  {
    id: 'matthews',
    name: 'Matthews',
    slug: 'matthews-roofing',
    coordinates: { x: 70, y: 75 },
    mapId: '6929924976fb8fa56e295607',
    image: 'https://images.unsplash.com/photo-1591965832791-03265b4c73df?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'With its heavy tree canopy, Matthews roofs are prone to debris accumulation. Our Platinum Maintenance plans are popular here, protecting against moisture damage.',
    features: ['Debris Guard Installation', 'Moss & Algae Treatment', 'Skylight Installation', 'Gutter Protection Systems'],
    metaDescription: 'Matthews, NC premier roofing services. Expert roof cleaning, maintenance, and replacement.',
    keywords: 'Roofers Matthews NC, Roof Cleaning Matthews, Gutter Guards Matthews'
  },
  {
    id: 'mt-holly',
    name: 'Mt Holly',
    slug: 'mt-holly-roofing',
    coordinates: { x: 30, y: 45 },
    mapId: '6929922b76fb8fa56e295597',
    image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Providing steadfast protection for Mt Holly residents. We specialize in storm restoration and efficient roof replacements for this growing community.',
    features: ['Storm Restoration', 'Fast Turnaround', 'Local Community Focus', 'Leak Detection'],
    metaDescription: 'Mt Holly roofing contractors. Fast, reliable roof repair and replacement for Mt Holly homes.',
    keywords: 'Roofing Mt Holly, Roof Repair Mount Holly NC'
  },
  {
    id: 'mint-hill',
    name: 'Mint Hill',
    slug: 'mint-hill-roofing',
    coordinates: { x: 80, y: 65 },
    mapId: '6929925176fb8fa56e295536',
    image: 'https://images.unsplash.com/photo-1600596542815-2a51387d315f?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Serving the estate homes of Mint Hill requires attention to detail. We specialize in large-format roof replacements and premium designer shingles.',
    features: ['Estate Home Specialists', 'Designer Shingle Options', 'Copper Flashing Accents', 'Large-Scale Project Management'],
    metaDescription: 'Luxury roofing contractor in Mint Hill, NC. Specializing in estate homes and premium designer roof systems.',
    keywords: 'Roofing Mint Hill NC, Estate Roofing Charlotte, Premium Shingles Mint Hill'
  },
  {
    id: 'denver',
    name: 'Denver',
    slug: 'denver-nc-roofing',
    coordinates: { x: 35, y: 25 },
    mapId: '6929920076fb8fa56e29545b',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Denver NC is booming, and we are here to ensure quality construction. From new builds to replacements on the west side of Lake Norman.',
    features: ['New Construction Roofing', 'Lake Norman West Side', 'Metal Roofing', 'Siding & Gutters'],
    metaDescription: 'Denver, NC roofing services. Expert roofers for new construction and replacement on Lake Norman\'s west side.',
    keywords: 'Roofers Denver NC, 28037 Roofing, Lake Norman Roofing'
  },
  {
    id: 'lake-norman',
    name: 'Lake Norman',
    slug: 'lake-norman-roofing',
    coordinates: { x: 45, y: 25 },
    mapId: '6929920c76fb8fa56e2954b8',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Comprehensive coverage for the entire Lake Norman region. We understand the specific wind and water challenges facing lakefront properties.',
    features: ['Regional Coverage', 'Marine Environment Protection', 'Boat House Roofing', 'Premium Aesthetics'],
    metaDescription: 'The #1 Roofing Company for Lake Norman. Serving all lakefront communities with specialized roofing solutions.',
    keywords: 'Lake Norman Roofers, LKN Roofing, Best Roofers Now Lake Norman'
  },
  {
    id: 'monroe',
    name: 'Monroe',
    slug: 'monroe-roofing',
    coordinates: { x: 85, y: 80 },
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Serving Union County with dedication. Monroe properties often face severe weather from the south, requiring robust storm protection systems.',
    features: ['Union County Specialists', 'Agricultural & Residential', 'Storm Hardening', 'Impact Resistant Shingles'],
    metaDescription: 'Monroe, NC trusted roofing contractors. Serving Union County with expert roof repair and replacement.',
    keywords: 'Roofers Monroe NC, Union County Roofing, Storm Damage Monroe'
  },
  {
    id: 'albemarle',
    name: 'Albemarle',
    slug: 'ablemarle-roofing',
    coordinates: { x: 90, y: 40 },
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Quality roofing for Albemarle and Stanly County. We bring modern roofing technology to this historic and growing area.',
    features: ['Stanly County Coverage', 'Historic Downtown Roofing', 'Modern Ventilation', 'Energy Efficient Upgrades'],
    metaDescription: 'Albemarle, NC roofing services. Modern roofing solutions for Stanly County homes and businesses.',
    keywords: 'Roofers Albemarle NC, Stanly County Roofing, Roof Replacement Albemarle'
  },
  {
    id: 'ballantyne',
    name: 'Ballantyne',
    slug: 'ballantyne-roofing',
    coordinates: { x: 55, y: 85 },
    image: 'https://images.unsplash.com/photo-1513584687574-9c7229ea56a9?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Protecting premium properties in Ballantyne. We specialize in HOA compliance and high-end aesthetic roofing systems.',
    features: ['HOA Compliance Experts', 'Premium Slate & Tile', 'Executive Home Roofing', 'Discreet Operations'],
    metaDescription: 'Ballantyne roofing specialists. HOA-compliant luxury roof replacement and repair in South Charlotte.',
    keywords: 'Roofers Ballantyne, South Charlotte Roofing, HOA Roofing NC'
  },
  {
    id: 'weddington',
    name: 'Weddington',
    slug: 'weddington-roofing',
    coordinates: { x: 65, y: 85 },
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Luxury roofing for Weddington\'s estate homes. We provide large-scale roof replacements with minimal disruption to your property.',
    features: ['Estate Protection', 'Large Format Roofing', 'Copper & Metal Accents', 'Privacy Focused'],
    metaDescription: 'Weddington, NC luxury roofing. Expert estate home roof replacement and storm protection.',
    keywords: 'Weddington Roofers, Luxury Roofing Weddington, Estate Roof Replacement'
  },
  {
    id: 'belmont',
    name: 'Belmont',
    slug: 'belmont-roofing',
    coordinates: { x: 25, y: 50 },
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Serving the Belmont community with small-town care and big-city capability. We handle riverfront and historic homes alike.',
    features: ['Riverfront Solutions', 'Historic Renovation', 'Gaston County Service', 'Local Team'],
    metaDescription: 'Belmont, NC roofing company. Expert roofing for historic and riverfront homes in Belmont.',
    keywords: 'Roofers Belmont NC, Historic Roofing Belmont, Gaston County Roofers'
  },
  {
    id: 'shelby',
    name: 'Shelby',
    slug: 'shelby-roofing',
    coordinates: { x: 10, y: 50 },
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Extending our expert services to Shelby. We provide comprehensive storm restoration and commercial roofing for Cleveland County.',
    features: ['Cleveland County Service', 'Commercial Industrial', 'Storm Damage Repair', 'Metal Roofing'],
    metaDescription: 'Shelby, NC roofing experts. Storm restoration and commercial roofing for Cleveland County.',
    keywords: 'Roofers Shelby NC, Cleveland County Roofing, Storm Damage Shelby'
  },
  {
    id: 'westport',
    name: 'Westport',
    slug: 'westport-roofing',
    coordinates: { x: 38, y: 28 },
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=75&w=600&auto=format&fit=crop&fm=webp',
    description: 'Focused on the Westport community on Lake Norman. Specialized roofing for golf course and lakefront living.',
    features: ['Golf Course Communities', 'Lakefront Protection', 'Club Area Roofing', 'High-Value Property Care'],
    metaDescription: 'Westport, NC roofing services. Specialized roofing for golf and lakefront communities.',
    keywords: 'Roofers Westport NC, Lake Norman Roofing, Golf Course Roofing'
  }
];

const FAQS = [
  {
    question: "How long does a roof replacement take?",
    answer: "Most residential roof replacements by Best Roofers Now are completed in just 1-2 days. Our large, experienced crews prioritize efficiency and cleanliness, using tarping systems to protect your landscaping and magnetic sweeps to ensure no nails are left behind."
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes! We understand a new roof is a significant investment. We offer flexible financing options including low monthly payments and 0% interest terms for qualified homeowners. Contact us to get pre-approved in minutes."
  },
  {
    question: "What does your 50-Year Warranty cover?",
    answer: "As a certified contractor, we can offer premium warranties like the GAF System Plus. These cover 100% of material costs for 50 years and include workmanship coverage for up to 25 years, ensuring you never pay out-of-pocket for manufacturing defects or installation errors."
  },
  {
    question: "Will insurance pay for my roof replacement?",
    answer: "If your roof has sustained documented wind or hail damage, your homeowners insurance may cover a full replacement. Our team includes former insurance adjusters who understand the claims process. We provide free digital inspections to document damage and advocate on your behalf."
  },
  {
    question: "What is the difference between 3-tab and architectural shingles?",
    answer: "Architectural (dimensional) shingles are thicker, heavier, and more durable than traditional 3-tab shingles. They offer better wind resistance (up to 130 mph) and create a rich, textured look that boosts curb appeal. We almost exclusively install architectural shingles due to their superior performance."
  }
];

// Refactored SOCIAL_LINKS to use string IDs
const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com/bestroofingnowllc', id: 'facebook', color: 'hover:bg-blue-600' },
  { name: 'Instagram', url: 'https://www.instagram.com/bestroofingnow', id: 'instagram', color: 'hover:bg-pink-600' },
  { name: 'X (Twitter)', url: 'https://x.com/bestroofingnow', id: 'twitter', color: 'hover:bg-black' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@bestroofingnow', id: 'tiktok', color: 'hover:bg-black' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/bestroofingnowllc/', id: 'pinterest', color: 'hover:bg-red-600' },
  { name: 'YouTube', url: 'https://www.youtube.com/@bestroofingnowllc', id: 'youtube', color: 'hover:bg-red-600' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/best-roofing-now-llc/', id: 'linkedin', color: 'hover:bg-blue-700' },
  { name: 'Yelp', url: 'https://www.yelp.com/biz/best-roofing-now-charlotte-9', id: 'yelp', color: 'hover:bg-red-700' },
];

const renderSocialIcon = (id: string, className: string) => {
  switch (id) {
    case 'facebook': return <Facebook className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'twitter': return <TwitterX className={className} />;
    case 'tiktok': return <TikTokIcon className={className} />;
    case 'pinterest': return <Pinterest className={className} />;
    case 'youtube': return <Youtube className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'yelp': return <Star className={className} />;
    default: return null;
  }
};

const LOGO_URL = "https://storage.googleapis.com/msgsndr/YnvUmp9cZqt5xmVLrnoq/media/6927385cc3c18274f73920b2.png";
const INSTANT_ESTIMATE_URL = "https://journeys.demand-iq.com/631cdf2c-ff57-11ef-b232-0a58a9feac02?journeyId=40ddea4c-3884-48bb-9acb-1fcbf409bc60";

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Handle URL Hash for "Routing"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // Commercial Exception Logic
      try {
        if (hash.startsWith('#/commercial-roofing-')) {
            const citySlug = hash.replace('#/commercial-roofing-', '');
            // Find the matching area by name (approximate) or generic lookup
            const area = SERVICE_AREAS.find(a => a.slug.includes(citySlug) || a.name.toLowerCase() === citySlug.toLowerCase());
            
            if (area) {
               // Create a "Commercial Variant" of the area
               const commercialArea: ServiceArea = {
                   ...area,
                   name: `${area.name} Commercial`,
                   description: `Best Roofers Now provides premier Commercial Roofing services in ${area.name}. From flat roof TPO systems to industrial coatings, we ensure your business stays protected with minimal disruption.`,
                   features: ['TPO & EPDM Systems', 'Industrial Coatings', 'Commercial Maintenance', 'Leak Detection'],
                   variant: 'commercial'
               };
               setSelectedArea(commercialArea);
               return;
            }
        }
  
        if (hash.startsWith('#/locations/')) {
          const slug = hash.replace('#/locations/', '');
          const area = SERVICE_AREAS.find(a => a.slug === slug);
          if (area) {
            setSelectedArea(area);
          }
        } else if (hash.startsWith('#/service/')) {
          const id = hash.replace('#/service/', '');
          const service = SERVICES.find(s => s.id === id);
          if (service) {
            setSelectedService(service);
          }
        } else {
          // Close modals if hash is cleared or generic
          if (!hash.includes('locations') && !hash.includes('commercial-roofing')) setSelectedArea(null);
          if (!hash.includes('service')) setSelectedService(null);
        }
      } catch (error) {
        console.error("Hash routing error:", error);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic SEO Effect
  useEffect(() => {
    if (selectedService) {
      updateSEO({
        title: `${selectedService.title} | Best Roofers Now`,
        description: selectedService.metaDescription || selectedService.description,
        keywords: `${selectedService.title}, Roofing Charlotte, ${selectedService.category}`,
        image: selectedService.image,
        url: `https://bestroofingnow.com/#/service/${selectedService.id}`,
        type: 'article',
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": selectedService.title,
          "name": selectedService.title,
          "description": selectedService.longDescription || selectedService.description,
          "provider": {
            "@type": "RoofingContractor",
            "name": "Best Roofers Now",
            "url": "https://bestroofingnow.com",
            "telephone": "+1-704-605-6047",
            "image": LOGO_URL,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "10130 Mallard Creek Road, Suite 300",
              "addressLocality": "Charlotte",
              "addressRegion": "NC",
              "postalCode": "28262",
              "addressCountry": "US"
            },
            "priceRange": "$$"
          },
          "areaServed": {
            "@type": "City",
            "name": "Charlotte",
             "geo": {
              "@type": "GeoCoordinates",
              "latitude": 35.2271,
              "longitude": -80.8431
            },
             "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlotte",
                "addressRegion": "NC",
                "addressCountry": "US"
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": selectedService.category,
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": selectedService.title
                }
              }
            ]
          }
        }
      });
    } else if (selectedArea) {
       updateSEO({
        title: `Best Roofers Now in ${selectedArea.name}, NC | Local Experts`,
        description: selectedArea.metaDescription,
        keywords: selectedArea.keywords,
        image: areaImageOrLogo(selectedArea),
        url: `https://bestroofingnow.com/#/locations/${selectedArea.slug}`,
        type: 'business.business',
        schema: {
          "@context": "https://schema.org",
          "@type": "RoofingContractor",
          "name": `Best Roofers Now - ${selectedArea.name}`,
          "description": selectedArea.description,
          "image": areaImageOrLogo(selectedArea),
          "telephone": "+1-704-605-6047",
          "url": `https://bestroofingnow.com/#/locations/${selectedArea.slug}`,
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "14:00"
            }
          ],
          "parentOrganization": {
              "@type": "RoofingContractor",
              "name": "Best Roofers Now",
              "url": "https://bestroofingnow.com",
              "image": LOGO_URL
          },
          "address": {
             "@type": "PostalAddress",
             "addressLocality": selectedArea.name,
             "addressRegion": "NC",
             "addressCountry": "US"
          },
          "areaServed": {
            "@type": "City",
            "name": selectedArea.name,
             "address": {
                "@type": "PostalAddress",
                "addressLocality": selectedArea.name,
                "addressRegion": "NC",
                "addressCountry": "US"
            }
          }
        }
      });
    } else {
      // DEFAULT SEO + FAQ SCHEMA
      const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
      };
      
      const homeSchema = [
        {
          "@context": "https://schema.org",
          "@type": "RoofingContractor",
          "name": "Best Roofers Now",
          "url": "https://bestroofingnow.com",
          "telephone": "+1-704-605-6047",
          "image": LOGO_URL,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "10130 Mallard Creek Road, Suite 300",
            "addressLocality": "Charlotte",
            "addressRegion": "NC",
            "postalCode": "28262",
            "addressCountry": "US"
          },
           "priceRange": "$$"
        },
        faqSchema
      ];

      updateSEO({
          title: "Best Roofers Now | Charlotte Roofing & Storm Restoration Experts",
          description: "Best Roofers Now is Charlotte's trusted expert for residential & commercial roofing, storm damage repair, and free drone inspections. 50-Year Warranty. Licensed in NC/SC.",
          schema: homeSchema as any // Cast to allow array
      });
    }
  }, [selectedService, selectedArea]);

  const areaImageOrLogo = (area: ServiceArea) => {
      // Helper to return valid image or fallback
      return area.image || LOGO_URL;
  };

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleBooking = () => {
    setBookingModalOpen(true);
  };

  const handleServiceClick = (service: ServiceItem) => {
    window.location.hash = `#/service/${service.id}`;
    // State update handled by hash listener
  };

  const handleAreaClick = (area: ServiceArea) => {
    window.location.hash = `#/locations/${area.slug}`;
    // State update handled by hash listener
  };

  const closeModals = () => {
    try {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } catch (e) {
      console.warn('History API not supported', e);
    }
    // Prevent scroll restoration if browser tries to jump
    const scrollY = window.scrollY;
    setSelectedService(null);
    setSelectedArea(null);
    // requestAnimationFrame(() => window.scrollTo(0, scrollY));
  };

  // Improved Smooth Scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Check if we need to close modals first
    if (selectedService || selectedArea) {
      closeModals();
      setTimeout(() => {
         const element = document.getElementById(id);
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
      }, 300); // Wait for modal close
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  }

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white selection:bg-red-500 selection:text-white" ref={scrollRef}>
      <CustomCursor />
      <FluidBackground />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      
      <ServiceDetailModal 
        service={selectedService} 
        onClose={closeModals} 
        onBook={handleBooking} 
      />

      <LocationModal 
        area={selectedArea}
        onClose={closeModals}
        onBook={handleBooking}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 mix-blend-difference" role="banner" aria-label="Main Navigation Header">
        <div className="flex items-center gap-2">
           <a href="/" aria-label="Return to Best Roofers Now Homepage">
             <img src={LOGO_URL} alt="Best Roofers Now Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-md" width="150" height="64" />
           </a>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase" role="navigation" aria-label="Desktop Navigation">
          {['Services', 'Areas', 'Maintenance'].map((item) => {
             const sectionId = item.toLowerCase() === 'maintenance' ? 'plans' : item.toLowerCase();
             return (
             <a 
               key={item} 
               href={`#${sectionId}`} 
               onClick={(e) => scrollToSection(e, sectionId)}
               className="hover:text-red-400 transition-colors" 
               data-hover="true"
               aria-label={`Scroll to ${item} section`}
             >
               {item}
             </a>
          )})}
          
          <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
             {SOCIAL_LINKS.map((link) => (
                <a 
                   key={link.name}
                   href={link.url} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label={`Visit ${link.name}`}
                   className={`p-1.5 rounded-full bg-white/5 hover:text-white transition-colors ${link.color}`}
                >
                   {renderSocialIcon(link.id, "w-4 h-4")}
                </a>
             ))}
          </div>

          <a 
            href={INSTANT_ESTIMATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 ml-4 group"
            data-hover="true"
            aria-label="Get an instant roofing estimate (opens in new tab)"
          >
             <Calculator className="w-4 h-4 group-hover:animate-pulse" aria-hidden="true" /> <span className="group-hover:underline decoration-red-500 underline-offset-4 decoration-2">Get Estimate</span>
          </a>
          <button 
            onClick={handleBooking}
            className="bg-gradient-to-r from-red-600 to-red-500 border border-transparent px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] hover:scale-105 transition-all duration-300 font-bold tracking-wider"
            data-hover="true"
            aria-label="Open consultation booking form"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-w-[48px] min-h-[48px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="w-8 h-8" /> : <Menu aria-hidden="true" className="w-8 h-8" />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <nav className="flex flex-col items-center gap-6 w-full px-6 max-w-sm py-12">
                {['Services', 'Areas', 'Maintenance'].map((item, i) => {
                  const sectionId = item.toLowerCase() === 'maintenance' ? 'plans' : item.toLowerCase();
                  return (
                  <motion.a 
                    key={item} 
                    href={`#${sectionId}`}
                    onClick={(e) => scrollToSection(e, sectionId)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), type: "spring" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center min-h-[60px] py-5 text-3xl font-heading font-bold uppercase tracking-wider text-white hover:text-red-400 active:text-red-400 transition-colors border-b border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
                    aria-label={`Scroll to ${item} section`}
                  >
                    {item}
                  </motion.a>
                )})}
                
                {/* Socials Mobile - ENHANCED TOUCH TARGETS */}
                <div className="flex flex-wrap justify-center gap-4 my-4 w-full">
                    {SOCIAL_LINKS.map((link, i) => (
                         <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            // Enforce 48x48px minimum touch target, high contrast text
                            className={`p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center ${link.color}`}
                            aria-label={`Visit Facebook profile`}
                         >
                            {renderSocialIcon(link.id, "w-6 h-6")}
                         </motion.a>
                    ))}
                </div>

                {/* Estimate - ENHANCED CONTRAST */}
                <motion.a 
                  href={INSTANT_ESTIMATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  whileTap={{ scale: 0.95 }}
                  // Changed from text-red-500 to text-red-400 for better contrast on dark bg
                  className="w-full flex items-center justify-center gap-3 min-h-[60px] py-5 text-2xl font-heading font-bold uppercase tracking-wider text-red-400 hover:text-red-300 active:text-red-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
                  aria-label="Get an instant roofing estimate (opens in new tab)"
                >
                  <Calculator className="w-8 h-8" aria-hidden="true" /> Get Estimate
                </motion.a>

                <motion.button 
                  onClick={() => { setMobileMenuOpen(false); handleBooking(); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full min-h-[60px] bg-white text-black hover:bg-gray-100 py-4 rounded-full font-bold uppercase tracking-widest mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  aria-label="Open consultation booking form"
                >
                  Book Consultation
                </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24 md:pt-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        
        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center mb-32 relative" aria-label="Hero Section">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10"
           >
             <h1 className="font-heading text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-8 mix-blend-exclusion">
               BEST <br />
               <GradientText text="ROOFERS" /> <br />
               NOW
             </h1>
             <p className="max-w-xl text-xl md:text-2xl font-light text-gray-300 mb-12 border-l-2 border-red-500 pl-6 leading-relaxed">
               Integrity. Community. Excellence. <br/>
               <span className="text-white font-medium">Charlotte's Premier Roofing & Storm Restoration Experts.</span>
             </p>

             <div className="flex flex-col sm:flex-row gap-6">
               <button 
                 onClick={handleBooking}
                 className="group relative px-8 py-4 bg-red-600 overflow-hidden rounded-full font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] hover:scale-105 transition-all duration-300 animate-[pulse_3s_infinite]"
                 data-hover="true"
                 aria-label="Start your roofing project today"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   Start Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                 </span>
               </button>
               <a 
                 href={INSTANT_ESTIMATE_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-4 bg-white text-black border border-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                 data-hover="true"
                 aria-label="Get an instant online estimate (opens in new tab)"
               >
                 <Calculator className="w-5 h-5 text-red-600" aria-hidden="true" /> Instant Estimate
               </a>
             </div>
           </motion.div>

           {/* Stats Marquee */}
           <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm" aria-hidden="true">
             <motion.div 
               className="flex whitespace-nowrap gap-16 md:gap-32 text-gray-400 font-heading font-bold text-sm tracking-widest uppercase"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             >
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="flex items-center gap-4"><Shield className="w-5 h-5 text-red-500" /> 50-Year Warranty</span>
                    <span className="flex items-center gap-4"><Drone className="w-5 h-5 text-blue-500" /> Free Drone Inspections</span>
                    <span className="flex items-center gap-4"><Zap className="w-5 h-5 text-yellow-500" /> 24/7 Emergency Service</span>
                    <span className="flex items-center gap-4"><Heart className="w-5 h-5 text-pink-500" /> Family Owned</span>
                  </React.Fragment>
                ))}
             </motion.div>
           </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-48" aria-labelledby="services-heading">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 id="services-heading" className="text-4xl md:text-6xl font-heading font-bold">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600">Services</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-right">
              Comprehensive roofing solutions for every property type. From historic homes to industrial complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10" role="list">
            {SERVICES.map((service) => (
              <ServiceCard 
                key={service.id} 
                artist={service} 
                onClick={() => handleServiceClick(service)} 
              />
            ))}
          </div>
        </section>

        {/* Areas Section */}
        <section id="areas" className="mb-48 relative" aria-labelledby="areas-heading">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="text-center mb-16">
              <h2 id="areas-heading" className="text-4xl md:text-6xl font-heading font-bold mb-6">Service <span className="text-red-500">Areas</span></h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Serving the Greater Charlotte Metro area with localized expertise. Click your city to explore past projects.
              </p>
           </div>

           <ServiceMap areas={SERVICE_AREAS} onSelectArea={handleAreaClick} />
        </section>

        {/* Why Choose Us Section - NEW */}
        <motion.section 
          id="why-us" 
          className="mb-48" 
          aria-labelledby="why-us-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 id="why-us-heading" className="text-4xl md:text-5xl font-heading font-bold mb-4">Why Choose <span className="text-red-500">Us?</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Users, title: "Family Owned", desc: "Founded by father-son team Fred & James Turner." },
               { icon: Award, title: "50-Year Warranty", desc: "Certified installers for GAF & CertainTeed systems." },
               { icon: Drone, title: "Drone Precision", desc: "Advanced aerial technology for 100% accuracy." },
               { icon: Heart, title: "Community First", desc: "Deeply rooted in Charlotte with local charity focus." }
             ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-center group">
                   <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/50">
                      <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
             ))}
          </div>
        </motion.section>

        {/* Reviews Section - NEW */}
        <motion.section 
          id="reviews" 
          className="mb-48" 
          aria-labelledby="reviews-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
           <h2 id="reviews-heading" className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center">Customer <span className="text-blue-500">Reviews</span></h2>
           <div className="w-full bg-white rounded-xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] border border-white/10">
               <iframe 
                 className="lc_reviews_widget" 
                 src="https://manage.bestroofingnow.com/reputation/widgets/review_widget/YnvUmp9cZqt5xmVLrnoq?widgetId=691f1dc6f44c6d6cf097352c" 
                 frameBorder="0" 
                 scrolling="no" 
                 style={{ minWidth: '100%', width: '100%', height: '800px' }}
                 title="Best Roofers Now Customer Reviews"
               />
           </div>
        </motion.section>

        {/* Maintenance Plans */}
        <section id="plans" className="mb-32" aria-labelledby="plans-heading">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 id="plans-heading" className="text-4xl md:text-6xl font-heading font-bold mb-4">Maintenance <span className="text-red-500">Plans</span></h2>
            <p className="text-gray-400 max-w-2xl">
              Proactive care to extend the lifespan of your residential or commercial roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Residential Plan */}
             <div className="relative p-1 rounded-3xl bg-gradient-to-b from-red-500 to-blue-600">
                <div className="bg-[#0f172a] rounded-[22px] p-8 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h3 className="text-2xl font-bold text-white">Platinum Residential</h3>
                         <p className="text-gray-400 text-sm mt-1">For Homeowners</p>
                      </div>
                      <Shield className="w-8 h-8 text-red-500" aria-hidden="true" />
                   </div>
                   <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=75&w=600&auto=format&fit=crop&fm=webp" alt="Residential Maintenance" className="w-full h-32 object-cover rounded-lg mb-4 opacity-80" loading="lazy" />
                      <p className="text-sm text-gray-300">Complete peace of mind for your family's home.</p>
                   </div>
                   <ul className="space-y-4 mb-8 flex-1">
                      {['Annual 50-Point Inspection', 'Gutter Cleaning', 'Debris Removal', 'Priority Storm Response', 'Discounted Repairs'].map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" /> {feat}
                         </li>
                      ))}
                   </ul>
                   <button onClick={handleBooking} className="w-full py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold uppercase tracking-widest transition-colors" aria-label="Join residential maintenance plan waitlist">
                      Join Waitlist
                   </button>
                </div>
             </div>

             {/* Commercial Plan */}
             <div className="relative p-1 rounded-3xl bg-white/10 hover:bg-white/20 transition-colors">
                <div className="bg-[#0f172a] rounded-[22px] p-8 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h3 className="text-2xl font-bold text-white">Commercial Elite</h3>
                         <p className="text-gray-400 text-sm mt-1">For Business Owners</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-blue-500" aria-hidden="true" />
                   </div>
                   <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <img src="https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=75&w=600&auto=format&fit=crop&fm=webp" alt="Commercial Maintenance" className="w-full h-32 object-cover rounded-lg mb-4 opacity-80" loading="lazy" />
                      <p className="text-sm text-gray-300">Protecting your business assets and operations.</p>
                   </div>
                   <ul className="space-y-4 mb-8 flex-1">
                      {['Bi-Annual Roof Audits', 'Drain & Scupper Cleaning', 'Coating Condition Checks', 'Leak Documentation', 'Capital Expenditure Planning'].map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" /> {feat}
                         </li>
                      ))}
                   </ul>
                   <button onClick={handleBooking} className="w-full py-4 bg-transparent border border-white/20 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest transition-colors" aria-label="Request commercial maintenance proposal">
                      Request Proposal
                   </button>
                </div>
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-32" aria-labelledby="faq-heading">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-heading font-bold mb-4">Frequently Asked <span className="text-blue-500">Questions</span></h2>
            <p className="text-gray-400 max-w-2xl">
              Answers to common roofing questions for Charlotte homeowners.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
             {FAQS.map((faq, index) => (
               <div key={index} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                 <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                    aria-expanded={openFaqIndex === index}
                 >
                    <span className="font-bold text-lg pr-4">{faq.question}</span>
                    {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-red-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                 </button>
                 <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                         <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
                            {faq.answer}
                         </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-16 pb-8" role="contentinfo">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                 <img src={LOGO_URL} alt="Best Roofers Now Footer Logo" className="h-12 w-auto mb-6 opacity-80" width="150" height="48" loading="lazy" />
                 <p className="text-gray-400 max-w-sm mb-6">
                   10130 Mallard Creek Road, Suite 300<br/>
                   Charlotte, NC 28262<br/><br/>
                   (704) 605-6047<br/>
                   james@bestroofingnow.com
                 </p>
                 <div className="flex flex-wrap gap-4">
                    {SOCIAL_LINKS.map((link) => (
                        <a 
                           key={link.name}
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={`Visit Best Roofers Now on ${link.name} (opens in new tab)`}
                           className={`p-2 bg-white/5 rounded-full hover:text-white transition-colors ${link.color}`}
                        >
                           {renderSocialIcon(link.id, "w-5 h-5")}
                        </a>
                    ))}
                 </div>
              </div>
              
              <div>
                 <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Sitemap</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} aria-label="Scroll to Services section" className="hover:text-white transition-colors">Services</a></li>
                    <li><a href="#areas" onClick={(e) => scrollToSection(e, 'areas')} aria-label="Scroll to Service Areas section" className="hover:text-white transition-colors">Service Areas</a></li>
                    <li><a href="#plans" onClick={(e) => scrollToSection(e, 'plans')} aria-label="Scroll to Plans section" className="hover:text-white transition-colors">Plans</a></li>
                    <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} aria-label="Scroll to FAQ section" className="hover:text-white transition-colors">FAQ</a></li>
                    <li><a href={INSTANT_ESTIMATE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get an instant estimate (opens in new tab)" className="hover:text-white transition-colors">Instant Estimate</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Service Areas</h4>
                 <ul className="space-y-2 text-gray-400 text-sm">
                    {SERVICE_AREAS.slice(0, 6).map(area => (
                       <li key={area.id}>
                         <a href={`#/locations/${area.slug}`} aria-label={`Open detailed information for ${area.name}`} className="hover:text-white transition-colors">{area.name}</a>
                       </li>
                    ))}
                    <li><a href="#areas" onClick={(e) => scrollToSection(e, 'areas')} aria-label="View all service area locations" className="text-red-500 hover:text-red-400">View All Locations</a></li>
                 </ul>
              </div>
           </div>
           
           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Best Roofers Now LLC. All rights reserved.</p>
              <div className="flex gap-6">
                 <a href="#" aria-label="Read our Privacy Policy" className="hover:text-white">Privacy Policy</a>
                 <a href="#" aria-label="Read our Terms of Service" className="hover:text-white">Terms of Service</a>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
