import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Search, Users, Clock, X, Zap, Volume2, VolumeX } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const categories = ["All", "DSA", "Web Dev", "Mobile", "AI & ML", "Data Science", "NEET", "JEE", "UPSC", "CAT"];

const mockRooms = [
  { id: 1, name: "LeetCode Grinders", subject: "DSA", host: "RootMaster42", participants: 12, max: 20, status: "live", vibe: "silent" },
  { id: 2, name: "React Builders", subject: "Web Dev", host: "FocusQueen", participants: 8, max: 15, status: "live", vibe: "hype" },
  { id: 3, name: "NEET Bio Marathon", subject: "NEET", host: "BioNerd", participants: 18, max: 25, status: "break", vibe: "silent" },
  { id: 4, name: "System Design Deep Dive", subject: "DSA", host: "CodeSprinter", participants: 5, max: 10, status: "waiting", vibe: "silent" },
  { id: 5, name: "ML Paper Reading", subject: "AI & ML", host: "DataWiz", participants: 6, max: 12, status: "live", vibe: "hype" },
  { id: 6, name: "JEE Math Blitz", subject: "JEE", host: "MathPro", participants: 20, max: 30, status: "live", vibe: "silent" },
];

const Rooms = () => {
  const [filter, setFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomSubject, setRoomSubject] = useState("DSA");
  const [roomType, setRoomType] = useState("public");
  const [sessionDur, setSessionDur] = useState(25);
  const [breakDur, setBreakDur] = useState(5);
  const [maxPart, setMaxPart] = useState(20);
  const [roomVibe, setRoomVibe] = useState("silent");

  const filtered = filter === "All" ? mockRooms : mockRooms.filter((r) => r.subject === filter);

  const statusColors: Record<string, string> = {
    live: "bg-destructive/20 text-destructive",
    break: "bg-warning/20 text-warning",
    waiting: "bg-muted text-muted-foreground",
  };
  const statusLabels: Record<string, string> = {
    live: "🔴 LIVE",
    break: "☕ Break",
    waiting: "Waiting",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">Virtual Rooms</h1>
            <p className="text-sm text-muted-foreground">{mockRooms.filter((r) => r.status === "live").length} rooms live now</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 items-center">
              <input value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="Room code"
                className="px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-32" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-xl glass text-sm font-medium">Join</motion.button>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreate(true)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold glow-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Room
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((c) => (
            <motion.button key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              {c}
            </motion.button>
          ))}
        </div>

        {/* Room Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((room) => (
              <motion.div key={room.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }} className={`glass rounded-2xl p-5 ${room.status === "live" ? "border border-primary/30" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-semibold">{room.name}</h3>
                    <p className="text-xs text-muted-foreground">by {room.host}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${statusColors[room.status]} ${room.status === "live" ? "animate-pulse" : ""}`}>
                    {statusLabels[room.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-accent text-xs">{room.subject}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {room.participants}/{room.max}</span>
                  <span>{room.vibe === "silent" ? "🔇" : "🔥"}</span>
                </div>
                <Link to="/focus-room">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-2 rounded-xl bg-primary/10 text-accent text-sm font-medium hover:bg-primary/20 transition-colors">
                    Join Room
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-lg flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-md glass-strong rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-heading font-bold">Create Room</h2>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowCreate(false)} className="glass rounded-full p-1.5">
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Room Name</label>
                  <input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="e.g. DSA Grinders"
                    className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                  <select value={roomSubject} onChange={(e) => setRoomSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Room Type</label>
                  <div className="flex gap-2">
                    {["public", "private", "squad"].map((t) => (
                      <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setRoomType(t)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize ${roomType === t ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
                        {t}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Focus (min)</label>
                    <input type="number" value={sessionDur} onChange={(e) => setSessionDur(+e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Break (min)</label>
                    <input type="number" value={breakDur} onChange={(e) => setBreakDur(+e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Max Participants: {maxPart}</label>
                  <input type="range" min={2} max={50} value={maxPart} onChange={(e) => setMaxPart(+e.target.value)} className="w-full accent-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Vibe</label>
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setRoomVibe("silent")}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium ${roomVibe === "silent" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
                      🔇 Silent
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setRoomVibe("hype")}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium ${roomVibe === "hype" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
                      🔥 Hype
                    </motion.button>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowCreate(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold glow-primary mt-2">
                  Create Room 🚀
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rooms;
