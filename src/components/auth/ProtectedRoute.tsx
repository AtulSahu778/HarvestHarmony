
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "farmer" | "buyer";
}

export default function ProtectedRoute({ 
  children, 
  requiredUserType 
}: ProtectedRouteProps) {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      // Not logged in, redirect to login
      navigate("/login");
      return;
    }
    
    if (!isLoading && user && profile && requiredUserType && profile.user_type !== requiredUserType) {
      // Wrong user type, redirect to their dashboard
      navigate(`/${profile.user_type}/dashboard`);
    }
  }, [user, profile, isLoading, navigate, requiredUserType]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harvest-primary"></div>
      </div>
    );
  }
  
  // If auth check is done and user is allowed, render children
  if (!isLoading && user && (!requiredUserType || (profile && profile.user_type === requiredUserType))) {
    return <>{children}</>;
  }
  
  // Default loading state (should not reach here often)
  return null;
}
