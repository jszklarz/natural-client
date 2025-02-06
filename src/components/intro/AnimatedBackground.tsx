import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

interface AnimatedBackgroundProps {
  onColorChange: (color: string) => void;
}

export const AnimatedBackground = ({ onColorChange }: AnimatedBackgroundProps) => {
  const [mouseX, setMouseX] = useState(0);

  const barWidth = 10;
  const barCount = Math.floor(window.innerWidth / barWidth);

  const bars = Array.from({ length: barCount }, (_, i) => ({
    id: i,
    color: `hsl(${200 + (i * 4)}deg, 80%, 60%)`,
    oscillation: {
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
      offset: 0.5 + Math.random()
    }
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      setMouseX(mouseX);

      // Find the 3 nearest bars
      const nearestBars = bars
        .map((bar, index) => {
          const barX = (index + 0.5) * (window.innerWidth / bars.length);
          return { ...bar, distance: Math.abs(mouseX - barX) };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      // Convert bar colors to RGB and average them
      let r = 0, g = 0, b = 0;
      nearestBars.forEach(bar => {
        const hslMatch = bar.color.match(/(\d+\.?\d*)deg, (\d+\.?\d*)%, (\d+\.?\d*)%/);
        const [h, s, l] = hslMatch?.slice(1).map(Number) || [200, 80, 60];
        const [cr, cg, cb] = hslToRgb(h, s, l);
        const weight = Math.max(0, 1 - bar.distance / 400);
        r += cr * weight;
        g += cg * weight;
        b += cb * weight;
      });

      const totalWeight = nearestBars.reduce((acc, bar) => acc + (1 - bar.distance / 400), 0);
      const avgR = Math.round(r / totalWeight);
      const avgG = Math.round(g / totalWeight);
      const avgB = Math.round(b / totalWeight);

      onColorChange(`rgba(${avgR}, ${avgG}, ${avgB}, 1)`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [bars, onColorChange]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-64 flex items-end">
      {bars.map((bar, index) => {
        const barX = (index + 0.5) * (window.innerWidth / bars.length);
        const distance = Math.abs(mouseX - barX);
        const height = Math.max(1, 30 - (distance * 0.8) * (Math.random() + 1));

        return (
          <motion.div
            key={bar.id}
            className="flex-1"
            initial={{ height: 20, translateY: 0 }}
            animate={{
              height: `${height}%`,
              translateY: [-bar.oscillation.offset, bar.oscillation.offset]
            }}
            transition={{
              height: { type: "spring", stiffness: 300, damping: 50 },
              translateY: {
                duration: bar.oscillation.duration,
                delay: bar.oscillation.delay,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }
            }}
            style={{
              backgroundColor: bar.color,
              margin: '0 1px',
              opacity: Math.max(0, 1 - (distance / 200)),
            }}
          />
        );
      })}
    </div>
  );
};