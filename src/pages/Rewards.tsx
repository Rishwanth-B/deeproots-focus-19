import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Lock, Gift, ShoppingBag, Coins } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const tiers = [
  { name: "Bronze", levels: 5, color: "from-amber-700 to-amber-500", unlocked: true, current: false },
  { name: "Silver", levels: 5, color: "from-gray-400 to-gray-300", unlocked: true, current: true, currentLevel: 2 },
  { name: "Gold", levels: 5, color: "from-yellow-500 to-yellow-300", unlocked: false, current: false },
  { name: "Platinum", levels: 5, color: "from-cyan-400 to-cyan-200", unlocked: false, current: false },
  { name: "Diamond", levels: 5, color: "from-blue-400 to-purple-400", unlocked: false, current: false },
  { name: "Heroic", levels: 3, color: "from-red-500 to-orange-400", unlocked: false, current: false },
  { name: "Grandmaster", levels: 3, color: "from-purple-600 to-pink-500", unlocked: false, current: false },
  { name: "Challenger", levels: 1, color: "from-yellow-400 to-red-500", unlocked: false, current: false },
  { name: "DeepRoot Legend", levels: 1, color: "from-emerald-400 to-yellow-400", unlocked: false, current: false },
];

const badges = [
  { name: "7 Day Streak", emoji: "🔥", unlocked: true },
  { name: "30 Day Streak", emoji: "💎", unlocked: false },
  { name: "100 Sessions", emoji: "🏆", unlocked: false },
  { name: "DSA Master", emoji: "🧠", unlocked: false },
  { name: "Room Host Pro", emoji: "🏠", unlocked: true },
  { name: "Night Owl", emoji: "🦉", unlocked: true },
  { name: "Speed Demon", emoji: "⚡", unlocked: false },
  { name: "Team Player", emoji: "🤝", unlocked: true },
  { name: "Exam Season", emoji: "📚", unlocked: false },
];

const redeemItems = [
  { name: "DeepRoots T-Shirt", cost: 5000, emoji: "👕", desc: "Premium tee with DeepRoots logo" },
  { name: "Sticker Pack", cost: 1000, emoji: "🏷️", desc: "Set of 5 holographic stickers" },
  { name: "DeepRoots Hoodie", cost: 10000, emoji: "🧥", desc: "Cozy hoodie for late night coding" },
  { name: "Enamel Pin", cost: 2000, emoji: "📌", desc: "Limited edition collector pin" },
];

const Rewards = () => {
  const [tab, setTab] = useState<"levels" | "badges" | "redeem">("levels");
  const coins = 3240;

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="container px-4 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold">Rewards</h1>
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
            <Coins className="w-4 h-4 text-warning" />
            <span className="font-mono font-bold text-warning">{coins.toLocaleString()}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["levels", "badges", "redeem"] as const).map((t) => (
            <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize ${tab === t ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
              {t === "redeem" ? "🛒 Redeem Store" : t === "badges" ? "🏅 Badges" : "⭐ Levels"}
            </motion.button>
          ))}
        </div>

        {tab === "levels" && (
          <div className="space-y-3">
            {/* XP Bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Silver II → Silver III</p>
                <p className="text-xs text-muted-foreground">1,240 XP to next level</p>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-300" />
              </div>
            </motion.div>
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`glass rounded-xl p-4 flex items-center gap-4 ${tier.current ? "border border-primary/50 glow-primary" : ""} ${!tier.unlocked ? "opacity-40" : ""}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                  {tier.unlocked ? <Star className="w-6 h-6 text-background" /> : <Lock className="w-5 h-5 text-background/60" />}
                </div>
                <div className="flex-1">
                  <p className="font-heading font-semibold">{tier.name} {tier.current ? `(Level ${tier.currentLevel})` : ""}</p>
                  <p className="text-xs text-muted-foreground">{tier.levels} levels • {tier.unlocked ? "Unlocked" : "Locked"}</p>
                </div>
                {tier.current && <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">Current</span>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === "badges" && (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {badges.map((badge, i) => (
              <motion.div key={badge.name} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={badge.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                className={`glass rounded-2xl p-4 text-center ${!badge.unlocked ? "opacity-30 grayscale" : ""}`}>
                <span className="text-4xl block mb-2">{badge.unlocked ? badge.emoji : "🔒"}</span>
                <p className="text-xs font-medium">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "redeem" && (
          <div className="grid md:grid-cols-2 gap-4">
            {redeemItems.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
                <span className="text-5xl block mb-3">{item.emoji}</span>
                <h3 className="font-heading font-semibold mb-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-warning font-mono font-bold text-sm">
                    <Coins className="w-4 h-4" /> {item.cost.toLocaleString()}
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold ${coins >= item.cost ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : "glass text-muted-foreground"}`}>
                    {coins >= item.cost ? "Redeem" : "Need more coins"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Rewards;
