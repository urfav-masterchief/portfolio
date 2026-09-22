"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  alpha: number;
  originalAlpha: number;
  mass: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  alpha: number;
}

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and velocity tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
      radius: 170, // Interaction radius
    };

    const shockwaves: Shockwave[] = [];

    // Luminous Antigravity & Astra color palette
    const colors = [
      "rgba(0, 242, 254, ",   // Electric Cyan
      "rgba(139, 92, 246, ",  // Celestial Violet
      "rgba(56, 189, 248, ",  // Sky Blue
      "rgba(16, 185, 129, ",  // Emerald Spark
      "rgba(241, 245, 249, ", // Starlight White
    ];

    // Compute particle density based on screen dimensions
    const particleCount = Math.min(
      Math.floor((width * height) / 11000),
      130
    );

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      const baseRadius = Math.random() * 1.8 + 0.8;
      const alpha = Math.random() * 0.6 + 0.25;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseRadius,
        radius: baseRadius,
        color: colorPrefix,
        alpha,
        originalAlpha: alpha,
        mass: Math.random() * 1.5 + 0.8,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 280,
        strength: 9,
        alpha: 0.8,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const render = () => {
      // Clear with subtle opacity for smooth cosmic motion trails
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Draw interactive mouse spotlight glow
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.4
        );
        mouseGlow.addColorStop(0, "rgba(0, 242, 254, 0.09)");
        mouseGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
        mouseGlow.addColorStop(1, "transparent");

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5.5;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.02) {
          shockwaves.splice(s, 1);
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Default constant drift
        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrap
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Interactive Antigravity & Gravitational deflection with mouse
        if (mouse.isHovering) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 1) {
            // Gentle repulsive antigravity lensing
            const force = (1 - dist / mouse.radius) * 1.8;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * p.mass;
            p.y += Math.sin(angle) * force * p.mass;

            // Connect energetic beam from mouse to close particles
            if (dist < mouse.radius * 0.75) {
              const beamAlpha = (1 - dist / (mouse.radius * 0.75)) * 0.25;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(0, 242, 254, ${beamAlpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }

            p.radius = p.baseRadius * 1.4;
            p.alpha = Math.min(1, p.originalAlpha * 1.5);
          } else {
            p.radius = p.baseRadius;
            p.alpha = p.originalAlpha;
          }
        }

        // Apply shockwave forces
        for (const sw of shockwaves) {
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);

          if (Math.abs(sdist - sw.radius) < 35) {
            const sangle = Math.atan2(sdy, sdx);
            p.x += Math.cos(sangle) * sw.strength * 0.4;
            p.y += Math.sin(sangle) * sw.strength * 0.4;
          }
        }

        // Connect constellation lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          const maxDist = 95;
          if (cdist < maxDist) {
            const lineAlpha = (1 - cdist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Render particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep celestial gradient backdrop */}
      <div className="absolute inset-0 bg-[#04060a]" />

      {/* Atmospheric dynamic aurora blobs */}
      <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-cyan-600/10 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-violet-600/10 blur-[170px] rounded-full" />
      <div className="absolute -bottom-20 left-1/3 w-[650px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />

      {/* Interactive HTML5 Canvas Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
