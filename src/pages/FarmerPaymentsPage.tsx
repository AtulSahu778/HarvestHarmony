
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import DashboardHeader from "@/components/farmer/DashboardHeader";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FarmerPaymentsPage() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchPayments();
    }
  }, [profile?.id]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("farmer_id", profile?.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setPayments(data || []);
    } catch (error: any) {
      console.error("Error fetching payments:", error.message);
      toast({
        title: "Error",
        description: "Failed to load payment information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create an overlay when sidebar is active on mobile
  const SidebarOverlay = () => (
    activeSidebar && (
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setActiveSidebar(false)}
      />
    )
  );

  return (
    <ProtectedRoute requiredUserType="farmer">
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Mobile overlay for sidebar */}
        <SidebarOverlay />

        {/* Mobile sidebar toggle button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Button
            className="rounded-full w-14 h-14 bg-harvest-primary shadow-lg mobile-menu-button"
            onClick={() => setActiveSidebar(!activeSidebar)}
          >
            {activeSidebar ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <FarmerSidebar activeSidebar={activeSidebar} />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Dashboard header */}
          <DashboardHeader />

          {/* Payments content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-harvest-dark">Payments</h1>
              <p className="text-gray-500">Manage and track your contract payments</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Payment History</CardTitle>
                <CardDescription className="text-sm">Track payments for your contracts</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-6 md:py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
                  </div>
                ) : payments.length > 0 ? (
                  <div className="space-y-4">
                    {payments.map((contract) => (
                      <div key={contract.id} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                          <div>
                            <h3 className="font-medium text-harvest-dark">
                              {contract.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {contract.crop_name} - {contract.quantity} {contract.unit}
                            </p>
                            <p className="text-sm mt-2">
                              Contract Value: ₹{parseFloat(contract.total_value).toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-green-600">
                              Paid: ₹{parseFloat(contract.paid_amount || 0).toLocaleString('en-IN')}
                            </p>
                            <p className="text-sm font-medium text-amber-600">
                              Pending: ₹{parseFloat(contract.total_value - (contract.paid_amount || 0)).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        {/* Payment progress bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Payment Progress</span>
                            <span>
                              {Math.round((contract.paid_amount || 0) / contract.total_value * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ 
                                width: `${Math.round((contract.paid_amount || 0) / contract.total_value * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 md:py-8">
                    <p className="text-gray-500 text-sm md:text-base">You don't have any payments yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
