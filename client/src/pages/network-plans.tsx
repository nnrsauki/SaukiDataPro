import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Wifi, Radio, Signal, AlertCircle } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { DataPlanCard } from "@/components/data-plan-card";
import { CardSkeleton } from "@/components/skeleton-loader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { useDataPlansByNetwork, useCurrentOrder } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

const networkConfig = {
  mtn: {
    name: "MTN",
    icon: Wifi,
    gradient: "from-yellow-400 to-yellow-600",
    description: "Nigeria's largest network with the widest coverage.",
  },
  airtel: {
    name: "Airtel",
    icon: Radio,
    gradient: "from-red-500 to-red-700",
    description: "Fast and reliable network with competitive prices.",
  },
  glo: {
    name: "Glo",
    icon: Signal,
    gradient: "from-green-500 to-green-700",
    description: "Proudly Nigerian network with affordable rates.",
  },
};

export default function NetworkPlans() {
  const [, params] = useRoute("/buy-data/:network");
  const [, setLocation] = useLocation();
  const network = params?.network as "mtn" | "airtel" | "glo";
  const plans = useDataPlansByNetwork(network);
  const { setCurrentOrder } = useCurrentOrder();

  if (!network || !networkConfig[network]) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <BackButton href="/buy-data" />
        <div className="mt-8 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Network Not Found</h1>
          <p className="text-muted-foreground">The selected network is not available.</p>
        </div>
      </div>
    );
  }

  const config = networkConfig[network];
  const Icon = config.icon;

  const handlePlanSelect = (plan: typeof plans[0]) => {
    setCurrentOrder({
      network: plan.network,
      dataAmount: plan.dataAmount,
      price: plan.price,
      duration: plan.duration,
    });
    setLocation("/payment");
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/buy-data" />
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="mt-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br shadow-xl",
                config.gradient
              )}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold">{config.name} Products</h1>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Plans Grid */}
      {plans.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <StaggerItem key={plan.id}>
              <DataPlanCard
                plan={plan}
                onClick={() => handlePlanSelect(plan)}
                index={index}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Empty State */}
      {plans.length === 0 && (
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Plans Available</h2>
            <p className="text-muted-foreground">
              There are currently no active plans for this network. Please check back later.
            </p>
          </div>
        </FadeIn>
      )}

      {/* Info Card */}
      <FadeIn delay={0.4}>
        <motion.div
          className="mt-12 p-6 rounded-2xl bg-muted/30 border border-border/50"
        >
          <h3 className="font-semibold mb-2">How it works</h3>
          <ol className="text-sm text-muted-foreground space-y-2">
            <li>1. Select your preferred data plan from the options above</li>
            <li>2. Complete the payment using the bank details provided</li>
            <li>3. Fill in your details and confirm your order</li>
            <li>4. Your data will be credited within minutes!</li>
          </ol>
        </motion.div>
      </FadeIn>
    </div>
  );
}
