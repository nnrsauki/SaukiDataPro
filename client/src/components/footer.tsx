import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-auto py-8"
    >
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-card-border/30 dark:border-white/5 p-6">
          {/* Gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-semibold text-foreground">Sauki Data Links Inc.</span>
            </p>
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Developed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by{" "}
              <span className="font-semibold text-foreground">Abdallah Nangere</span>
            </p>
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
            <p className="text-sm text-muted-foreground">© 2025</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
