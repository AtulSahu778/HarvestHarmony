
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Download, MessageSquare, AlertCircle } from "lucide-react";

type ContractStatus = "pending" | "active" | "completed" | "cancelled";

type ContractDetailProps = {
  id: string;
  title: string;
  status: ContractStatus;
  farmer: {
    name: string;
    location: string;
  };
  buyer: {
    name: string;
    company: string;
  };
  crop: {
    type: string;
    quantity: number;
    unit: string;
  };
  dates: {
    created: string;
    start: string;
    end: string;
  };
  financials: {
    pricePerUnit: number;
    totalValue: number;
    paidAmount: number;
    currency: string;
  };
  progress: number;
};

export default function ContractDetail({
  id,
  title,
  status,
  farmer,
  buyer,
  crop,
  dates,
  financials,
  progress,
}: ContractDetailProps) {
  // Helper function to render status badge with appropriate color
  const renderStatusBadge = (status: ContractStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-harvest-dark">
              {title}
            </CardTitle>
            <CardDescription>Contract ID: {id}</CardDescription>
          </div>
          {renderStatusBadge(status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parties Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-harvest-dark">Parties</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Farmer</p>
                <p className="font-medium">{farmer.name}</p>
                <p className="text-sm text-gray-600">{farmer.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Buyer</p>
                <p className="font-medium">{buyer.name}</p>
                <p className="text-sm text-gray-600">{buyer.company}</p>
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-harvest-dark">Contract Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Crop</p>
                <p>
                  {crop.type} - {crop.quantity} {crop.unit}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Timeline</p>
                <p>
                  {dates.start} to {dates.end}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created On</p>
                <p>{dates.created}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Financials */}
        <div className="space-y-4">
          <h3 className="font-semibold text-harvest-dark">Financial Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Price per Unit</p>
              <p className="text-xl font-semibold">
                {financials.currency} {financials.pricePerUnit}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-xl font-semibold">
                {financials.currency} {financials.totalValue}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Paid Amount</p>
              <p className="text-xl font-semibold">
                {financials.currency} {financials.paidAmount}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-harvest-dark">Contract Progress</h3>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3" /> Contract signed
            </div>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3" /> Initial payment
            </div>
            <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              Production in progress
            </div>
            <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              Quality check
            </div>
            <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              Delivery
            </div>
            <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              Final payment
            </div>
          </div>
        </div>

        {/* Alerts/Notices */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800">Payment Due Reminder</p>
            <p className="text-sm text-amber-700">
              The next milestone payment of {financials.currency} 2,500 is due on July 15, 2025.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-3 border-t pt-6">
        <div className="flex gap-2">
          <Button className="bg-harvest-primary hover:bg-harvest-accent">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Contract
          </Button>
        </div>
        <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
          Report Issue
        </Button>
      </CardFooter>
    </Card>
  );
}
