import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Twitter, Facebook, Instagram } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { contactInfo } from "@shared/schema";
import { cn } from "@/lib/utils";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactInfo.phone,
    href: `https://wa.me/${contactInfo.whatsapp}`,
    color: "from-green-500 to-green-600",
    description: "Chat with us directly on WhatsApp",
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    color: "from-blue-500 to-blue-600",
    description: "Call us for immediate assistance",
  },
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    color: "from-purple-500 to-purple-600",
    description: "Send us an email anytime",
  },
];

const socialLinks = [
  {
    icon: Twitter,
    label: "Twitter",
    value: contactInfo.twitter,
    href: `https://twitter.com/${contactInfo.twitter.replace("@", "")}`,
    color: "bg-sky-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: contactInfo.facebook,
    href: `https://facebook.com/${contactInfo.facebook.replace("@", "")}`,
    color: "bg-blue-600",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: contactInfo.instagram,
    href: `https://instagram.com/${contactInfo.instagram.replace("@", "")}`,
    color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
  },
];

export default function Contact() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <FadeIn>
        <BackButton href="/" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>
      </FadeIn>

      {/* Contact Methods */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contactMethods.map((method, index) => (
          <StaggerItem key={method.label}>
            <motion.a
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block"
              data-testid={`link-${method.label.toLowerCase()}`}
            >
              <GlassPanel className="p-6 h-full text-center hover:shadow-xl transition-shadow">
                <motion.div
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                  className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br mx-auto mb-4",
                    "flex items-center justify-center shadow-lg",
                    method.color
                  )}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-1">{method.label}</h3>
                <p className="text-primary font-medium mb-2">{method.value}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </GlassPanel>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Social Links */}
      <FadeIn delay={0.4}>
        <GlassPanel className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
          <p className="text-muted-foreground mb-8">
            Stay connected and get the latest updates on our social media channels.
          </p>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center",
                  "shadow-lg",
                  social.color
                )}
                data-testid={`link-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Handle: <span className="font-medium">{contactInfo.twitter}</span>
          </p>
        </GlassPanel>
      </FadeIn>

      {/* Business Hours */}
      <FadeIn delay={0.5}>
        <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <p className="text-muted-foreground text-sm">
            We're available 24/7 to assist you with your data needs.
            Response time is typically within 5-10 minutes.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
