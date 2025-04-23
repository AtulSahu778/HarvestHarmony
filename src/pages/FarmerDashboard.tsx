
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { toast } from "@/components/ui/use-toast";
import { useContracts } from "@/hooks/useContracts";
import { useCropListings } from "@/hooks/useCropListings";

// Import our new components
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import DashboardHeader from "@/components/farmer/DashboardHeader";
import StatsOverview from "@/components/farmer/StatsOverview";
import ContractsList from "@/components/farmer/ContractsList";
import CropListingTab from "@/components/farmer/CropListingTab";
import GenericTabContent from "@/components/farmer/GenericTabContent";

export default function FarmerDashboard() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const { profile } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [cropListings, setCropListings] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const { updateContractStatus, updateContractProgress } = useContracts();
  const { createCropListing, deleteCropListing } = useCropListings();

  useEffect(() => {
    // Fetch contracts for the farmer
    async function fetchContracts() {
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
    }

    // Fetch crop listings
    async function fetchCropListings() {
      try {
        setLoadingCrops(true);
        const { data, error } = await supabase
          .from("crop_listings")
          .select("*")
          .eq("farmer_id", profile?.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setCropListings(data || []);
      } catch (error: any) {
        console.error("Error fetching crop listings:", error.message);
        toast({
          title: "Error",
          description: "Failed to load crop listings",
          variant: "destructive",
        });
      } finally {
        setLoadingCrops(false);
      }
    }

    if (profile?.id) {
      fetchContracts();
      fetchCropListings();
    }
  }, [profile?.id]);

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

  const handleAddCropListing = async (cropData: any) => {
    if (!profile?.id) return;
    
    const newCrop = {
      farmer_id: profile.id,
      crop_name: cropData.crop_name,
      quantity: cropData.quantity,
      unit: cropData.unit,
      price_per_unit: cropData.price_per_unit,
      available_from: cropData.available_from,
      available_until: cropData.available_until,
      description: cropData.description || '',
      location: cropData.location || '',
    };
    
    const result = await createCropListing(newCrop);
    if (result) {
      setCropListings([result, ...cropListings]);
      toast({
        title: "Crop Added",
        description: "Your crop listing has been created successfully",
      });
    }
  };

  const handleDeleteCropListing = async (cropId: string) => {
    const success = await deleteCropListing(cropId);
    if (success) {
      // Remove the crop from the local state
      setCropListings(cropListings.filter(crop => crop.id !== cropId));
      toast({
        title: "Crop Deleted",
        description: "Your crop listing has been removed",
      });
    }
  };

  // Calculate total values in Indian Rupees
  const totalPendingPayments = contracts.reduce(
    (total, c) => total + (c.total_value - (c.paid_amount || 0)), 
    0
  );

  const totalContractValue = contracts.reduce(
    (total, c) => total + (Number(c.total_value) || 0), 
    0
  );

  const activeContractsCount = contracts.filter(c => c.status === "active").length;
  const pendingPaymentsCount = contracts.filter(c => c.total_value > (c.paid_amount || 0)).length;

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

          {/* Dashboard content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Overview section */}
            <StatsOverview 
              activeContractsCount={activeContractsCount}
              totalContracts={contracts.length}
              pendingPayments={totalPendingPayments}
              pendingPaymentsCount={pendingPaymentsCount}
              cropListingsCount={cropListings.length}
              totalContractValue={totalContractValue}
            />

            {/* Main dashboard sections */}
            <Tabs defaultValue="contracts" className="space-y-4">
              <TabsList className="w-full overflow-x-auto flex no-scrollbar justify-start md:justify-center">
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="crops">My Crops</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="contracts" className="space-y-4">
                <ContractsList 
                  contracts={contracts}
                  loadingContracts={loadingContracts}
                  handleUpdateStatus={handleUpdateStatus}
                  handleUpdateProgress={handleUpdateProgress}
                />
              </TabsContent>

              <TabsContent value="crops" className="space-y-4">
                <CropListingTab
                  cropListings={cropListings}
                  loadingCrops={loadingCrops}
                  handleDeleteCropListing={handleDeleteCropListing}
                  handleAddCropListing={handleAddCropListing}
                />
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <GenericTabContent 
                  title="Contract Opportunities"
                  description="Browse contract opportunities from buyers"
                  type="opportunities"
                />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <GenericTabContent 
                  title="Performance Analytics"
                  description="Track your farming business performance"
                  type="analytics"
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
