import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCropListings } from "@/hooks/useCropListings";
import { useAuth } from "@/contexts/AuthContext";

interface AddCropFormProps {
  onSuccess?: (cropData: any) => void;
}

export default function AddCropForm({ onSuccess }: AddCropFormProps) {
  const [open, setOpen] = useState(false);
  const { createCropListing, isLoading } = useCropListings();
  const { profile } = useAuth();
  
  const [cropData, setCropData] = useState({
    crop_name: "",
    quantity: "",
    unit: "tons",
    price_per_unit: "",
    location: "",
    description: "",
  });
  
  const [availableFrom, setAvailableFrom] = useState<Date>();
  const [availableUntil, setAvailableUntil] = useState<Date>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCropData({
      ...cropData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || !availableFrom || !availableUntil) {
      return;
    }

    const newListing = {
      ...cropData,
      farmer_id: profile.id,
      quantity: parseFloat(cropData.quantity),
      price_per_unit: parseFloat(cropData.price_per_unit),
      available_from: availableFrom.toISOString().split('T')[0],
      available_until: availableUntil.toISOString().split('T')[0],
      location: cropData.location || profile.location,
    };

    const result = await createCropListing(newListing);
    
    if (result) {
      setOpen(false);
      // Reset form
      setCropData({
        crop_name: "",
        quantity: "",
        unit: "tons",
        price_per_unit: "",
        location: "",
        description: "",
      });
      setAvailableFrom(undefined);
      setAvailableUntil(undefined);
      
      // Call success callback if provided, passing the created crop data
      if (onSuccess) {
        onSuccess(result);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-harvest-primary">
          <Plus className="h-4 w-4 mr-1" /> Add Crop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Crop Listing</DialogTitle>
          <DialogDescription>
            Add details about your crop for potential buyers to see.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="crop_name">Crop Name</Label>
            <Input 
              id="crop_name"
              name="crop_name"
              value={cropData.crop_name}
              onChange={handleChange}
              placeholder="e.g., Wheat, Rice, Tomatoes"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="0.01"
                value={cropData.quantity}
                onChange={handleChange}
                placeholder="e.g., 50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                name="unit"
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={cropData.unit}
                onChange={(e) => setCropData({...cropData, unit: e.target.value})}
                required
              >
                <option value="tons">Tons</option>
                <option value="kg">Kilograms</option>
                <option value="quintals">Quintals</option>
                <option value="boxes">Boxes</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price_per_unit">Price per {cropData.unit} (Rs.)</Label>
            <Input 
              id="price_per_unit"
              name="price_per_unit"
              type="number"
              min="0"
              step="0.01"
              value={cropData.price_per_unit}
              onChange={handleChange}
              placeholder="e.g., 500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Available From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !availableFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {availableFrom ? format(availableFrom, "PP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={availableFrom}
                    onSelect={setAvailableFrom}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Available Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !availableUntil && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {availableUntil ? format(availableUntil, "PP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={availableUntil}
                    onSelect={setAvailableUntil}
                    initialFocus
                    disabled={(date) => date < (availableFrom || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input 
              id="location"
              name="location"
              value={cropData.location}
              onChange={handleChange}
              placeholder="e.g., Punjab, India"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description"
              name="description"
              value={cropData.description}
              onChange={handleChange}
              placeholder="Describe your crop quality, certifications, etc."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-harvest-primary"
              disabled={isLoading || !availableFrom || !availableUntil}
            >
              {isLoading ? "Creating..." : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
