import { motion } from "framer-motion";
import { Map, Check, Lock, ChevronRight, Sparkles, Zap, AlertTriangle } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const milestones = [
  { title: "Arrays & Hashing", tasks: 8, completed: 8, status: "done" },
  { title: "Two Pointers", tasks: 6, completed: 6, status: "done" },
  { title: "Sliding Window", tasks: 6, completed: 4, status: "active" },
  { title: "Stack & Queue", tasks: 7, completed: 0, status: "locked" },
  { title: "Binary Search", tasks: 8, completed: 0, status: "locked" },
  { title: "Linked Lists", tasks: 7, completed: 0, status: "locked" },
  { title: "Trees", tasks: 10, completed: 0, status: "locked" },
  { title: "Dynamic Programming", tasks: 12, completed: 0, status: "locked" },
];

const Roadmap = () => {
  const totalTasks = milestones.reduce((a, m) => a + m.tasks, 0);
  const completedTasks = milestones.reduce((a, m) => a + m.completed, 0);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-1">Goal Roadmap</h1>
          <p className="text-sm text-muted-foreground">DSA Mastery → SWE Job Ready</p>
        </div>

        {/* Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 mb-6 border border-primary/30 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">You're ahead of schedule 🚀</p>
            <p className="text-xs text-muted-foreground">Keep this pace and you'll finish 2 weeks early</p>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="glass rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-sm font-mono text-accent">{progress}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{completedTasks} of {totalTasks} tasks complete</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={`relative pl-14 ${m.status === "locked" ? "opacity-50" : ""}`}>
                <div className={`absolute left-4 w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                  m.status === "done" ? "bg-accent" : m.status === "active" ? "bg-primary animate-glow-pulse" : "bg-muted"
                }`}>
                  {m.status === "done" ? <Check className="w-3 h-3 text-background" /> :
                   m.status === "locked" ? <Lock className="w-3 h-3 text-muted-foreground" /> :
                   <Zap className="w-3 h-3 text-primary-foreground" />}
                </div>
                <motion.div whileHover={m.status !== "locked" ? { x: 4 } : {}} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-sm">{m.title}</h3>
                    <span className="text-xs text-muted-foreground">{m.completed}/{m.tasks}</span>
                  </div>
                  {m.status !== "locked" && (
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(m.completed / m.tasks) * 100}%` }} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
