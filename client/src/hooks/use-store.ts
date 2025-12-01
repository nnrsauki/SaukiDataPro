import { useState, useEffect, useCallback } from "react";
import * as store from "@/lib/store";
import type { DataPlan, Promo, AdminUser } from "@shared/schema";

export function useDataPlans() {
  const [plans, setPlans] = useState<DataPlan[]>([]);

  useEffect(() => {
    store.initializeStorage();
    setPlans(store.getDataPlans());
  }, []);

  const refresh = useCallback(() => {
    setPlans(store.getDataPlans());
  }, []);

  const updatePlan = useCallback((id: string, updates: Partial<DataPlan>) => {
    const updated = store.updateDataPlan(id, updates);
    setPlans(updated);
  }, []);

  const addPlan = useCallback((plan: Omit<DataPlan, "id">) => {
    const updated = store.addDataPlan(plan);
    setPlans(updated);
  }, []);

  const deletePlan = useCallback((id: string) => {
    const updated = store.deleteDataPlan(id);
    setPlans(updated);
  }, []);

  return { plans, refresh, updatePlan, addPlan, deletePlan };
}

export function useDataPlansByNetwork(network: string) {
  const [plans, setPlans] = useState<DataPlan[]>([]);

  useEffect(() => {
    store.initializeStorage();
    setPlans(store.getDataPlansByNetwork(network));
  }, [network]);

  return plans;
}

export function usePromos() {
  const [promos, setPromos] = useState<Promo[]>([]);

  useEffect(() => {
    store.initializeStorage();
    setPromos(store.getPromos());
  }, []);

  const refresh = useCallback(() => {
    setPromos(store.getPromos());
  }, []);

  const addPromo = useCallback((promo: Omit<Promo, "id" | "createdAt">) => {
    const updated = store.addPromo(promo);
    setPromos(updated);
  }, []);

  const updatePromo = useCallback((id: string, updates: Partial<Promo>) => {
    const updated = store.updatePromo(id, updates);
    setPromos(updated);
  }, []);

  const deletePromo = useCallback((id: string) => {
    const updated = store.deletePromo(id);
    setPromos(updated);
  }, []);

  return { promos, refresh, addPromo, updatePromo, deletePromo };
}

export function useLivePromo() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    store.initializeStorage();
    setPromo(store.getLivePromo());
  }, []);

  return promo;
}

export function useAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  useEffect(() => {
    store.initializeStorage();
    setAdmins(store.getAdmins());
  }, []);

  const refresh = useCallback(() => {
    setAdmins(store.getAdmins());
  }, []);

  const addAdmin = useCallback((admin: Omit<AdminUser, "id">) => {
    const updated = store.addAdmin(admin);
    setAdmins(updated);
  }, []);

  const updateAdmin = useCallback((id: string, updates: Partial<AdminUser>) => {
    const updated = store.updateAdmin(id, updates);
    setAdmins(updated);
  }, []);

  const deleteAdmin = useCallback((id: string) => {
    const updated = store.deleteAdmin(id);
    setAdmins(updated);
  }, []);

  return { admins, refresh, addAdmin, updateAdmin, deleteAdmin };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.initializeStorage();
    setIsAuthenticated(store.isAuthenticated());
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const admin = store.validateAdmin(username, password);
    if (admin) {
      store.setAuthToken(admin.id);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    store.clearAuthToken();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
}

export function useCurrentOrder() {
  const [order, setOrder] = useState<store.CurrentOrder | null>(() => {
    return store.getCurrentOrder();
  });

  const setCurrentOrder = useCallback((newOrder: store.CurrentOrder) => {
    store.setCurrentOrder(newOrder);
    setOrder(newOrder);
  }, []);

  const updateOrder = useCallback((updates: Partial<store.CurrentOrder>) => {
    const current = store.getCurrentOrder();
    if (current) {
      const updated = { ...current, ...updates };
      store.setCurrentOrder(updated);
      setOrder(updated);
    }
  }, []);

  const clearOrder = useCallback(() => {
    store.clearCurrentOrder();
    setOrder(null);
  }, []);

  return { order, setCurrentOrder, updateOrder, clearOrder };
}

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = store.getTheme();
    setThemeState(currentTheme);
    store.setTheme(currentTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    store.setTheme(newTheme);
  }, [theme]);

  const setTheme = useCallback((newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    store.setTheme(newTheme);
  }, []);

  return { theme, toggleTheme, setTheme };
}
