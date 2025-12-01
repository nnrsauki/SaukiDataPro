import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Phone, Bell, Lock, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-store";
import logoImage from "@assets/image_1764589112544_1764600352725_1764631153148.jpeg";

const navLinks = [
  { href: "/buy-data", label: "Buy Data", icon: ShoppingCart },
  { href: "/contact", label: "Contact Us", icon: Phone },
  { href: "/subscribe", label: "Subscribe to Promo Alerts", icon: Bell },
  { href: "/admin", label: "Admin", icon: Lock },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav className="relative rounded-2xl bg-card/70 dark:bg-card/50 backdrop-blur-xl border border-card-border/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 cursor-pointer"
                  data-testid="link-home"
                >
                  <img
                    src={logoImage}
                    alt="Sauki Data Links"
                    className="h-10 w-auto rounded-lg"
                  />
                  <span className="font-semibold text-lg hidden sm:block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Sauki Data
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = location === link.href || location.startsWith(link.href + "/");
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        data-testid={`link-${link.href.replace("/", "")}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden xl:inline">{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary/10 rounded-xl"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleTheme}
                  className="rounded-xl"
                  data-testid="button-theme-toggle"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="lg:hidden rounded-xl"
                  onClick={() => setIsOpen(!isOpen)}
                  data-testid="button-mobile-menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden mx-4 mt-2 overflow-hidden"
          >
            <div className="rounded-2xl bg-card/90 dark:bg-card/80 backdrop-blur-xl border border-card-border/50 dark:border-white/10 shadow-xl p-4 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = location === link.href || location.startsWith(link.href + "/");
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <div
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        data-testid={`link-mobile-${link.href.replace("/", "")}`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
