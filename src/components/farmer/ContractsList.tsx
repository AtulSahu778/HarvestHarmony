
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContractsListProps {
  contracts: any[];
  loadingContracts: boolean;
  handleUpdateStatus: (contractId: string, newStatus: string) => Promise<void>;
  handleUpdateProgress: (contractId: string, newProgress: number) => Promise<void>;
}

export default function ContractsList({
  contracts,
  loadingContracts,
  handleUpdateStatus,
  handleUpdateProgress,
}: ContractsListProps) {
  const isMobile = useIsMobile();
  
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Active Contracts</CardTitle>
        <CardDescription className="text-sm">
          Manage your ongoing farming contracts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingContracts ? (
          <div className="flex justify-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
          </div>
        ) : contracts.length > 0 ? (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
                <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-start'}`}>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-harvest-dark mr-2">
                        {contract.title}
                      </h3>
                      {isMobile && getStatusBadge(contract.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {contract.crop_name} - {contract.quantity} {contract.unit} - Due by {new Date(contract.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      Price: ₹{parseFloat(contract.price_per_unit).toLocaleString('en-IN')} per {contract.unit}
                    </p>
                    <p className="text-sm mt-1">
                      Total Value: ₹{parseFloat(contract.total_value).toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm mt-1">
                      Payment Received: ₹{parseFloat(contract.paid_amount || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`${isMobile ? 'w-full' : 'flex flex-col items-end gap-2'}`}>
                    {!isMobile && getStatusBadge(contract.status)}
                    <div className={`${isMobile ? 'flex justify-between mt-2' : 'flex gap-2 mt-2'}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateStatus(contract.id, contract.status === 'active' ? 'completed' : 'active')}
                        disabled={contract.status === 'cancelled'}
                      >
                        {contract.status === 'active' ? 'Mark Complete' : 'Mark Active'}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <Progress value={contract.progress} />
                  <div className="flex justify-between mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUpdateProgress(contract.id, Math.max(0, (contract.progress || 0) - 10))}
                      disabled={contract.progress <= 0}
                    >
                      -10%
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUpdateProgress(contract.id, Math.min(100, (contract.progress || 0) + 10))}
                      disabled={contract.progress >= 100}
                    >
                      +10%
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-500 text-sm md:text-base mb-4">You don't have any contracts yet.</p>
            <Button className="bg-harvest-primary">Browse Opportunities</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
