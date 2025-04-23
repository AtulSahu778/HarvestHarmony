
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useContracts } from "@/hooks/useContracts";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function ContractForm({ farmerId }: { farmerId?: string }) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { profile } = useAuth();
  const { createContract, isLoading } = useContracts();
  const navigate = useNavigate();

  const [contractData, setContractData] = useState({
    title: "",
    crop_name: "",
    quantity: "",
    unit: "tons",
    price_per_unit: "",
    total_value: "",
    quality_parameters: "",
    payment_terms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setContractData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Calculate total value when quantity or price changes
      if (name === 'quantity' || name === 'price_per_unit') {
        const quantity = parseFloat(name === 'quantity' ? value : prev.quantity) || 0;
        const price = parseFloat(name === 'price_per_unit' ? value : prev.price_per_unit) || 0;
        updated.total_value = (quantity * price).toFixed(2);
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || !startDate || !endDate || !farmerId) {
      toast({
        title: "Error",
        description: "Missing required information to create contract",
        variant: "destructive",
      });
      return;
    }

    const newContract = {
      title: contractData.title,
      farmer_id: farmerId,
      buyer_id: profile.id,
      crop_name: contractData.crop_name,
      quantity: parseFloat(contractData.quantity),
      unit: contractData.unit,
      price_per_unit: parseFloat(contractData.price_per_unit),
      total_value: parseFloat(contractData.total_value),
      payment_terms: contractData.payment_terms,
      quality_parameters: contractData.quality_parameters,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      status: "pending",
      progress: 0,
      paid_amount: 0
    };

    const result = await createContract(newContract);
    
    if (result) {
      toast({
        title: "Contract Created",
        description: "Contract has been created and sent to the farmer for review"
      });
      navigate("/buyer/dashboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contractTitle">Contract Title</Label>
        <Input 
          id="contractTitle" 
          name="title"
          value={contractData.title}
          onChange={handleChange}
          placeholder="E.g., Wheat Supply - Summer 2025" 
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => date < (startDate || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cropType">Crop Type</Label>
          <Input 
            id="cropType" 
            name="crop_name"
            value={contractData.crop_name}
            onChange={handleChange}
            placeholder="E.g., Wheat, Rice, Vegetables" 
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              name="quantity"
              value={contractData.quantity}
              onChange={handleChange}
              type="number" 
              min="0"
              step="0.01"
              placeholder="E.g., 10" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <select
              id="unit"
              name="unit"
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
              value={contractData.unit}
              onChange={(e) => setContractData({...contractData, unit: e.target.value})}
              required
            >
              <option value="tons">Tons</option>
              <option value="kg">Kilograms</option>
              <option value="quintals">Quintals</option>
              <option value="boxes">Boxes</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pricePerUnit">Price per {contractData.unit} (USD)</Label>
          <Input 
            id="pricePerUnit" 
            name="price_per_unit"
            value={contractData.price_per_unit}
            onChange={handleChange}
            type="number" 
            min="0"
            step="0.01"
            placeholder="E.g., 500" 
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="totalValue">Total Contract Value (USD)</Label>
          <Input 
            id="totalValue" 
            name="total_value"
            value={contractData.total_value}
            type="number" 
            disabled
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="qualityParameters">Quality Parameters</Label>
        <Textarea 
          id="qualityParameters" 
          name="quality_parameters"
          value={contractData.quality_parameters}
          onChange={handleChange}
          placeholder="Describe the quality standards required for the crop" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="paymentTerms">Payment Terms</Label>
        <Textarea 
          id="paymentTerms" 
          name="payment_terms"
          value={contractData.payment_terms}
          onChange={handleChange}
          placeholder="Describe payment schedule, methods, and conditions" 
        />
      </div>
      
      <div className="pt-4 flex gap-4">
        <Button 
          onClick={handleSubmit}
          className="bg-harvest-primary hover:bg-harvest-accent"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Contract"}
        </Button>
        <Button variant="outline">Save as Draft</Button>
      </div>
    </div>
  );
}
