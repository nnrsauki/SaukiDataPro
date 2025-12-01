import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { NetworkCard } from "@/components/network-card";
import { PromoBanner } from "@/components/promo-banner";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { useLivePromo } from "@/hooks/use-store";

const networks = [
  {
    network: "mtn" as const,
    title: "MTN Products",
    description: "Fast and reliable MTN data bundles at unbeatable prices.",
  },
  {
    network: "airtel" as const,
    title: "Airtel Products",
    description: "Premium Airtel data packages for all your needs.",
  },
  {
    network: "glo" as const,
    title: "Glo Products",
    description: "Affordable Glo data bundles with great value.",
  },
  {
    network: "offers" as const,
    title: "Current Offers",
    description: "Special promotions and exclusive deals for you.",
  },
];

export default function BuyData() {
  const [, setLocation] = useLocation();
  const livePromo = useLivePromo();

  const handleNetworkClick = (network: string) => {
    if (network === "offers") {
      return;
    }
    setLocation(`/buy-data/${network}`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Buy Data</h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred network and select a data plan that suits your needs.
          </p>
        </div>
      </FadeIn>

      {/* Live Promo Banner */}
      {livePromo && (
        <FadeIn delay={0.15}>
          <div className="mb-8">
            <PromoBanner promo={livePromo} />
          </div>
        </FadeIn>
      )}

      {/* Network Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {networks.map((network, index) => (
          <StaggerItem key={network.network}>
            <NetworkCard
              network={network.network}
              title={network.title}
              description={network.description}
              onClick={() => handleNetworkClick(network.network)}
              index={index}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Additional Info */}
      <FadeIn delay={0.5}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-card-border/50 text-center"
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            If you have any questions or need assistance with your purchase,
            don't hesitate to contact our support team.
          </p>
        </motion.div>
      </FadeIn>
    </div>
  );
}
