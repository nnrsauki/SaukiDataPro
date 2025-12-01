import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BackButton } from "@/components/back-button";
import { GradientButton } from "@/components/gradient-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn } from "@/components/page-transition";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";
import { adminLoginSchema } from "@shared/schema";

type LoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (isAuthenticated) {
    setLocation("/admin/dashboard");
    return null;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(values.username, values.password);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      });
      setLocation("/admin/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
      <FadeIn>
        <BackButton href="/" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
          <p className="text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <GlassPanel className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        className="h-12 rounded-xl bg-muted/50 border-border/50"
                        autoComplete="username"
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-12 rounded-xl bg-muted/50 border-border/50 pr-12"
                          autoComplete="current-password"
                          data-testid="input-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <GradientButton
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
                data-testid="button-login"
              >
                <Lock className="w-5 h-5 mr-2" />
                Sign In
              </GradientButton>
            </form>
          </Form>
        </GlassPanel>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected area. Unauthorized access is prohibited.
        </p>
      </FadeIn>
    </div>
  );
}
