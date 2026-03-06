import { motion } from "framer-motion";
import { TreePine, Sun, Moon, Clock } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const trees = [
  { species: "🌳", subject: "DSA", count: 15, label: "Oak" },
  { species: "🌲", subject: "Math", count: 10, label: "Pine" },
  { species: "🌿", subject: "Literature", count: 5, label: "Willow" },
  { species: "🍁", subject: "Science", count: 8, label: "Maple" },
  { species: "🌸", subject: "Custom", count: 4, label: "Cherry Blossom" },
];

const allTrees = trees.flatMap((t) => Array.from({ length: t.count }, (_, i) => ({ ...t, id: `${t.subject}-${i}` })));

const Forest = () => {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 20;

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">Focus Forest</h1>
            <p className="text-sm text-muted-foreground">Each tree is a completed session</p>
          </div>
          <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
            {isNight ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-warning" />}
            <span className="text-xs text-muted-foreground">{isNight ? "Night" : "Day"}</span>
          </div>
        </div>

        {/* Forest */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`glass rounded-3xl p-8 mb-8 min-h-[300px] relative overflow-hidden ${isNight ? "bg-background/60" : ""}`}>
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/20 to-transparent rounded-b-3xl" />
          {/* Trees */}
          <div className="flex flex-wrap gap-2 justify-center items-end relative z-10">
            {allTrees.map((tree, i) => (
              <motion.div key={tree.id} initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.3, y: -5 }} className="cursor-pointer relative group">
                <span className="text-3xl md:text-4xl block">{tree.species}</span>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass rounded-lg px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {tree.subject}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [-20, -80], x: [0, Math.sin(i) * 30], opacity: [0.6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
              style={{ left: `${10 + i * 12}%`, bottom: "20%" }}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Trees", value: allTrees.length, icon: "🌲" },
            { label: "Focus Hours", value: "156h", icon: "🌿" },
            { label: "Rarest Tree", value: "Cherry Blossom", icon: "🌸" },
            { label: "Forest Health", value: "94%", icon: "💚" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="glass rounded-2xl p-5 text-center">
              <span className="text-3xl mb-2 block">{s.icon}</span>
              <p className="text-xl font-heading font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Subject Forests */}
        <h3 className="font-heading font-semibold mb-4">By Subject</h3>
        <div className="grid md:grid-cols-5 gap-3">
          {trees.map((t) => (
            <motion.div key={t.subject} whileHover={{ y: -4 }} className="glass rounded-2xl p-4 text-center">
              <span className="text-4xl block mb-2">{t.species}</span>
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.subject} • {t.count} trees</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Forest;
