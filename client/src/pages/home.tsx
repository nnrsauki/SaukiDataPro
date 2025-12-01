import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { GradientButton } from "@/components/gradient-button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import logoImage from "@assets/image_1764589112544_1764600352725_1764631153148.jpeg";

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your data bundle activated within minutes of payment confirmation.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your transactions are protected with industry-standard security measures.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our support team is always available to assist you with any issues.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mb-8"
            >
              <img
                src={logoImage}
                alt="Sauki Data Links"
                className="w-32 h-32 rounded-3xl shadow-2xl shadow-primary/20"
                data-testid="img-logo"
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">Welcome to</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Sauki Data Links
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Cheapest & Fastest Data in Nigeria
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/buy-data">
                <GradientButton size="lg" className="group" data-testid="button-buy-data-hero">
                  <span>Buy Data Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-h-12 px-8 rounded-xl text-base font-medium border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors"
                  data-testid="button-contact-hero"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              We provide the best data reselling service in Nigeria with unbeatable prices and instant delivery.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-card-border/50 dark:border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Networks Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Available Networks</h2>
            <p className="text-muted-foreground mb-12">
              We support all major Nigerian mobile networks
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: "MTN", color: "from-yellow-400 to-yellow-600" },
                { name: "Airtel", color: "from-red-500 to-red-700" },
                { name: "Glo", color: "from-green-500 to-green-700" },
              ].map((network, index) => (
                <motion.div
                  key={network.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${network.color} flex items-center justify-center shadow-xl cursor-pointer`}
                >
                  <span className="text-white font-bold text-lg">{network.name}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
