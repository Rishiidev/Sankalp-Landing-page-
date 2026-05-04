'use client';

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    // For responsive resize
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return;

    const baseMarkers: { location: [number, number]; size: number }[] = [
      { location: [28.6139, 77.2090], size: 0.15 }, // New Delhi
      { location: [40.7128, -74.0060], size: 0.08 }, // New York
      { location: [51.5074, -0.1278], size: 0.09 }, // London
      { location: [19.0760, 72.8777], size: 0.14 }, // Mumbai
      { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
      { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
      { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
      { location: [43.6510, -79.3470], size: 0.05 }, // Toronto
      { location: [37.7749, -122.4194], size: 0.06 }, // SF
      { location: [25.2048, 55.2708], size: 0.1 }, // Dubai
      { location: [12.9716, 77.5946], size: 0.12 }, // Bangalore
      { location: [13.0827, 80.2707], size: 0.11 }, // Chennai
      { location: [22.5726, 88.3639], size: 0.1 }, // Kolkata
      { location: [-23.5505, -46.6333], size: 0.05 }, // Sao Paulo
      { location: [48.8566, 2.3522], size: 0.06 }, // Paris
      { location: [52.5200, 13.4050], size: 0.04 }, // Berlin
      { location: [-26.2041, 28.0473], size: 0.05 }, // Johannesburg
      { location: [34.0522, -118.2437], size: 0.07 }, // LA
      { location: [39.9042, 116.4074], size: 0.06 }, // Beijing
      { location: [-34.6037, -58.3816], size: 0.04 }, // Buenos Aires
      { location: [55.7558, 37.6173], size: 0.05 }, // Moscow
      { location: [30.0444, 31.2357], size: 0.06 }, // Cairo
      { location: [41.0082, 28.9784], size: 0.07 }, // Istanbul
      { location: [21.0285, 105.8542], size: 0.06 }, // Hanoi
      { location: [-6.2088, 106.8456], size: 0.08 }, // Jakarta
      { location: [14.5995, 120.9842], size: 0.07 }, // Manila
      { location: [18.5204, 73.8567], size: 0.1 }, // Pune
      { location: [17.3850, 78.4867], size: 0.1 }, // Hyderabad
      { location: [23.0225, 72.5714], size: 0.09 }, // Ahmedabad
      { location: [26.8467, 80.9462], size: 0.08 }, // Lucknow
      // Additional markers
      { location: [31.2304, 121.4737], size: 0.09 }, // Shanghai
      { location: [22.3193, 114.1694], size: 0.08 }, // Hong Kong
      { location: [45.4215, -75.6972], size: 0.05 }, // Ottawa
      { location: [-12.0464, -77.0428], size: 0.06 }, // Lima
      { location: [6.5244, 3.3792], size: 0.07 }, // Lagos
      { location: [35.6895, 139.6917], size: 0.12 }, // Tokyo
      { location: [51.1657, 10.4515], size: 0.05 }, // Germany
      { location: [-37.8136, 144.9631], size: 0.06 }, // Melbourne
      { location: [41.9028, 12.4964], size: 0.05 }, // Rome
      { location: [25.0330, 121.5654], size: 0.07 }, // Taipei
      { location: [37.5665, 126.9780], size: 0.08 }, // Seoul
      { location: [1.2921, 36.8219], size: 0.06 }, // Nairobi
      { location: [19.4326, -99.1332], size: 0.07 }, // Mexico City
      { location: [28.0836, -80.6081], size: 0.05 }, // Florida
      { location: [47.6062, -122.3321], size: 0.06 }, // Seattle
      { location: [53.5511, 9.9937], size: 0.05 }, // Hamburg
      { location: [48.1351, 11.5820], size: 0.06 }, // Munich
      { location: [33.7490, -84.3880], size: 0.05 }, // Atlanta
      { location: [39.7392, -104.9903], size: 0.04 }, // Denver
      { location: [21.3069, -157.8583], size: 0.03 }, // Honolulu
      { location: [35.2271, -80.8431], size: 0.05 }, // Charlotte
      { location: [-36.8485, 174.7633], size: 0.06 }, // Auckland
      { location: [10.7626, 106.6602], size: 0.07 }, // Ho Chi Minh
      { location: [40.4168, -3.7038], size: 0.06 }, // Madrid
      { location: [59.3293, 18.0686], size: 0.05 }, // Stockholm
      { location: [55.6761, 12.5683], size: 0.04 }, // Copenhagen
    ];

    let t = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 2,
      mapSamples: 32000,
      mapBrightness: 12,
      baseColor: [0.03, 0.03, 0.03], // Deep dark
      markerColor: [255 / 255, 180 / 255, 80 / 255], // Brighter orange
      glowColor: [255 / 255, 220 / 255, 120 / 255], // Bright halo orange/yellow
      markers: baseMarkers,
      // @ts-expect-error onRender is missing in types
      onRender: (state) => {
        // Continuous slow rotation unless dragged
        if (!pointerInteracting.current) {
          phi += 0.001 // very slow rotation
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;

        t += 0.05;
        // Evaluate dynamic pulsing size and brightness
        state.markers = baseMarkers.map((m, i) => {
          const pulse = Math.sin(t + i * 1.2);
          const active = pulse > 0.6;
          return {
            location: m.location as [number, number],
            size: m.size + Math.max(0, pulse) * 0.04,
          };
        });
      }
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 100);

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <motion.div 
      style={{ width: '100%', maxWidth: 700, aspectRatio: 1, margin: 'auto', position: 'relative' }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      {/* Background ethereal starfield/aurora effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50 mix-blend-screen pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.15)_0%,transparent_50%)] rounded-full blur-[40px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)] rounded-full blur-[60px]"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          contain: 'layout paint size', 
          opacity: 0, 
          transition: 'opacity 1.5s ease',
          filter: isHovered 
            ? 'drop-shadow(0px 0px 60px rgba(249,115,22,0.5)) drop-shadow(0px 0px 120px rgba(249,115,22,0.25))' 
            : 'drop-shadow(0px 0px 40px rgba(249,115,22,0.3)) drop-shadow(0px 0px 100px rgba(249,115,22,0.15))'
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = '';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = '';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
      />
    </motion.div>
  )
}
