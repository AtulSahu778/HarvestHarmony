
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useCropListings() {
  const [isLoading, setIsLoading] = useState(false);

  const createCropListing = async (cropData: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("crop_listings")
        .insert([cropData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Crop listing created",
        description: "Your crop listing has been created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create crop listing",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCropListing = async (cropId: string, cropData: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("crop_listings")
        .update(cropData)
        .eq("id", cropId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Crop listing updated",
        description: "Your crop listing has been updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update crop listing",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCropListing = async (cropId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("crop_listings")
        .delete()
        .eq("id", cropId);

      if (error) throw error;

      toast({
        title: "Crop listing deleted",
        description: "Your crop listing has been deleted",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete crop listing",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createCropListing,
    updateCropListing,
    deleteCropListing,
  };
}
