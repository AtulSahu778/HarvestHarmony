
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContracts } from "@/hooks/useContracts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function BuyerContractsPage() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile, signOut } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const { updateContractStatus, updatePaymentAmount } = useContracts();

  useEffect(() => {
    if (profile?.id) {
      fetchContracts();
    }
  }, [profile?.id]);

  const fetchContracts = async () => {
    try {
      setLoadingContracts(true);
      const { data, error } = await supabase
        .from("contracts")
        .select("*, profiles(full_name)")
        .eq("buyer_id", profile?.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setContracts(data || []);
    } catch (error: any) {
      console.error("Error fetching contracts:", error.message);
      toast({
        title: "Error",
        description: "Failed to load contracts",
        variant: "destructive",
      });
    } finally {
      setLoadingContracts(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleUpdateStatus = async (contractId: string, newStatus: string) => {
    const result = await updateContractStatus(contractId, newStatus);
    if (result) {
      // Update the local state to reflect the change
      setContracts(contracts.map(contract => 
        contract.id === contractId ? { ...contract, status: newStatus } : contract
      ));
      toast({
        title: "Status Updated",
        description: `Contract status updated to ${newStatus}`,
      });
    }
  };

  const handleMakePayment = async (contractId: string, currentPaid: number, totalValue: number) => {
    // For demo purposes, let's add 20% of the total value as a payment
    const paymentAmount = Math.min(totalValue, currentPaid + (totalValue * 0.2));
    
    const result = await updatePaymentAmount(contractId, paymentAmount);
    if (result) {
      // Update the local state to reflect the change
      setContracts(contracts.map(contract => 
        contract.id === contractId ? { ...contract, paid_amount: paymentAmount } : contract
      ));
      toast({
        title: "Payment Made",
        description: `Payment of ₹${(paymentAmount - currentPaid).toLocaleString('en-IN')} processed successfully`,
      });
    }
  };

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
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                My Contracts
              </Button>
              <Link to="/buyer/payments">
                <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                  Payments
                </Button>
              </Link>
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
                  My Contracts
                </h1>
              </div>
            </div>
          </header>

          {/* Contracts content */}
          <main className="flex-1 p-6 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>Contracts</CardTitle>
                <CardDescription>
                  Manage your ongoing procurement contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingContracts ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
                  </div>
                ) : contracts.length > 0 ? (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-harvest-dark">
                              {contract.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {contract.crop_name} - {contract.quantity} {contract.unit} - Due by {new Date(contract.end_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm mt-1">
                              Farmer: {contract.profiles?.full_name || 'Unknown Farmer'}
                            </p>
                            <p className="text-sm font-medium mt-2">
                              Price: ₹{parseFloat(contract.price_per_unit).toLocaleString('en-IN')} per {contract.unit}
                            </p>
                            <p className="text-sm mt-1">
                              Total Value: ₹{parseFloat(contract.total_value).toLocaleString('en-IN')}
                            </p>
                            <p className="text-sm mt-1">
                              Payment Made: ₹{parseFloat(contract.paid_amount || 0).toLocaleString('en-IN')} 
                              ({Math.round(((contract.paid_amount || 0) / contract.total_value) * 100)}%)
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(contract.status)}
                            <div className="flex flex-col gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUpdateStatus(contract.id, contract.status === 'active' ? 'completed' : 'active')}
                                disabled={contract.status === 'cancelled'}
                              >
                                {contract.status === 'active' ? 'Mark Complete' : 'Mark Active'}
                              </Button>
                              {contract.status === 'active' && (contract.paid_amount || 0) < contract.total_value && (
                                <Button 
                                  size="sm"
                                  className="bg-harvest-primary"
                                  onClick={() => handleMakePayment(contract.id, contract.paid_amount || 0, contract.total_value)}
                                >
                                  Make Payment
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completion</span>
                            <span>{contract.progress || 0}%</span>
                          </div>
                          <Progress value={contract.progress || 0} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any contracts yet.</p>
                    <Button className="bg-harvest-primary">Create New Contract</Button>
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
