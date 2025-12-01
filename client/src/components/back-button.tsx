import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label = "Back" }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (href) {
      setLocation(href);
    } else {
      window.history.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        onClick={handleClick}
        className="gap-2 text-muted-foreground hover:text-foreground rounded-xl"
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Button>
    </motion.div>
  );
}
