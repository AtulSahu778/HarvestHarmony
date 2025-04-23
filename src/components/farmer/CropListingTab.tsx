import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import AddCropForm from "./AddCropForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface CropListingTabProps {
  cropListings: any[];
  loadingCrops: boolean;
  handleDeleteCropListing: (cropId: string) => Promise<void>;
  handleAddCropListing: (cropData: any) => Promise<void>;
}

export default function CropListingTab({
  cropListings,
  loadingCrops,
  handleDeleteCropListing,
  handleAddCropListing,
}: CropListingTabProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader>
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-center'}`}>
          <div>
            <CardTitle className="text-lg md:text-xl">My Crop Listings</CardTitle>
            <CardDescription className="text-sm">
              Manage crops you've listed for contract farming
            </CardDescription>
          </div>
          <AddCropForm onSuccess={(cropData) => {
            handleAddCropListing(cropData);
          }} />
        </div>
      </CardHeader>
      <CardContent>
        {loadingCrops ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
          </div>
        ) : cropListings.length > 0 ? (
          <div className="space-y-4">
            {cropListings.map((crop) => (
              <div key={crop.id} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
                <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-start'}`}>
                  <div>
                    <h3 className="font-medium text-harvest-dark">{crop.crop_name}</h3>
                    <p className="text-sm text-gray-500">
                      {crop.quantity} {crop.unit} at ₹{parseFloat(crop.price_per_unit).toLocaleString('en-IN')} per {crop.unit}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Available: {new Date(crop.available_from).toLocaleDateString()} - {new Date(crop.available_until).toLocaleDateString()}
                    </p>
                    {crop.location && (
                      <p className="text-xs text-gray-500 mt-1">
                        Location: {crop.location}
                      </p>
                    )}
                  </div>
                  <div className={`flex ${isMobile ? 'justify-between mt-2' : 'flex-col items-end gap-2'}`}>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50" 
                      onClick={() => handleDeleteCropListing(crop.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {crop.description && (
                  <p className="text-sm text-gray-600 mt-2">{crop.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-500 text-sm md:text-base mb-4">You haven't listed any crops yet.</p>
            <Button className="bg-harvest-primary">
              <Plus className="h-4 w-4 mr-1" /> Add Your First Crop
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
