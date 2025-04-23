
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Shield, Leaf, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-harvest-light to-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block rounded-full bg-harvest-muted px-3 py-1 text-sm font-semibold text-harvest-primary">
              Contract Farming Simplified
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-harvest-dark">
              Growing Together, <span className="text-harvest-primary">Prospering Together</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Secure, transparent contract farming that connects farmers directly with buyers—ensuring fair prices, reliable deliveries, and trusted partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-harvest-primary hover:bg-harvest-accent" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-harvest-primary" />
                <span className="text-sm font-medium">Verified Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-harvest-primary" />
                <span className="text-sm font-medium">Secure Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-harvest-primary" />
                <span className="text-sm font-medium">Direct Negotiation</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-harvest-primary" />
                <span className="text-sm font-medium">Sustainable Farming</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl animate-slide-in">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop" 
                alt="Farmers and buyers working together" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-slide-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-harvest-muted flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-harvest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-harvest-dark">Contract Success</h3>
                  <p className="text-sm text-gray-600">Over 10,000 successful contracts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
