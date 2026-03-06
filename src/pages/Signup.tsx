import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TreePine, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const quizQuestions = [
  { q: "When do you study best?", options: ["Late night 🌙", "Early morning 🌅", "Afternoon ☀️", "Any time ⏰"] },
  { q: "How long can you focus without a break?", options: ["15 min", "25 min", "45 min", "60+ min"] },
  { q: "What motivates you most?", options: ["Competition 🏆", "Growth 🌱", "Deadlines ⏳", "Rewards 🎁"] },
  { q: "Preferred study style?", options: ["Solo deep work", "Small group", "Large community", "Flexible mix"] },
  { q: "How do you handle distractions?", options: ["Block everything", "Use timers", "Music helps", "Need accountability"] },
];

const personalities = [
  { name: "Night Owl 🦉", desc: "You thrive in the quiet of night. Deep focus is your superpower.", color: "from-indigo-500 to-purple-600" },
  { name: "Sprint Focused ⚡", desc: "Short intense bursts are your jam. Quality over quantity.", color: "from-warning to-destructive" },
  { name: "Deep Diver 🌊", desc: "You go deep and don't surface until mastery. Impressive stamina.", color: "from-primary to-accent" },
  { name: "Steady Pacer 🐢", desc: "Consistent and reliable. Slow and steady wins the race.", color: "from-secondary to-primary" },
];

const Signup = () => {
  const [step, setStep] = useState<"signup" | "quiz" | "result">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("quiz");
  };

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers, optIdx];
    setAnswers(newAnswers);
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx(quizIdx + 1);
    } else {
      setStep("result");
    }
  };

  const personality = personalities[answers.reduce((a, b) => a + b, 0) % personalities.length];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <ParticleBackground />
      <AnimatePresence mode="wait">
        {step === "signup" && (
          <motion.div key="signup" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8">
            <div className="text-center mb-8">
              <TreePine className="w-12 h-12 text-accent mx-auto mb-3" />
              <h1 className="text-2xl font-heading font-bold">Plant Your First Seed</h1>
              <p className="text-sm text-muted-foreground mt-1">Create your account to start growing</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold glow-primary">
                Create Account
              </motion.button>
            </form>
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">or</span><div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-2.5 rounded-xl glass text-sm font-medium">Google</motion.button>
              <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-2.5 rounded-xl glass text-sm font-medium">Apple</motion.button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account? <Link to="/login" className="text-accent hover:underline font-medium">Login</Link>
            </p>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div key={`quiz-${quizIdx}`} initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8 text-center">
            <p className="text-xs text-accent mb-2 font-medium">Focus DNA Quiz • {quizIdx + 1}/{quizQuestions.length}</p>
            <div className="w-full bg-muted rounded-full h-1.5 mb-6">
              <motion.div animate={{ width: `${((quizIdx + 1) / quizQuestions.length) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <h2 className="text-xl font-heading font-bold mb-6">{quizQuestions[quizIdx].q}</h2>
            <div className="space-y-3">
              {quizQuestions[quizIdx].options.map((opt, i) => (
                <motion.button key={i} whileHover={{ scale: 1.03, x: 5 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(i)}
                  className="w-full py-3 px-4 rounded-xl glass text-left text-sm font-medium hover:border-primary/50 transition-colors">
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8 text-center">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 1, ease: "easeOut" }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${personality.color} mx-auto mb-6 flex items-center justify-center`}>
              <span className="text-4xl">{personality.name.split(" ").pop()}</span>
            </motion.div>
            <h2 className="text-2xl font-heading font-bold mb-2">You're a {personality.name.split(" ")[0]} {personality.name.split(" ")[1]}</h2>
            <p className="text-sm text-muted-foreground mb-8">{personality.desc}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold glow-primary">
              Enter DeepRoots 🌱
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Signup;
