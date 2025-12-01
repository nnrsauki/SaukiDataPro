import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Promo } from "@shared/schema";

interface PromoBannerProps {
  promo: Promo;
}

export function PromoBanner({ promo }: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "relative overflow-hidden",
        "rounded-2xl",
        "bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10",
        "border border-primary/20",
        "p-6"
      )}
      data-testid="promo-banner"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
          <p className="text-muted-foreground text-sm">{promo.description}</p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          data-testid="button-dismiss-promo"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}
