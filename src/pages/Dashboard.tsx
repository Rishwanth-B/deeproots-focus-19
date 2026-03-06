import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DoorOpen, Lightbulb, X, TreePine, Target, Users, Flame, ChevronRight, Activity, Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const quotes = [
  "Every LeetCode problem you solve is one step closer to your dream offer.",
  "Small consistent effort beats large sporadic effort. Always.",
  "The forest grows one tree at a time. Keep planting.",
  "Your future self will thank you for this session.",
  "Focus is a muscle. Train it daily.",
];

const flashcards = [
  { title: "Last Session", value: "47 min focused", sub: "3 tasks completed", emoji: "📊" },
  { title: "Milestone Progress", value: "67% to DSA Goal", sub: "Arrays & Strings mastered", emoji: "🎯" },
  { title: "Personal Best", value: "14 day streak", sub: "Your longest run yet!", emoji: "🔥" },
  { title: "Focus Score", value: "842 / 1000", sub: "Top 15% this week", emoji: "⭐" },
];

const activeRooms = [
  { name: "DSA Grinders", participants: 12, status: "LIVE", subject: "DSA" },
  { name: "Web Dev Sprint", participants: 8, status: "LIVE", subject: "Web Dev" },
  { name: "NEET Biology Bash", participants: 15, status: "Break", subject: "NEET" },
];

const recentActivity = [
  { user: "FocusQueen", action: "completed Two Sum ✅", time: "2 min ago" },
  { user: "RootMaster42", action: "started a 45-min session", time: "5 min ago" },
  { user: "CodeSprinter", action: "earned Gold III badge 🏆", time: "12 min ago" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmap = [3, 5, 2, 4, 6, 1, 4];

const Dashboard = () => {
  const [showMotivation, setShowMotivation] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const nextCard = () => {
    setCardIdx((i) => (i + 1) % flashcards.length);
    setQuoteIdx((i) => (i + 1) % quotes.length);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-1">
            Welcome back, <span className="text-gradient">Student</span> 🌱
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-accent">Silver II</span>
            1,240 XP to Gold I
          </p>
        </motion.div>

        {/* Prompt Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link to="/rooms">
            <motion.div whileHover={{ scale: 1.02, y: -4 }} className="glass rounded-2xl p-6 cursor-pointer group border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <DoorOpen className="w-8 h-8 text-accent" />
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">Ready for another productive session?</h3>
              <p className="text-sm text-muted-foreground">Today's milestone: Complete 3 Array problems</p>
            </motion.div>
          </Link>
          <motion.div whileHover={{ scale: 1.02, y: -4 }} onClick={() => setShowMotivation(true)}
            className="glass rounded-2xl p-6 cursor-pointer group border border-warning/20 hover:border-warning/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <Lightbulb className="w-8 h-8 text-warning" />
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <span className="text-2xl">✨</span>
              </motion.div>
            </div>
            <h3 className="font-heading font-semibold text-lg mb-1">Need motivation? Click here 💡</h3>
            <p className="text-sm text-muted-foreground">See your achievements and get inspired</p>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Goal Snapshot */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold">Today's Goal</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Complete Arrays milestone</p>
            <div className="w-full bg-muted rounded-full h-2.5 mb-1">
              <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <p className="text-xs text-muted-foreground">67% complete</p>
          </motion.div>

          {/* Active Rooms */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold">Active Rooms</h3>
            </div>
            <div className="space-y-2">
              {activeRooms.map((r) => (
                <Link to="/rooms" key={r.name}>
                  <div className="flex items-center justify-between py-1.5 hover:bg-surface-hover rounded-lg px-2 -mx-2 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.participants} studying</p>
                    </div>
                    {r.status === "LIVE" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-bold animate-pulse">🔴 LIVE</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Mini Forest */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold">Your Forest</h3>
            </div>
            <div className="flex justify-center gap-1 my-4">
              {["🌲", "🌳", "🌿", "🌲", "🍁", "🌸", "🌲"].map((t, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="text-2xl">{t}</motion.span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">42 trees grown • 156 focus hours</p>
          </motion.div>

          {/* Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold">Squad Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-accent mt-0.5">{a.user[0]}</div>
                  <div>
                    <p className="text-sm"><span className="font-medium">{a.user}</span> {a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Heatmap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-5 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold">This Week</h3>
            </div>
            <div className="flex gap-2 justify-between">
              {weekDays.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1.5 flex-1">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="w-full rounded-lg origin-bottom"
                    style={{
                      height: `${heatmap[i] * 12}px`,
                      background: `linear-gradient(to top, hsl(153 42% ${20 + heatmap[i] * 8}%), hsl(146 50% ${50 + heatmap[i] * 5}%))`,
                      opacity: 0.5 + heatmap[i] * 0.1,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>Total: 25 hours</span>
              <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-warning" /> 7 day streak</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Motivation Modal */}
      <AnimatePresence>
        {showMotivation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setShowMotivation(false)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold">Your Journey 🐵</h2>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowMotivation(false)} className="glass rounded-full p-2">
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Monkey + Flashcard */}
              <div className="relative mb-6">
                <div className="text-center mb-4">
                  <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-6xl inline-block">🐒</motion.span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={cardIdx} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="glass-strong rounded-2xl p-6 text-center cursor-pointer" onClick={nextCard}>
                    <span className="text-4xl mb-3 block">{flashcards[cardIdx].emoji}</span>
                    <p className="text-xs text-accent font-medium mb-1">{flashcards[cardIdx].title}</p>
                    <p className="text-2xl font-heading font-bold mb-1">{flashcards[cardIdx].value}</p>
                    <p className="text-sm text-muted-foreground">{flashcards[cardIdx].sub}</p>
                    <p className="text-xs text-muted-foreground mt-3">Tap to see next →</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quote */}
              <AnimatePresence mode="wait">
                <motion.p key={quoteIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="text-center text-sm italic text-muted-foreground">
                  "{quotes[quoteIdx]}"
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
