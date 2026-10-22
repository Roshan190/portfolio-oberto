'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroChartBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const drawGrid = () => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(4, 120, 87, 0.05)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();

      // Draw elegant sweeping curves (like a growth chart)
      const lines = 3;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Base line properties
        const isMain = i === 0;
        ctx.strokeStyle = isMain ? 'rgba(4, 120, 87, 0.25)' : `rgba(4, 120, 87, ${0.12 - i * 0.02})`;
        ctx.lineWidth = isMain ? 2.5 : 1.5;
        
        // Start from bottom left, go to top right (growth)
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 10) {
          // Calculate y using multiple sine waves for organic bezier-like movement
          const normalizedX = x / width;
          
          // Growth curve base (starts low, goes high)
          const baseGrowth = height - (normalizedX * height * 0.8);
          
          // Add organic waves
          const wave1 = Math.sin(normalizedX * 4 + time + i) * 50;
          const wave2 = Math.cos(normalizedX * 3 - time * 1.5 + i * 2) * 30;
          const wave3 = Math.sin(normalizedX * 8 + time * 2) * 10;
          
          const y = baseGrowth + wave1 + wave2 + wave3;
          
          ctx.lineTo(x, y);
        }
        
        // Connect to bottom right and bottom left to fill area
        if (isMain) {
          const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
          fillGradient.addColorStop(0, 'rgba(4, 120, 87, 0.08)');
          fillGradient.addColorStop(1, 'rgba(4, 120, 87, 0)');
          
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.fillStyle = fillGradient;
          ctx.fill();
        }
        
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
