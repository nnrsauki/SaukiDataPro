import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Copy, Check, Building2, CreditCard, User, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { GradientButton } from "@/components/gradient-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn } from "@/components/page-transition";
import { useCurrentOrder } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";
import { paymentDetails } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Payment() {
  const [, setLocation] = useLocation();
  const { order } = useCurrentOrder();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order) {
      setLocation("/buy-data");
    }
  }, [order, setLocation]);

  if (!order) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(order.price);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentDetails.accountNumber);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy account number",
        variant: "destructive",
      });
    }
  };

  const handleProceed = () => {
    setLocation("/order-form");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href={`/buy-data/${order.network}`} />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Payment Instructions</h1>
          <p className="text-muted-foreground text-lg">
            Complete your payment using the details below.
          </p>
        </div>
      </FadeIn>

      {/* Order Summary */}
      <FadeIn delay={0.15}>
        <GlassPanel className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium">
                {order.network.toUpperCase()} {order.dataAmount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{order.duration}</span>
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
            </div>
          </div>
        </GlassPanel>
      </FadeIn>

      {/* Payment Details */}
      <FadeIn delay={0.2}>
        <GlassPanel className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Bank Details
          </h2>

          <div className="space-y-6">
            {/* Account Number */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Account Number</div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-mono font-bold tracking-wider">
                  {paymentDetails.accountNumber}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl",
                    "bg-primary text-primary-foreground",
                    "font-medium text-sm",
                    "transition-colors"
                  )}
                  data-testid="button-copy-account"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: copied ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.div>
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </div>

            {/* Bank Name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Bank</div>
                <div className="font-medium">{paymentDetails.bankName}</div>
              </div>
            </div>

            {/* Account Name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Account Name</div>
                <div className="font-medium">{paymentDetails.accountName}</div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </FadeIn>

      {/* Important Notice */}
      <FadeIn delay={0.25}>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">
                Important
              </p>
              <p className="text-yellow-600 dark:text-yellow-400">
                Please ensure you transfer exactly <strong>{formattedPrice}</strong> to the account above.
                After making the transfer, click the button below to proceed with your order.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Proceed Button */}
      <FadeIn delay={0.3}>
        <GradientButton
          onClick={handleProceed}
          size="lg"
          className="w-full"
          data-testid="button-proceed-payment"
        >
          I have sent the money
        </GradientButton>
      </FadeIn>
    </div>
  );
}
