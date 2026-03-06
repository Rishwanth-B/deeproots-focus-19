import { motion } from "framer-motion";

const AnimatedTree = () => {
  return (
    <div className="relative w-64 h-80 mx-auto">
      {/* Trunk */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-32 rounded-t-lg origin-bottom"
        style={{ background: "linear-gradient(to top, #5C3D2E, #8B6F47)" }}
      />
      {/* Canopy layers */}
      {[
        { bottom: "7rem", size: "w-40 h-40", delay: 0.8, color: "from-primary to-secondary" },
        { bottom: "10rem", size: "w-32 h-32", delay: 1.2, color: "from-secondary to-primary" },
        { bottom: "12.5rem", size: "w-20 h-20", delay: 1.6, color: "from-accent/60 to-primary" },
      ].map((layer, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: layer.delay, ease: "backOut" }}
          className={`absolute left-1/2 -translate-x-1/2 ${layer.size} rounded-full bg-gradient-to-t ${layer.color}`}
          style={{ bottom: layer.bottom, filter: "blur(1px)" }}
        />
      ))}
      {/* Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(146 50% 71% / 0.15), transparent)" }}
      />
      {/* Floating leaves */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`leaf-${i}`}
          initial={{ y: -20, x: (i - 1.5) * 30, opacity: 0 }}
          animate={{
            y: [0, 80, 160],
            x: [(i - 1.5) * 30, (i - 1.5) * 30 + Math.sin(i) * 20, (i - 1.5) * 30],
            opacity: [0.8, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
          className="absolute top-16 left-1/2 w-2 h-2 rounded-full bg-accent/60"
        />
      ))}
    </div>
  );
};

export default AnimatedTree;
