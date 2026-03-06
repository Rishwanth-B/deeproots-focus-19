import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = ["#2D6A4F", "#40916C", "#95D5B2", "#D8F3DC"];
    return {
      x: Math.random() * width,
      y: height + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 1.5 + 0.5),
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.current.push(createParticle(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (1 - lifeRatio);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife || p.y < -10) {
          particles.current[i] = createParticle(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
