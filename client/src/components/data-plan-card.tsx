import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "./gradient-button";
import type { DataPlan } from "@shared/schema";

interface DataPlanCardProps {
  plan: DataPlan;
  onClick: () => void;
  index?: number;
}

const networkVariants = {
  mtn: {
    variant: "mtn" as const,
    iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    accent: "text-yellow-500",
  },
  airtel: {
    variant: "airtel" as const,
    iconBg: "bg-gradient-to-br from-red-500 to-red-700",
    accent: "text-red-500",
  },
  glo: {
    variant: "glo" as const,
    iconBg: "bg-gradient-to-br from-green-500 to-green-700",
    accent: "text-green-500",
  },
};

export function DataPlanCard({ plan, onClick, index = 0 }: DataPlanCardProps) {
  const config = networkVariants[plan.network];
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(plan.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "group relative",
        "rounded-2xl overflow-visible",
        "bg-card/80 dark:bg-card/60",
        "backdrop-blur-xl",
        "border border-card-border/50 dark:border-white/10",
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
        "transition-all duration-300"
      )}
      data-testid={`card-plan-${plan.id}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            config.iconBg,
            "shadow-lg"
          )}>
            <Wifi className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{plan.dataAmount}</h3>
            <p className="text-sm text-muted-foreground">{plan.duration}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className={cn("text-3xl font-bold", config.accent)}>
            {formattedPrice}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {plan.network.toUpperCase()} Data Bundle
          </p>
        </div>

        {/* Buy Button */}
        <GradientButton
          onClick={onClick}
          variant={config.variant}
          className="w-full"
          data-testid={`button-buy-${plan.id}`}
        >
          Buy Now
        </GradientButton>
      </div>
    </motion.div>
  );
}
