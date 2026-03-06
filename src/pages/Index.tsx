import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { TreePine, Users, Target, Zap, Trophy, Star, ChevronRight, Sparkles, Brain, Clock, Shield } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedTree from "@/components/AnimatedTree";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  { icon: Users, title: "Study Rooms", desc: "Join live rooms with real students. Stay accountable together." },
  { icon: Target, title: "Focus Timer", desc: "Synced Pomodoro sessions that keep everyone on track." },
  { icon: Brain, title: "AI Task Engine", desc: "AI suggests tasks based on your goals and skill level." },
  { icon: Trophy, title: "Gamified Progress", desc: "Earn XP, grow trees, unlock badges, and level up." },
  { icon: Shield, title: "Proof System", desc: "Submit proof of work. Verified completions earn bonus points." },
  { icon: Sparkles, title: "Focus Forest", desc: "Watch your personal forest grow with every session." },
];

const steps = [
  { num: "01", title: "Set Your Goal", desc: "Choose your study goal and let AI build your roadmap." },
  { num: "02", title: "Join a Room", desc: "Enter a virtual study room with peers worldwide." },
  { num: "03", title: "Grow Your Forest", desc: "Complete sessions, earn XP, and watch your forest bloom." },
];

const testimonials = [
  { name: "Priya S.", role: "IIT Aspirant", text: "DeepRoots changed how I study. The accountability from live rooms is unmatched.", avatar: "PS" },
  { name: "Alex K.", role: "CS Student", text: "The gamification keeps me coming back. I've maintained a 45-day streak!", avatar: "AK" },
  { name: "Maya R.", role: "NEET Prep", text: "Focus Forest is addicting. I don't want to kill my trees by getting distracted.", avatar: "MR" },
];

const Index = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const treeScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 w-full z-50 glass-strong"
      >
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <TreePine className="w-7 h-7 text-accent" />
            <span className="text-xl font-heading font-bold text-gradient">DeepRoots</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 text-sm font-bold rounded-full bg-primary text-primary-foreground glow-primary">
                Get Started Free
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section style={{ opacity: heroOpacity }} className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mb-6">
            <TreePine className="w-16 h-16 text-accent mx-auto neon-glow" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Study Together.<br />
            <span className="text-gradient">Focus Deeper.</span><br />
            Grow Further.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The gamified study platform where students grow forests, earn XP, and crush goals together in live virtual rooms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-full glass text-foreground font-medium hover:bg-surface-hover transition-colors">
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold glow-primary animate-glow-pulse">
                Get Started Free <ChevronRight className="inline w-4 h-4 ml-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <motion.div style={{ scale: treeScale }} className="mt-12">
          <AnimatedTree />
        </motion.div>
      </motion.section>

      {/* What is DeepRoots */}
      <section className="relative z-10 py-24 px-4">
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-accent font-medium mb-2">What is DeepRoots?</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-bold mb-4">Your Study, <span className="text-gradient">Gamified</span></motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">A platform that turns studying into an adventure. Compete, collaborate, and grow — literally.</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="glass rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-24 px-4">
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-accent font-medium mb-2">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-bold">Three Steps to <span className="text-gradient">Mastery</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative text-center">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="text-6xl font-heading font-bold text-primary/20 mb-4">{s.num}</motion.div>
                <h3 className="text-xl font-heading font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="relative z-10 py-24 px-4">
        <div className="container max-w-2xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-accent font-medium mb-2">Leaderboard</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-heading font-bold">Top <span className="text-gradient">Growers</span> This Week</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
            {[
              { rank: 1, name: "RootMaster42", xp: 2840, level: "Gold III" },
              { rank: 2, name: "FocusQueen", xp: 2650, level: "Gold II" },
              { rank: 3, name: "CodeSprinter", xp: 2410, level: "Gold I" },
            ].map((u) => (
              <motion.div key={u.rank} variants={fadeUp} whileHover={{ x: 8 }} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-heading ${u.rank === 1 ? "bg-warning/20 text-warning" : u.rank === 2 ? "bg-muted text-muted-foreground" : "bg-warning/10 text-warning/70"}`}>
                  #{u.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.level}</p>
                </div>
                <div className="flex items-center gap-1 text-accent font-mono text-sm font-bold">
                  <Star className="w-4 h-4" /> {u.xp} XP
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-4">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-accent font-medium mb-2">Loved by Students</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-heading font-bold">What They <span className="text-gradient">Say</span></motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -5 }} className="glass rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-background">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-4">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Ready to <span className="text-gradient">Grow</span>?</h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">Join thousands of students growing their focus forests. Your journey starts with one session.</p>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-lg glow-accent animate-glow-pulse">
                Start Growing Free <Sparkles className="inline w-5 h-5 ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 DeepRoots. Study together, grow forever. 🌱</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
