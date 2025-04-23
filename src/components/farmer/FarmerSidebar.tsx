
import { Button } from "@/components/ui/button";
import { Home, FileText, CircleDollarSign, Calendar, MessageSquare, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface FarmerSidebarProps {
  activeSidebar: boolean;
}

export default function FarmerSidebar({ activeSidebar }: FarmerSidebarProps) {
  const { profile, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div
      className={`${
        activeSidebar ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed inset-y-0 left-0 z-[60] w-64 transform transition-transform duration-200 ease-in-out bg-white border-r shadow-sm lg:static lg:z-auto`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-harvest-primary">
              <span className="text-white font-bold text-sm">HH</span>
            </div>
            <a href="https://harvest-harmony-connect.vercel.app/">
            <span className="font-bold text-xl text-harvest-dark">
              Harvest<span className="text-harvest-primary">Harmony</span>
            </span>
            </a>
          </div>
        </div>
        <div className="px-4 py-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-harvest-primary flex items-center justify-center text-white">
              {profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "FP"}
            </div>
            <div>
              <p className="font-medium text-harvest-dark truncate">{profile?.full_name || "Farmer"}</p>
              <p className="text-xs text-gray-500">Verified Farmer</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          <Link to="/farmer/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <Home className="h-5 w-5" /> Dashboard
            </Button>
          </Link>
          <Link to="/farmer/contracts">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <FileText className="h-5 w-5" /> My Contracts
            </Button>
          </Link>
          <Link to="/farmer/payments">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <CircleDollarSign className="h-5 w-5" /> Payments
            </Button>
          </Link>
          <Link to="/farmer/schedule">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <Calendar className="h-5 w-5" /> Schedule
            </Button>
          </Link>
          <Link to="/messages">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <MessageSquare className="h-5 w-5" /> Messages
            </Button>
          </Link>
          <Link to="/farmer/profile">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <User className="h-5 w-5" /> Profile
            </Button>
          </Link>
          <Link to="/farmer/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <Settings className="h-5 w-5" /> Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-normal text-red-600"
            onClick={signOut}
          >
            Log Out
          </Button>
        </nav>
      </div>
    </div>
  );
}
