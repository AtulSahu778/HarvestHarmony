
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatsOverviewProps {
  activeContractsCount: number;
  totalContracts: number;
  pendingPayments: number;
  pendingPaymentsCount: number;
  cropListingsCount: number;
  totalContractValue: number;
}

export default function StatsOverview({
  activeContractsCount,
  totalContracts,
  pendingPayments,
  pendingPaymentsCount,
  cropListingsCount,
  totalContractValue,
}: StatsOverviewProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid gap-4 md:gap-6 mb-6 md:mb-8 grid-cols-2 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-1 md:pb-2">
          <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate">
            Active Contracts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">{activeContractsCount}</div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Total contracts: {totalContracts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-1 md:pb-2">
          <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate">
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold truncate">
            ₹{isMobile && pendingPayments > 100000 
              ? `${(pendingPayments / 100000).toFixed(1)}L` 
              : pendingPayments.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Across {pendingPaymentsCount} contracts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-1 md:pb-2">
          <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate">
            Crop Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">{cropListingsCount}</div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Active listings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-1 md:pb-2">
          <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate">
            Total Contract Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold truncate">
            ₹{isMobile && totalContractValue > 100000 
              ? `${(totalContractValue / 100000).toFixed(1)}L` 
              : totalContractValue.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Lifetime value
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
