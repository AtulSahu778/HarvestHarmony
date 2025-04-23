
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useContracts() {
  const [isLoading, setIsLoading] = useState(false);

  const createContract = async (contractData: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contracts")
        .insert([contractData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Contract created",
        description: "Your contract has been created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create contract",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContractStatus = async (contractId: string, status: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contracts")
        .update({ status })
        .eq("id", contractId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Contract updated",
        description: `Contract status updated to ${status}`,
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update contract",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContractProgress = async (contractId: string, progress: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contracts")
        .update({ progress })
        .eq("id", contractId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Progress updated",
        description: `Contract progress updated to ${progress}%`,
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update progress",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentAmount = async (contractId: string, paidAmount: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contracts")
        .update({ paid_amount: paidAmount })
        .eq("id", contractId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Payment recorded",
        description: `Payment recorded successfully`,
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to record payment",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createContract,
    updateContractStatus,
    updateContractProgress,
    updatePaymentAmount,
  };
}
