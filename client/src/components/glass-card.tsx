import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "primary" | "mtn" | "airtel" | "glo" | "accent" | null;
  onClick?: () => void;
}

const glowColors = {
  primary: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]",
  mtn: "group-hover:shadow-[0_0_40px_rgba(255,204,0,0.25)]",
  airtel: "group-hover:shadow-[0_0_40px_rgba(237,28,36,0.2)]",
  glo: "group-hover:shadow-[0_0_40px_rgba(0,168,89,0.25)]",
  accent: "group-hover:shadow-[0_0_40px_rgba(14,165,233,0.2)]",
};

export function GlassCard({ children, className, hover = true, glow = "primary", onClick }: GlassCardProps) {
  const Component = hover ? motion.div : "div";
  const motionProps = hover
    ? {
        whileHover: { y: -8, scale: 1.01 },
        whileTap: { scale: 0.99 },
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }
    : {};

  return (
    <Component
      {...motionProps}
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl overflow-visible",
        "bg-card/80 dark:bg-card/60",
        "backdrop-blur-xl",
        "border border-card-border/50 dark:border-white/10",
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        "transition-shadow duration-500",
        hover && "cursor-pointer",
        glow && glowColors[glow],
        className
      )}
    >
      {/* Subtle gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      </div>
      
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

export function GlassPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "bg-card/70 dark:bg-card/50",
        "backdrop-blur-xl",
        "border border-card-border/50 dark:border-white/10",
        "shadow-xl shadow-black/5 dark:shadow-black/30",
        className
      )}
    >
      {children}
    </div>
  );
}
