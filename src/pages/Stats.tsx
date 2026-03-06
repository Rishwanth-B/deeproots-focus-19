import { motion } from "framer-motion";
import { BarChart3, Flame, Calendar, TrendingUp, Clock, Brain, Download } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AppHeader from "@/components/AppHeader";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const dailyData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, hours: Math.random() * 5 + 1 }));
const subjectData = [
  { name: "DSA", hours: 24, color: "#2D6A4F" },
  { name: "Web Dev", hours: 18, color: "#40916C" },
  { name: "System Design", hours: 12, color: "#95D5B2" },
  { name: "AI/ML", hours: 8, color: "#D8F3DC" },
];
const heatmapData: number[][] = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)));

const sessions = [
  { date: "Mar 5", room: "DSA Grinders", duration: "45 min", tasks: "3/4", score: 842, status: "Completed" },
  { date: "Mar 4", room: "React Builders", duration: "25 min", tasks: "2/2", score: 920, status: "Completed" },
  { date: "Mar 3", room: "Solo Session", duration: "50 min", tasks: "4/5", score: 780, status: "Completed" },
  { date: "Mar 2", room: "NEET Bio", duration: "30 min", tasks: "1/3", score: 450, status: "Left Early" },
];

const Stats = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        <h1 className="text-3xl font-heading font-bold mb-8">Your Stats</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Focus Score", value: "842", icon: BarChart3, trend: "+12%" },
            { label: "Current Streak", value: "7 days", icon: Flame, trend: "🔥" },
            { label: "Total Hours", value: "156h", icon: Clock, trend: "+23h this month" },
            { label: "Sessions", value: "89", icon: Brain, trend: "3 this week" },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="w-5 h-5 text-accent" />
                <span className="text-xs text-success font-medium">{s.trend}</span>
              </div>
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5 mb-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-accent" /> Contribution Heatmap</h3>
          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <motion.div key={di} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + (wi * 7 + di) * 0.002 }}
                    className="w-3 h-3 rounded-sm" title={`${val} hours`}
                    style={{ backgroundColor: val === 0 ? "hsl(var(--muted))" : `hsl(153 42% ${20 + val * 12}%)` }} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Line Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-5">
            <h3 className="font-heading font-semibold mb-4">Daily Focus Hours</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A8B2C1" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#A8B2C1" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0F2137", border: "1px solid #1a3a5c", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="hours" stroke="#2D6A4F" fill="url(#focusGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-5">
            <h3 className="font-heading font-semibold mb-4">Subject Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={subjectData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="hours" paddingAngle={4}>
                  {subjectData.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F2137", border: "1px solid #1a3a5c", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {subjectData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Session History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Session History</h3>
            <motion.button whileHover={{ scale: 1.05 }} className="glass rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <Download className="w-3 h-3" /> Export
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-2">Date</th><th className="pb-2">Room</th><th className="pb-2">Duration</th>
                  <th className="pb-2">Tasks</th><th className="pb-2">Score</th><th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                    <td className="py-3">{s.date}</td><td>{s.room}</td><td>{s.duration}</td>
                    <td>{s.tasks}</td>
                    <td className="font-mono text-accent">{s.score}</td>
                    <td><span className={`text-xs px-2 py-0.5 rounded-full ${s.status === "Completed" ? "bg-primary/20 text-accent" : "bg-warning/20 text-warning"}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Stats;
