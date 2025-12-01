import { z } from "zod";

// Data Plan Schema
export const dataPlanSchema = z.object({
  id: z.string(),
  network: z.enum(["mtn", "airtel", "glo"]),
  dataAmount: z.string(),
  duration: z.string(),
  price: z.number(),
  enabled: z.boolean().default(true),
});

export type DataPlan = z.infer<typeof dataPlanSchema>;
export type InsertDataPlan = Omit<DataPlan, "id">;

// Promo Schema
export const promoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  isLive: z.boolean().default(false),
  createdAt: z.string(),
});

export type Promo = z.infer<typeof promoSchema>;
export type InsertPromo = Omit<Promo, "id" | "createdAt">;

// Admin User Schema
export const adminUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
export type InsertAdminUser = Omit<AdminUser, "id">;

// Order Schema
export const orderSchema = z.object({
  id: z.string(),
  senderName: z.string(),
  phoneNumber: z.string(),
  productName: z.string(),
  price: z.number(),
  network: z.enum(["mtn", "airtel", "glo"]),
  createdAt: z.string(),
  status: z.enum(["pending", "completed", "cancelled"]).default("pending"),
});

export type Order = z.infer<typeof orderSchema>;
export type InsertOrder = Omit<Order, "id" | "createdAt" | "status">;

// Nigerian Phone Number Validation
export const nigerianPhoneSchema = z.string().refine(
  (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    const validPrefixes = ["070", "080", "081", "090", "091", "0701", "0702", "0703", "0704", "0705", "0706", "0707", "0708", "0709", "0802", "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810", "0811", "0812", "0813", "0814", "0815", "0816", "0817", "0818", "0819", "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909", "0912", "0913", "0915", "0916"];
    const hasValidPrefix = validPrefixes.some(prefix => cleaned.startsWith(prefix));
    return hasValidPrefix && cleaned.length === 11;
  },
  { message: "Please enter a valid Nigerian phone number" }
);

// Order Form Schema
export const orderFormSchema = z.object({
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: nigerianPhoneSchema,
  productName: z.string(),
  price: z.number(),
  network: z.enum(["mtn", "airtel", "glo"]),
});

// Subscribe Form Schema
export const subscribeFormSchema = z.object({
  whatsappNumber: nigerianPhoneSchema,
});

// Admin Login Schema
export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Default Data Plans
export const defaultDataPlans: DataPlan[] = [
  // MTN Plans
  { id: "mtn-1gb", network: "mtn", dataAmount: "1GB", duration: "30 days", price: 500, enabled: true },
  { id: "mtn-2gb", network: "mtn", dataAmount: "2GB", duration: "30 days", price: 1000, enabled: true },
  { id: "mtn-5gb", network: "mtn", dataAmount: "5GB", duration: "30 days", price: 2000, enabled: true },
  { id: "mtn-10gb", network: "mtn", dataAmount: "10GB", duration: "30 days", price: 4000, enabled: true },
  
  // Airtel Plans
  { id: "airtel-10gb", network: "airtel", dataAmount: "10GB", duration: "30 days", price: 4000, enabled: true },
  { id: "airtel-25gb", network: "airtel", dataAmount: "25GB", duration: "30 days", price: 10000, enabled: true },
  
  // Glo Plans
  { id: "glo-1gb", network: "glo", dataAmount: "1GB", duration: "30 days", price: 500, enabled: true },
  { id: "glo-5gb", network: "glo", dataAmount: "5GB", duration: "30 days", price: 2500, enabled: true },
  { id: "glo-10gb", network: "glo", dataAmount: "10GB", duration: "30 days", price: 4000, enabled: true },
];

// Default Admin
export const defaultAdmin: AdminUser = {
  id: "admin-1",
  username: "AbdallahSauki",
  password: "AAUNangere@2003",
};

// Payment Details
export const paymentDetails = {
  accountNumber: "8164135836",
  bankName: "Opay / Sterling Bank",
  accountName: "Abdullahi Adam Usman",
};

// Contact Information
export const contactInfo = {
  phone: "08164135836",
  whatsapp: "2348164135836",
  email: "saukidatalinks@gmail.com",
  twitter: "@SaukiDataLinks",
  facebook: "@SaukiDataLinks",
  instagram: "@SaukiDataLinks",
};
