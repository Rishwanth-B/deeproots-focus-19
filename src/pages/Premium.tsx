import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Users, Music, Check, Sparkles } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    features: ["3 rooms/day", "Basic stats", "5 tree species", "Standard timer"],
    current: true,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    features: ["Unlimited rooms", "Full analytics", "All tree species", "AI task suggestions", "Priority support", "Custom room themes"],
    popular: true,
  },
  {
    name: "Squad",
    price: "₹499",
    period: "/month",
    features: ["Everything in Pro", "Add up to 5 friends", "Squad leaderboards", "Group challenges", "Exclusive badges", "Squad analytics"],
  },
];

const lofiPacks = [
  { name: "Forest Ambience", price: 49, emoji: "🌲", tracks: 12 },
  { name: "Midnight Coding", price: 49, emoji: "🌙", tracks: 10 },
  { name: "Rainy Day Study", price: 49, emoji: "🌧️", tracks: 8 },
  { name: "Coffee Shop Vibes", price: 49, emoji: "☕", tracks: 15 },
  { name: "Deep Focus Beats", price: 79, emoji: "🎧", tracks: 20 },
  { name: "All Access Bundle", price: 199, emoji: "🎵", tracks: 65 },
];

const Premium = () => {
  const [tab, setTab] = useState<"plans" | "lofi">("plans");

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        <div className="text-center mb-8">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Crown className="w-12 h-12 text-warning mx-auto mb-3" />
          </motion.div>
          <h1 className="text-3xl font-heading font-bold mb-2">Premium</h1>
          <p className="text-muted-foreground">Unlock the full DeepRoots experience</p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setTab("plans")}
            className={`px-5 py-2 rounded-full text-sm font-medium ${tab === "plans" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
            <Crown className="w-4 h-4 inline mr-1" /> Plans
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setTab("lofi")}
            className={`px-5 py-2 rounded-full text-sm font-medium ${tab === "lofi" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
            <Music className="w-4 h-4 inline mr-1" /> Lofi Shop
          </motion.button>
        </div>

        {tab === "plans" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className={`glass rounded-3xl p-6 relative ${plan.popular ? "border-2 border-primary glow-primary" : ""}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-heading font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold ${
                    plan.current ? "glass text-muted-foreground" :
                    plan.popular ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-primary" :
                    "glass text-foreground hover:bg-surface-hover"
                  }`}>
                  {plan.current ? "Current Plan" : "Upgrade"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "lofi" && (
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {lofiPacks.map((pack, i) => (
              <motion.div key={pack.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }} className="glass rounded-2xl p-5 text-center">
                <span className="text-5xl block mb-3">{pack.emoji}</span>
                <h3 className="font-heading font-semibold mb-1">{pack.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{pack.tracks} tracks</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold">
                  ₹{pack.price}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Premium;
