import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContractDetail from "@/components/contract/ContractDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContractForm from "@/components/contract/ContractForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";

export default function ContractPage() {
  const { id, mode = "view" } = useParams();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && mode === "view") {
      fetchContract(id);
    } else {
      setLoading(false);
    }
  }, [id, mode]);

  const fetchContract = async (contractId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          farmerProfile:profiles!farmer_id(*),
          buyerProfile:profiles!buyer_id(*)
        `)
        .eq("id", contractId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const formattedContract = {
          id: data.id,
          title: data.title,
          status: data.status,
          farmer: {
            name: data.farmerProfile.full_name,
            location: data.farmerProfile.location || "Location not provided",
          },
          buyer: {
            name: data.buyerProfile.full_name,
            company: data.buyerProfile.business_name || data.buyerProfile.full_name,
          },
          crop: {
            type: data.crop_name,
            quantity: data.quantity,
            unit: data.unit,
          },
          dates: {
            created: new Date(data.created_at).toLocaleDateString(),
            start: new Date(data.start_date).toLocaleDateString(),
            end: new Date(data.end_date).toLocaleDateString(),
          },
          financials: {
            pricePerUnit: data.price_per_unit,
            totalValue: data.total_value,
            paidAmount: data.paid_amount,
            currency: "$",
          },
          progress: data.progress,
          rawData: data,
        };

        setContract(formattedContract);
      }
    } catch (error: any) {
      console.error("Error fetching contract:", error.message);
      toast({
        title: "Error",
        description: "Failed to load contract details",
        variant: "destructive",
      });
      navigate("/farmer/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harvest-primary"></div>
              </div>
            ) : mode === "view" && contract ? (
              <>
                <h1 className="text-3xl font-bold text-harvest-dark mb-8">
                  Contract Details
                </h1>
                <ContractDetail {...contract} />
              </>
            ) : mode === "create" ? (
              <>
                <h1 className="text-3xl font-bold text-harvest-dark mb-8">
                  Create New Contract
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Tabs defaultValue="details" className="space-y-6">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="details">Contract Details</TabsTrigger>
                      <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                      <TabsTrigger value="review">Review & Sign</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <ContractForm farmerId={id} />
                    </TabsContent>
                    <TabsContent value="terms">
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          Terms & Conditions form would appear here
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="review">
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          Contract review and signing interface would appear here
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Contract not found</p>
                <Button 
                  className="bg-harvest-primary"
                  onClick={() => navigate(profile?.user_type === "farmer" ? "/farmer/dashboard" : "/buyer/dashboard")}
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
