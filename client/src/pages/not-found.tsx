import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { GradientButton } from "@/components/gradient-button";
import { FadeIn } from "@/components/page-transition";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <FadeIn>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-8"
          >
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-bold mb-4"
          >
            404
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/">
              <GradientButton className="gap-2" data-testid="button-go-home">
                <Home className="w-5 h-5" />
                Go Back Home
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  );
}
