
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading, user, profile } = useAuth();
  const [userType, setUserType] = useState<"farmer" | "buyer">("farmer");
  const [loginError, setLoginError] = useState<string | null>(null);

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user && profile) {
      navigate(`/${profile.user_type}/dashboard`);
    }
  }, [user, profile, navigate]);

  const handleLogin = async (values: Record<string, string>) => {
    setLoginError(null);
    const { error } = await signIn(values.email, values.password);
    
    if (error) {
      // Error is already displayed via toast, but we'll set it here for the form as well
      if (error.message.includes("Invalid login")) {
        setLoginError("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setLoginError("Please verify your email before logging in.");
      } else {
        setLoginError(error.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="container py-16 px-4 md:px-6 flex flex-col items-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-harvest-dark">Sign In</h1>
            <p className="mt-2 text-gray-600">
              Welcome back to Harvest Harmony Connect
            </p>
          </div>
          
          <Tabs defaultValue="farmer" className="w-full" onValueChange={(value) => setUserType(value as "farmer" | "buyer")}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
              <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
            </TabsList>
            <TabsContent value="farmer">
              <AuthForm 
                formType="login" 
                userType="farmer" 
                onSubmit={handleLogin}
                loading={isLoading}
                error={loginError}
              />
            </TabsContent>
            <TabsContent value="buyer">
              <AuthForm 
                formType="login" 
                userType="buyer" 
                onSubmit={handleLogin}
                loading={isLoading}
                error={loginError}
              />
            </TabsContent>
          </Tabs>
          
          {/* Add a note about email verification */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>For testing purposes: If you've registered but can't log in, you may need to verify your email first.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
