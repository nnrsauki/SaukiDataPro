import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  Users,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GlassPanel } from "@/components/glass-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { useAuth, useDataPlans, usePromos, useAdmins } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { DataPlan, Promo, AdminUser } from "@shared/schema";

type TabType = "plans" | "promos" | "admins";

const sidebarItems = [
  { id: "plans" as TabType, label: "Manage Plans", icon: Package },
  { id: "promos" as TabType, label: "Current Offers", icon: Sparkles },
  { id: "admins" as TabType, label: "Manage Admins", icon: Users },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("plans");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile Menu Button */}
      <Button
        size="icon"
        variant="ghost"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        data-testid="button-mobile-sidebar"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-72 bg-sidebar border-r border-sidebar-border",
          "lg:translate-x-0 transition-transform"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Sauki Data Links</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                  "text-left font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
                data-testid={`button-tab-${item.id}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "plans" && <PlansTab key="plans" />}
            {activeTab === "promos" && <PromosTab key="promos" />}
            {activeTab === "admins" && <AdminsTab key="admins" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function PlansTab() {
  const { plans, updatePlan, addPlan, deletePlan } = useDataPlans();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<DataPlan>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    network: "mtn" as "mtn" | "airtel" | "glo",
    dataAmount: "",
    duration: "30 days",
    price: 0,
    enabled: true,
  });

  const handleToggle = (id: string, enabled: boolean) => {
    updatePlan(id, { enabled });
    toast({
      title: enabled ? "Plan enabled" : "Plan disabled",
      description: `The plan has been ${enabled ? "enabled" : "disabled"}.`,
    });
  };

  const handleEdit = (plan: DataPlan) => {
    setEditingId(plan.id);
    setEditValues({ price: plan.price });
  };

  const handleSaveEdit = (id: string) => {
    if (editValues.price !== undefined) {
      updatePlan(id, { price: editValues.price });
      toast({
        title: "Plan updated",
        description: "The plan price has been updated.",
      });
    }
    setEditingId(null);
    setEditValues({});
  };

  const handleDelete = (id: string) => {
    deletePlan(id);
    toast({
      title: "Plan deleted",
      description: "The plan has been removed.",
    });
  };

  const handleAddPlan = () => {
    if (!newPlan.dataAmount || newPlan.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      });
      return;
    }
    addPlan(newPlan);
    toast({
      title: "Plan added",
      description: "The new plan has been added successfully.",
    });
    setNewPlan({
      network: "mtn",
      dataAmount: "",
      duration: "30 days",
      price: 0,
      enabled: true,
    });
    setShowAddForm(false);
  };

  const groupedPlans = {
    mtn: plans.filter((p) => p.network === "mtn"),
    airtel: plans.filter((p) => p.network === "airtel"),
    glo: plans.filter((p) => p.network === "glo"),
  };

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Plans</h1>
          <p className="text-muted-foreground">Add, edit, or disable data plans</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2"
          data-testid="button-add-plan"
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </Button>
      </div>

      {/* Add Plan Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <GlassPanel className="p-6">
              <h3 className="font-semibold mb-4">Add New Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  value={newPlan.network}
                  onChange={(e) => setNewPlan({ ...newPlan, network: e.target.value as "mtn" | "airtel" | "glo" })}
                  className="h-10 rounded-lg border border-input bg-background px-3"
                  data-testid="select-network"
                >
                  <option value="mtn">MTN</option>
                  <option value="airtel">Airtel</option>
                  <option value="glo">Glo</option>
                </select>
                <Input
                  placeholder="Data Amount (e.g., 5GB)"
                  value={newPlan.dataAmount}
                  onChange={(e) => setNewPlan({ ...newPlan, dataAmount: e.target.value })}
                  data-testid="input-data-amount"
                />
                <Input
                  placeholder="Duration"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                  data-testid="input-duration"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newPlan.price || ""}
                  onChange={(e) => setNewPlan({ ...newPlan, price: parseInt(e.target.value) || 0 })}
                  data-testid="input-price"
                />
                <Button onClick={handleAddPlan} data-testid="button-save-plan">
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plans by Network */}
      <div className="space-y-8">
        {(Object.keys(groupedPlans) as Array<keyof typeof groupedPlans>).map((network) => (
          <div key={network}>
            <h2 className="text-xl font-semibold mb-4 capitalize">{network} Plans</h2>
            <div className="space-y-3">
              {groupedPlans[network].map((plan) => (
                <GlassPanel key={plan.id} className="p-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={plan.enabled}
                        onCheckedChange={(checked) => handleToggle(plan.id, checked)}
                        data-testid={`switch-plan-${plan.id}`}
                      />
                      <div>
                        <p className="font-medium">{plan.dataAmount}</p>
                        <p className="text-sm text-muted-foreground">{plan.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {editingId === plan.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={editValues.price || ""}
                            onChange={(e) => setEditValues({ price: parseInt(e.target.value) || 0 })}
                            className="w-32"
                            data-testid={`input-edit-price-${plan.id}`}
                          />
                          <Button size="icon" onClick={() => handleSaveEdit(plan.id)} data-testid={`button-save-edit-${plan.id}`}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="font-semibold text-primary">
                            ₦{plan.price.toLocaleString()}
                          </span>
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(plan)} data-testid={`button-edit-${plan.id}`}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(plan.id)} className="text-destructive" data-testid={`button-delete-${plan.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function PromosTab() {
  const { promos, addPromo, updatePromo, deletePromo } = usePromos();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPromo, setNewPromo] = useState({
    title: "",
    description: "",
    imageUrl: "",
    isLive: false,
  });

  const handleAdd = () => {
    if (!newPromo.title || !newPromo.description) {
      toast({
        title: "Error",
        description: "Please fill in title and description.",
        variant: "destructive",
      });
      return;
    }
    addPromo(newPromo);
    toast({
      title: "Promo created",
      description: "The promo has been created successfully.",
    });
    setNewPromo({ title: "", description: "", imageUrl: "", isLive: false });
    setShowAddForm(false);
  };

  const handleToggleLive = (id: string, isLive: boolean) => {
    updatePromo(id, { isLive });
    toast({
      title: isLive ? "Promo is now live" : "Promo is now hidden",
      description: isLive ? "This promo will be shown to customers." : "This promo is now hidden.",
    });
  };

  const handleDelete = (id: string) => {
    deletePromo(id);
    toast({
      title: "Promo deleted",
      description: "The promo has been removed.",
    });
  };

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Current Offers</h1>
          <p className="text-muted-foreground">Manage promotional banners</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2"
          data-testid="button-add-promo"
        >
          <Plus className="w-4 h-4" />
          Add Promo
        </Button>
      </div>

      {/* Add Promo Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <GlassPanel className="p-6">
              <h3 className="font-semibold mb-4">Create New Promo</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Promo Title"
                  value={newPromo.title}
                  onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                  data-testid="input-promo-title"
                />
                <Input
                  placeholder="Description"
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                  data-testid="input-promo-description"
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={newPromo.imageUrl}
                  onChange={(e) => setNewPromo({ ...newPromo, imageUrl: e.target.value })}
                  data-testid="input-promo-image"
                />
                <Button onClick={handleAdd} data-testid="button-save-promo">
                  <Check className="w-4 h-4 mr-2" />
                  Create Promo
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promos List */}
      <div className="space-y-4">
        {promos.length === 0 ? (
          <GlassPanel className="p-8 text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No Promos Yet</h3>
            <p className="text-muted-foreground text-sm">
              Create your first promotional offer to attract customers.
            </p>
          </GlassPanel>
        ) : (
          promos.map((promo) => (
            <GlassPanel key={promo.id} className="p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={promo.isLive}
                    onCheckedChange={(checked) => handleToggleLive(promo.id, checked)}
                    data-testid={`switch-promo-${promo.id}`}
                  />
                  <div>
                    <p className="font-medium">{promo.title}</p>
                    <p className="text-sm text-muted-foreground">{promo.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {promo.isLive && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                      Live
                    </span>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(promo.id)}
                    className="text-destructive"
                    data-testid={`button-delete-promo-${promo.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassPanel>
          ))
        )}
      </div>
    </FadeIn>
  );
}

function AdminsTab() {
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useAdmins();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPassword, setEditPassword] = useState("");

  const handleAdd = () => {
    if (!newAdmin.username || !newAdmin.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    addAdmin(newAdmin);
    toast({
      title: "Admin added",
      description: "New admin user has been created.",
    });
    setNewAdmin({ username: "", password: "" });
    setShowAddForm(false);
  };

  const handleUpdatePassword = (id: string) => {
    if (!editPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }
    updateAdmin(id, { password: editPassword });
    toast({
      title: "Password updated",
      description: "The admin password has been changed.",
    });
    setEditingId(null);
    setEditPassword("");
  };

  const handleDelete = (id: string) => {
    if (admins.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one admin user.",
        variant: "destructive",
      });
      return;
    }
    deleteAdmin(id);
    toast({
      title: "Admin deleted",
      description: "The admin user has been removed.",
    });
  };

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Admins</h1>
          <p className="text-muted-foreground">Add or remove admin users</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2"
          data-testid="button-add-admin"
        >
          <Plus className="w-4 h-4" />
          Add Admin
        </Button>
      </div>

      {/* Add Admin Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <GlassPanel className="p-6">
              <h3 className="font-semibold mb-4">Add New Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Username"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                  data-testid="input-new-admin-username"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  data-testid="input-new-admin-password"
                />
                <Button onClick={handleAdd} data-testid="button-save-admin">
                  <Check className="w-4 h-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admins List */}
      <div className="space-y-4">
        {admins.map((admin) => (
          <GlassPanel key={admin.id} className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{admin.username}</p>
                  <p className="text-sm text-muted-foreground">Administrator</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {editingId === admin.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="password"
                      placeholder="New password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-40"
                      data-testid={`input-edit-password-${admin.id}`}
                    />
                    <Button size="icon" onClick={() => handleUpdatePassword(admin.id)} data-testid={`button-save-password-${admin.id}`}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(admin.id)}
                      data-testid={`button-change-password-${admin.id}`}
                    >
                      Change Password
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(admin.id)}
                      className="text-destructive"
                      disabled={admins.length <= 1}
                      data-testid={`button-delete-admin-${admin.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </FadeIn>
  );
}
