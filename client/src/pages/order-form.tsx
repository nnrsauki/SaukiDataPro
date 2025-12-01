import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Phone, Package, CreditCard, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BackButton } from "@/components/back-button";
import { GradientButton } from "@/components/gradient-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn } from "@/components/page-transition";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCurrentOrder } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";
import { nigerianPhoneSchema } from "@shared/schema";
import { cn } from "@/lib/utils";

const orderFormSchema = z.object({
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: nigerianPhoneSchema,
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function OrderForm() {
  const [, setLocation] = useLocation();
  const { order, updateOrder } = useCurrentOrder();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      senderName: order?.senderName || "",
      phoneNumber: order?.phoneNumber || "",
    },
  });

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

  const onSubmit = async (values: OrderFormValues) => {
    setIsSubmitting(true);
    
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    updateOrder({
      senderName: values.senderName,
      phoneNumber: values.phoneNumber,
    });

    toast({
      title: "Details saved!",
      description: "Proceeding to order preview...",
    });

    setIsSubmitting(false);
    setLocation("/order-preview");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/payment" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Order Details</h1>
          <p className="text-muted-foreground text-lg">
            Please fill in your details to complete your order.
          </p>
        </div>
      </FadeIn>

      {/* Order Summary (Read-only) */}
      <FadeIn delay={0.15}>
        <GlassPanel className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Order</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Product</div>
                <div className="font-medium">
                  {order.network.toUpperCase()} {order.dataAmount}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Price</div>
                <div className="font-medium text-primary">{formattedPrice}</div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </FadeIn>

      {/* Order Form */}
      <FadeIn delay={0.2}>
        <GlassPanel className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sender Name */}
              <FormField
                control={form.control}
                name="senderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name on Transfer Receipt
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the name on your transfer receipt"
                        className="h-12 rounded-xl bg-muted/50 border-border/50"
                        data-testid="input-sender-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number (to receive data)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="e.g., 08012345678"
                        className="h-12 rounded-xl bg-muted/50 border-border/50"
                        data-testid="input-phone-number"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a valid Nigerian phone number (080, 081, 090, 091, 070)
                    </p>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <GradientButton
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
                data-testid="button-confirm-order"
              >
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </GradientButton>
            </form>
          </Form>
        </GlassPanel>
      </FadeIn>
    </div>
  );
}
