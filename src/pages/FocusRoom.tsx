import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Sparkles, Upload, Clock } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const feedItems = [
  { user: "RootMaster42", action: "joined the room 🌱", time: "just now" },
  { user: "FocusQueen", action: "set their tasks for this session", time: "1 min ago" },
  { user: "CodeSprinter", action: "completed: Two Sum ✅ 🎉", time: "3 min ago" },
  { user: "DataWiz", action: "is struggling — send encouragement? 💪", time: "5 min ago" },
];

const participants = [
  { name: "RootMaster42", status: "green", task: "Binary Search", score: 85 },
  { name: "FocusQueen", status: "green", task: "Two Sum", score: 92 },
  { name: "CodeSprinter", status: "yellow", task: "Merge Sort", score: 67 },
  { name: "DataWiz", status: "red", task: "Graph BFS", score: 34 },
  { name: "You", status: "green", task: "Array Rotation", score: 78 },
];

const statusColors: Record<string, string> = { green: "bg-success", yellow: "bg-warning", red: "bg-destructive" };

const FocusRoom = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Solve Two Sum (LeetCode #1)", done: false },
    { id: 2, text: "Solve Valid Parentheses (#20)", done: false },
    { id: 3, text: "Review Binary Search concepts", done: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showProof, setShowProof] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [phase, setPhase] = useState<"focus" | "break">("focus");

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = phase === "focus" ? (1500 - timeLeft) / 1500 : (300 - timeLeft) / 300;

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task && !task.done) {
      setShowProof(id);
    }
  };

  const completeProof = () => {
    if (showProof) {
      setTasks(tasks.map((t) => (t.id === showProof ? { ...t, done: true } : t)));
      setShowProof(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-16 h-screen flex">
        {/* Left Panel - Participants */}
        <div className="hidden lg:block w-64 border-r border-border p-4 overflow-y-auto">
          <h3 className="font-heading font-semibold text-sm mb-4 text-muted-foreground">PARTICIPANTS ({participants.length})</h3>
          <div className="space-y-3">
            {participants.map((p) => (
              <motion.div key={p.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="glass rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusColors[p.status]}`} />
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-4.5">{p.task}</p>
                <div className="mt-1.5 ml-4.5">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
          {/* Timer */}
          <div className="relative mb-8">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <motion.circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
                strokeDasharray={565} strokeDashoffset={565 * (1 - progress)} strokeLinecap="round"
                animate={{ strokeDashoffset: 565 * (1 - progress) }} transition={{ duration: 0.5 }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-accent font-medium mb-1">{phase === "focus" ? "🎯 Focus Time" : "☕ Break Time"}</p>
              <p className="text-4xl font-mono font-bold">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
            </div>
          </div>

          {/* Room Score */}
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="glass rounded-full px-6 py-2 mb-8 text-center">
            <p className="text-xs text-muted-foreground">Room Score</p>
            <p className="text-2xl font-heading font-bold text-accent">1,247</p>
          </motion.div>

          {/* To-do list */}
          <div className="w-full max-w-md">
            <h3 className="font-heading font-semibold mb-3">My Tasks</h3>
            <div className="space-y-2 mb-3">
              {tasks.map((task) => (
                <motion.div key={task.id} layout whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 glass rounded-xl p-3 cursor-pointer ${task.done ? "opacity-50" : ""}`}
                  onClick={() => toggleTask(task.id)}>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.done ? "bg-accent border-accent" : "border-border"}`}>
                    {task.done && <Check className="w-3 h-3 text-background" />}
                  </div>
                  <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a task..."
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <motion.button whileTap={{ scale: 0.9 }} onClick={addTask} className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Panel - Feed */}
        <div className="hidden lg:block w-72 border-l border-border p-4 overflow-y-auto">
          <h3 className="font-heading font-semibold text-sm mb-4 text-muted-foreground">COMMUNITY FEED</h3>
          <div className="space-y-3">
            {feedItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                className="glass rounded-xl p-3">
                <p className="text-sm"><span className="font-medium text-accent">{item.user}</span> {item.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                <div className="flex gap-1 mt-2">
                  {["👏", "🔥", "💪", "❤️"].map((e) => (
                    <motion.button key={e} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}
                      className="text-sm hover:bg-surface-hover rounded-md px-1.5 py-0.5">{e}</motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Proof Modal */}
      <AnimatePresence>
        {showProof !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-lg flex items-center justify-center p-4" onClick={() => setShowProof(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-sm glass-strong rounded-3xl p-6">
              <h2 className="text-lg font-heading font-bold mb-1">Prove it! 🏆</h2>
              <p className="text-sm text-muted-foreground mb-4">{tasks.find((t) => t.id === showProof)?.text}</p>
              <div className="glass rounded-xl p-8 text-center mb-4 cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload screenshot</p>
                <p className="text-xs text-muted-foreground mt-1">Show your accepted submission</p>
              </div>
              <div className="flex gap-2">
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowProof(null)}
                  className="flex-1 py-2.5 rounded-xl glass text-sm font-medium">Skip</motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={completeProof}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold">Submit ✅</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FocusRoom;
