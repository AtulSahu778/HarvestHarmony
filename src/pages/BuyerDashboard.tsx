
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart4,
  Calendar,
  CircleDollarSign,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  Bell,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useContracts } from "@/hooks/useContracts";

export default function BuyerDashboard() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile, signOut } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const { updateContractStatus, updatePaymentAmount } = useContracts();

  useEffect(() => {
    // Fetch contracts for the buyer
    async function fetchContracts() {
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
    }

    if (profile?.id) {
      fetchContracts();
    }
  }, [profile?.id]);

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

  // Calculate stats
  const activeContractsCount = contracts.filter(c => c.status === "active").length;
  
  const upcomingPayments = contracts.reduce((total, contract) => {
    if (contract.status === "active") {
      return total + (contract.total_value - (contract.paid_amount || 0));
    }
    return total;
  }, 0);

  const upcomingDeliveries = contracts.filter(c => 
    c.status === "active" && 
    new Date(c.end_date) > new Date() && 
    new Date(c.end_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ).length;

  const deliveriesThisWeek = contracts.filter(c => 
    c.status === "active" && 
    new Date(c.end_date) > new Date() && 
    new Date(c.end_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <ProtectedRoute requiredUserType="buyer">
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Button
            className="rounded-full w-14 h-14 bg-harvest-primary"
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
          } lg:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out bg-white border-r shadow-sm lg:static lg:z-auto`}
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
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <Home className="h-5 w-5" /> Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <FileText className="h-5 w-5" /> Contracts
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <CircleDollarSign className="h-5 w-5" /> Payments
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <Calendar className="h-5 w-5" /> Deliveries
              </Button>
              <Link to="/messages">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 font-normal"
                >
                  <MessageSquare className="h-5 w-5" /> Messages
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <User className="h-5 w-5" /> Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal"
              >
                <Settings className="h-5 w-5" /> Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-normal text-red-600"
                onClick={signOut}
              >
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
                  Buyer Dashboard
                </h1>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Link to="/messages">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Overview section */}
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Contracts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeContractsCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total contracts: {contracts.length}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{upcomingPayments.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due in next 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Procurement Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contracts.filter(c => c.status === "pending").length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Awaiting approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Upcoming Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingDeliveries}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {deliveriesThisWeek} this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main dashboard sections */}
            <Tabs defaultValue="contracts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="procurement">Procurement</TabsTrigger>
                <TabsTrigger value="farmers">Find Farmers</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="contracts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Contracts</CardTitle>
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
              </TabsContent>

              <TabsContent value="procurement" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Procurement Requests</CardTitle>
                        <CardDescription>
                          Manage your procurement requests
                        </CardDescription>
                      </div>
                      <Button className="bg-harvest-primary">
                        <Plus className="h-4 w-4 mr-1" /> New Request
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Sample procurement requests would go here */}
                      <p className="text-gray-500 text-center py-8">
                        Your procurement requests will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="farmers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Find Farmers</CardTitle>
                    <CardDescription>
                      Discover and connect with verified farmers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Sample farmer listings would go here */}
                      <p className="text-gray-500 text-center py-8">
                        Farmer listings will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Procurement Analytics</CardTitle>
                    <CardDescription>
                      Track your procurement performance and metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <BarChart4 className="h-8 w-8 text-gray-400" />
                      <p className="ml-2 text-gray-500">
                        Analytics visualization would appear here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
