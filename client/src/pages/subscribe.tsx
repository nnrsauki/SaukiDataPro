import { motion } from "framer-motion";
import { Bell, MessageCircle, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BackButton } from "@/components/back-button";
import { GradientButton } from "@/components/gradient-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn } from "@/components/page-transition";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { nigerianPhoneSchema, contactInfo } from "@shared/schema";
import { cn } from "@/lib/utils";

const subscribeSchema = z.object({
  whatsappNumber: nigerianPhoneSchema,
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export default function Subscribe() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      whatsappNumber: "",
    },
  });

  const onSubmit = async (values: SubscribeFormValues) => {
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    const message = `Hello Sauki Data Links,
Please add me to your Promo & Offers broadcast list.

My WhatsApp Number: ${values.whatsappNumber}
Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodedMessage}`;
    
    toast({
      title: "Redirecting to WhatsApp...",
      description: "Complete your subscription there.",
    });

    setIsSubmitting(false);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Bell className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Subscribe to Promo Alerts</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Never miss out on our exclusive deals and special offers!
          </p>
        </div>
      </FadeIn>

      {/* Benefits */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Sparkles, text: "Exclusive Deals" },
            { icon: Bell, text: "Early Access" },
            { icon: MessageCircle, text: "Direct Updates" },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center"
            >
              <benefit.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Important Notice */}
      <FadeIn delay={0.2}>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">
                Important: Save our number first!
              </p>
              <p className="text-muted-foreground">
                Please save our number{" "}
                <span className="font-mono font-semibold text-primary">{contactInfo.phone}</span>
                {" "}to your contacts before subscribing. This ensures you receive our broadcast messages.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Subscribe Form */}
      <FadeIn delay={0.25}>
        <GlassPanel className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Your WhatsApp Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="e.g., 08012345678"
                        className="h-12 rounded-xl bg-muted/50 border-border/50"
                        data-testid="input-whatsapp-number"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a valid Nigerian phone number
                    </p>
                  </FormItem>
                )}
              />

              <GradientButton
                type="submit"
                size="lg"
                className="w-full group"
                loading={isSubmitting}
                disabled={isSubmitting}
                data-testid="button-subscribe"
              >
                <Bell className="w-5 h-5 mr-2" />
                Subscribe Now
              </GradientButton>
            </form>
          </Form>
        </GlassPanel>
      </FadeIn>

      {/* What to expect */}
      <FadeIn delay={0.3}>
        <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border/50">
          <h3 className="font-semibold mb-4">What you'll receive:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Flash sale notifications with up to 50% off
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              New data plan announcements
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Special holiday promotions
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Exclusive subscriber-only deals
            </li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}
