import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Flame, BarChart3, Map, User, DoorOpen, Trophy, Crown } from "lucide-react";

import { TreePine, Flame, BarChart3, Map, User, DoorOpen, Trophy, Crown } from "lucide-react";

const navItems = [
  { to: "/rooms", icon: DoorOpen, label: "Rooms" },
  { to: "/stats", icon: BarChart3, label: "Stats" },
  { to: "/forest", icon: TreePine, label: "Forest" },
  { to: "/roadmap", icon: Map, label: "Roadmap" },
  { to: "/rewards", icon: Trophy, label: "Rewards" },
  { to: "/premium", icon: Crown, label: "Premium" },
];

const AppHeader = () => {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring" }}>
            <TreePine className="w-7 h-7 text-accent" />
          </motion.div>
          <span className="text-xl font-heading font-bold text-gradient">DeepRoots</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-sm"
          >
            <Flame className="w-4 h-4 text-warning" />
            <span className="font-mono font-bold text-warning">7</span>
          </motion.div>
          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <User className="w-5 h-5 text-background" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
