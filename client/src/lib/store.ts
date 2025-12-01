import { DataPlan, Promo, AdminUser, Order, defaultDataPlans, defaultAdmin } from "@shared/schema";

const STORAGE_KEYS = {
  DATA_PLANS: "sauki_data_plans",
  PROMOS: "sauki_promos",
  ADMINS: "sauki_admins",
  ORDERS: "sauki_orders",
  AUTH_TOKEN: "sauki_auth_token",
  CURRENT_ORDER: "sauki_current_order",
  THEME: "sauki_theme",
};

// Initialize storage with default data
export function initializeStorage() {
  if (typeof window === "undefined") return;

  // Initialize data plans if not exists
  if (!localStorage.getItem(STORAGE_KEYS.DATA_PLANS)) {
    localStorage.setItem(STORAGE_KEYS.DATA_PLANS, JSON.stringify(defaultDataPlans));
  }

  // Initialize admins if not exists
  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify([defaultAdmin]));
  }

  // Initialize empty promos if not exists
  if (!localStorage.getItem(STORAGE_KEYS.PROMOS)) {
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify([]));
  }

  // Initialize empty orders if not exists
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
}

// Data Plans
export function getDataPlans(): DataPlan[] {
  if (typeof window === "undefined") return defaultDataPlans;
  const stored = localStorage.getItem(STORAGE_KEYS.DATA_PLANS);
  return stored ? JSON.parse(stored) : defaultDataPlans;
}

export function getDataPlansByNetwork(network: string): DataPlan[] {
  return getDataPlans().filter((plan) => plan.network === network && plan.enabled);
}

export function updateDataPlan(id: string, updates: Partial<DataPlan>) {
  const plans = getDataPlans();
  const index = plans.findIndex((p) => p.id === id);
  if (index !== -1) {
    plans[index] = { ...plans[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.DATA_PLANS, JSON.stringify(plans));
  }
  return plans;
}

export function addDataPlan(plan: Omit<DataPlan, "id">) {
  const plans = getDataPlans();
  const newPlan: DataPlan = {
    ...plan,
    id: `${plan.network}-${Date.now()}`,
  };
  plans.push(newPlan);
  localStorage.setItem(STORAGE_KEYS.DATA_PLANS, JSON.stringify(plans));
  return plans;
}

export function deleteDataPlan(id: string) {
  const plans = getDataPlans().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.DATA_PLANS, JSON.stringify(plans));
  return plans;
}

// Promos
export function getPromos(): Promo[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.PROMOS);
  return stored ? JSON.parse(stored) : [];
}

export function getLivePromo(): Promo | null {
  const promos = getPromos();
  return promos.find((p) => p.isLive) || null;
}

export function addPromo(promo: Omit<Promo, "id" | "createdAt">) {
  const promos = getPromos();
  const newPromo: Promo = {
    ...promo,
    id: `promo-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  promos.push(newPromo);
  localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
  return promos;
}

export function updatePromo(id: string, updates: Partial<Promo>) {
  const promos = getPromos();
  const index = promos.findIndex((p) => p.id === id);
  if (index !== -1) {
    // If setting this promo to live, disable all others
    if (updates.isLive) {
      promos.forEach((p, i) => {
        if (i !== index) p.isLive = false;
      });
    }
    promos[index] = { ...promos[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
  }
  return promos;
}

export function deletePromo(id: string) {
  const promos = getPromos().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
  return promos;
}

// Admins
export function getAdmins(): AdminUser[] {
  if (typeof window === "undefined") return [defaultAdmin];
  const stored = localStorage.getItem(STORAGE_KEYS.ADMINS);
  return stored ? JSON.parse(stored) : [defaultAdmin];
}

export function validateAdmin(username: string, password: string): AdminUser | null {
  const admins = getAdmins();
  return admins.find((a) => a.username === username && a.password === password) || null;
}

export function addAdmin(admin: Omit<AdminUser, "id">) {
  const admins = getAdmins();
  const newAdmin: AdminUser = {
    ...admin,
    id: `admin-${Date.now()}`,
  };
  admins.push(newAdmin);
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  return admins;
}

export function updateAdmin(id: string, updates: Partial<AdminUser>) {
  const admins = getAdmins();
  const index = admins.findIndex((a) => a.id === id);
  if (index !== -1) {
    admins[index] = { ...admins[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }
  return admins;
}

export function deleteAdmin(id: string) {
  const admins = getAdmins().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  return admins;
}

// Auth
export function setAuthToken(token: string) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function clearAuthToken() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Current Order (for multi-step flow)
export interface CurrentOrder {
  network: "mtn" | "airtel" | "glo";
  dataAmount: string;
  price: number;
  duration: string;
  senderName?: string;
  phoneNumber?: string;
}

export function setCurrentOrder(order: CurrentOrder) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_ORDER, JSON.stringify(order));
}

export function getCurrentOrder(): CurrentOrder | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_ORDER);
  return stored ? JSON.parse(stored) : null;
}

export function clearCurrentOrder() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_ORDER);
}

// Orders
export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return stored ? JSON.parse(stored) : [];
}

export function addOrder(order: Omit<Order, "id" | "createdAt" | "status">) {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
}

// Theme
export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  if (stored) return stored as "light" | "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
