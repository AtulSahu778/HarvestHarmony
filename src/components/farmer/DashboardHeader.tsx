
import { Bell, MessageSquare, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardHeader() {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 bg-white border-b shadow-sm z-20">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Link to="/">
                <Button variant="ghost" size="icon" className="mr-2">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-harvest-dark truncate">
              Farmer Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/messages">
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
