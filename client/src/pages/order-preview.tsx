import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Phone, Package, CreditCard, Check, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { GradientButton } from "@/components/gradient-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { useCurrentOrder } from "@/hooks/use-store";
import { contactInfo } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function OrderPreview() {
  const [, setLocation] = useLocation();
  const { order, clearOrder } = useCurrentOrder();

  useEffect(() => {
    if (!order || !order.senderName || !order.phoneNumber) {
      setLocation("/buy-data");
    }
  }, [order, setLocation]);

  if (!order || !order.senderName || !order.phoneNumber) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(order.price);

  const handleProceed = () => {
    const message = `Hello Sauki Data Links,

I just made payment and would like to purchase data.

ORDER DETAILS:
Name on Transfer: ${order.senderName}
Product: ${order.network.toUpperCase()} ${order.dataAmount} (${order.duration})
Price Paid: ${formattedPrice}
Phone Number: ${order.phoneNumber}

Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    clearOrder();
    setLocation("/");
  };

  const orderDetails = [
    {
      icon: User,
      label: "Name on Transfer",
      value: order.senderName,
    },
    {
      icon: Package,
      label: "Product",
      value: `${order.network.toUpperCase()} ${order.dataAmount} (${order.duration})`,
    },
    {
      icon: CreditCard,
      label: "Price Paid",
      value: formattedPrice,
      highlight: true,
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: order.phoneNumber,
    },
  ];

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/order-form" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Order Preview</h1>
          <p className="text-muted-foreground text-lg">
            Please review your order details before proceeding.
          </p>
        </div>
      </FadeIn>

      {/* Order Summary Card */}
      <FadeIn delay={0.2}>
        <GlassPanel className="p-6 mb-8">
          <StaggerContainer className="space-y-4">
            {orderDetails.map((detail, index) => (
              <StaggerItem key={detail.label}>
                <motion.div
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-muted/30 border border-border/30",
                    "transition-colors hover:bg-muted/50"
                  )}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    detail.highlight 
                      ? "bg-gradient-to-br from-primary to-accent" 
                      : "bg-muted"
                  )}>
                    <detail.icon className={cn(
                      "w-6 h-6",
                      detail.highlight ? "text-white" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{detail.label}</div>
                    <div className={cn(
                      "font-semibold",
                      detail.highlight && "text-primary text-xl"
                    )}>
                      {detail.value}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </GlassPanel>
      </FadeIn>

      {/* WhatsApp Notice */}
      <FadeIn delay={0.3}>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-8">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-700 dark:text-green-300 mb-1">
                What happens next?
              </p>
              <p className="text-green-600 dark:text-green-400">
                Clicking the button below will open WhatsApp with your order details pre-filled.
                Our team will process your order and credit your data within minutes.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Proceed Button */}
      <FadeIn delay={0.4}>
        <GradientButton
          onClick={handleProceed}
          size="lg"
          className="w-full group"
          data-testid="button-proceed-whatsapp"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Proceed to Buy Data via WhatsApp
        </GradientButton>
      </FadeIn>
    </div>
  );
}
