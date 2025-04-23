
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import DashboardHeader from "@/components/farmer/DashboardHeader";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContracts } from "@/hooks/useContracts";
import ContractsList from "@/components/farmer/ContractsList";

export default function FarmerContractsPage() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const { updateContractStatus, updateContractProgress } = useContracts();

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
        .select("*")
        .eq("farmer_id", profile?.id)
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

  const handleUpdateProgress = async (contractId: string, newProgress: number) => {
    const result = await updateContractProgress(contractId, newProgress);
    if (result) {
      // Update the local state to reflect the change
      setContracts(contracts.map(contract => 
        contract.id === contractId ? { ...contract, progress: newProgress } : contract
      ));
      toast({
        title: "Progress Updated",
        description: `Contract progress updated to ${newProgress}%`,
      });
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

          {/* Contracts content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-harvest-dark">My Contracts</h1>
              <p className="text-gray-500">Manage and track your farming contracts</p>
            </div>

            <ContractsList 
              contracts={contracts}
              loadingContracts={loadingContracts}
              handleUpdateStatus={handleUpdateStatus}
              handleUpdateProgress={handleUpdateProgress}
            />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
