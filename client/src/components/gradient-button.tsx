import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: "primary" | "mtn" | "airtel" | "glo";
  size?: "default" | "lg" | "sm";
  type?: "button" | "submit";
  "data-testid"?: string;
}

const gradients = {
  primary: "from-primary to-accent",
  mtn: "from-yellow-400 to-yellow-600",
  airtel: "from-red-500 to-red-700",
  glo: "from-green-500 to-green-700",
};

const sizes = {
  default: "min-h-11 px-6 text-sm",
  lg: "min-h-12 px-8 text-base",
  sm: "min-h-9 px-4 text-sm",
};

export function GradientButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className,
  variant = "primary",
  size = "default",
  type = "button",
  "data-testid": testId,
}: GradientButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "rounded-xl font-medium text-white",
        "bg-gradient-to-r shadow-lg",
        gradients[variant],
        sizes[size],
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "overflow-hidden",
        className
      )}
      data-testid={testId}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </div>
      
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "blur-xl",
          variant === "primary" && "bg-primary/30",
          variant === "mtn" && "bg-yellow-500/30",
          variant === "airtel" && "bg-red-500/30",
          variant === "glo" && "bg-green-500/30",
        )} 
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>
    </motion.button>
  );
}
