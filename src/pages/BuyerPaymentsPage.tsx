import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function BuyerPaymentsPage() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile, signOut } = useAuth();
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
        .select("*, profiles(full_name)")
        .eq("buyer_id", profile?.id)
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

  const totalSpent = payments.reduce(
    (total, contract) => total + (contract.paid_amount || 0),
    0
  );

  const pendingPayments = payments.reduce(
    (total, contract) => total + (contract.total_value - (contract.paid_amount || 0)),
    0
  );

  return (
    <ProtectedRoute requiredUserType="buyer">
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Button
            className="rounded-full w-14 h-14 bg-harvest-primary shadow-lg"
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
        <div
          className={`${
            activeSidebar ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed inset-y-0 left-0 z-[60] w-64 transform transition-transform duration-200 ease-in-out bg-white border-r shadow-sm lg:static lg:z-auto`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-harvest-primary">
                  <span className="text-white font-bold text-sm">HH</span>
                </div>
                <span className="font-bold text-xl text-harvest-dark">
                  Harvest<span className="text-harvest-primary">Harmony</span>
                </span>
              </div>
            </div>
            <div className="px-4 py-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harvest-primary flex items-center justify-center text-white">
                  {profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "BP"}
                </div>
                <div>
                  <p className="font-medium text-harvest-dark">{profile?.full_name || "Buyer"}</p>
                  <p className="text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-auto">
              <Link to="/buyer/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  Dashboard
                </Button>
              </Link>
              <Link to="/buyer/contracts">
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  My Contracts
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                Payments
              </Button>
              <Link to="/messages">
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  Messages
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={signOut}>
                Log Out
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Dashboard header */}
          <header className="sticky top-0 bg-white border-b shadow-sm z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-harvest-dark">
                  Payments
                </h1>
              </div>
            </div>
          </header>

          {/* Payments content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Payment summary cards */}
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Paid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalSpent.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across {payments.length} contracts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{pendingPayments.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due for active contracts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Current Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{payments
                    .filter(p => new Date(p.updated_at).getMonth() === new Date().getMonth())
                    .reduce((total, p) => total + (p.paid_amount || 0), 0)
                    .toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Payments this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment history */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Payment History</CardTitle>
                <CardDescription className="text-sm">Track your contract payments</CardDescription>
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
                            <p className="text-sm mt-1">
                              Farmer: {contract.profiles?.full_name || 'Unknown Farmer'}
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
                    <p className="text-gray-500 text-sm md:text-base">You don't have any payment history yet.</p>
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
