import { motion } from "framer-motion";
import { ArrowRight, Wifi, Radio, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkCardProps {
  network: "mtn" | "airtel" | "glo" | "offers";
  title: string;
  description: string;
  onClick: () => void;
  index?: number;
}

const networkConfig = {
  mtn: {
    gradient: "from-yellow-400 to-yellow-600",
    glow: "group-hover:shadow-[0_0_60px_rgba(250,204,21,0.3)]",
    icon: Wifi,
    bgPattern: "from-yellow-500/10 to-yellow-600/5",
    borderGlow: "group-hover:border-yellow-400/50",
  },
  airtel: {
    gradient: "from-red-500 to-red-700",
    glow: "group-hover:shadow-[0_0_60px_rgba(239,68,68,0.3)]",
    icon: Radio,
    bgPattern: "from-red-500/10 to-red-600/5",
    borderGlow: "group-hover:border-red-400/50",
  },
  glo: {
    gradient: "from-green-500 to-green-700",
    glow: "group-hover:shadow-[0_0_60px_rgba(34,197,94,0.3)]",
    icon: Signal,
    bgPattern: "from-green-500/10 to-green-600/5",
    borderGlow: "group-hover:border-green-400/50",
  },
  offers: {
    gradient: "from-primary to-accent",
    glow: "group-hover:shadow-[0_0_60px_rgba(34,197,94,0.25)]",
    icon: Wifi,
    bgPattern: "from-primary/10 to-accent/5",
    borderGlow: "group-hover:border-primary/50",
  },
};

export function NetworkCard({ network, title, description, onClick, index = 0 }: NetworkCardProps) {
  const config = networkConfig[network];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer",
        "rounded-3xl overflow-visible",
        "bg-card/80 dark:bg-card/60",
        "backdrop-blur-xl",
        "border border-card-border/50 dark:border-white/10",
        config.borderGlow,
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        config.glow,
        "transition-all duration-500"
      )}
      data-testid={`card-network-${network}`}
    >
      {/* Background pattern */}
      <div className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-50",
        config.bgPattern
      )} />
      
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={cn(
          "absolute inset-[-1px] rounded-3xl bg-gradient-to-br",
          config.gradient,
          "opacity-30"
        )} />
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          {/* Icon container */}
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            "bg-gradient-to-br",
            config.gradient,
            "shadow-lg"
          )}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Arrow */}
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              "bg-muted/50"
            )}>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
