
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();
  const [userType, setUserType] = useState<"farmer" | "buyer">("farmer");

  const handleRegister = async (values: Record<string, string>) => {
    if (values.password !== values.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    
    await signUp(values.email, values.password, {
      name: values.name,
      userType: userType
    });
  };

  return (
    <Layout>
      <div className="container py-16 px-4 md:px-6 flex flex-col items-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-harvest-dark">Create an Account</h1>
            <p className="mt-2 text-gray-600">
              Join our community of farmers and buyers
            </p>
          </div>
          
          <Tabs defaultValue="farmer" className="w-full" onValueChange={(value) => setUserType(value as "farmer" | "buyer")}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
              <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
            </TabsList>
            <TabsContent value="farmer">
              <AuthForm 
                formType="register" 
                userType="farmer" 
                onSubmit={handleRegister} 
                loading={isLoading}
              />
            </TabsContent>
            <TabsContent value="buyer">
              <AuthForm 
                formType="register" 
                userType="buyer" 
                onSubmit={handleRegister}
                loading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
