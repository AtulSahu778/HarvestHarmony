
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart4 } from "lucide-react";

interface GenericTabContentProps {
  title: string;
  description: string;
  type: "opportunities" | "analytics";
}

export default function GenericTabContent({
  title,
  description,
  type,
}: GenericTabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {type === "opportunities" ? (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-500 text-sm md:text-base">
              Available contract opportunities will appear here.
            </p>
          </div>
        ) : (
          <div className="h-[200px] md:h-[300px] flex flex-col md:flex-row items-center justify-center border rounded-md p-4">
            <BarChart4 className="h-8 w-8 text-gray-400 mb-2 md:mb-0 md:mr-2" />
            <p className="text-sm md:text-base text-center md:text-left text-gray-500">
              Analytics visualization would appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
