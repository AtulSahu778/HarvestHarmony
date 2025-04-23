
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function BuyersPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">For Buyers</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-harvest-accent">Source Local, Fresh Produce</h2>
              <p className="text-gray-700 mb-6">
                HarvestHarmony connects restaurants, grocery stores, food co-ops, and 
                other buyers directly with local farmers. Access fresh, seasonal produce 
                while supporting local agriculture and reducing your carbon footprint.
              </p>
              <Button className="bg-harvest-accent hover:bg-harvest-primary" size="lg" asChild>
                <Link to="/register">Join as a Buyer</Link>
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Fresh produce" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Key Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-accent">Quality & Freshness</h3>
                <p className="text-gray-600">
                  Access fresher produce with shorter supply chains from farm to table.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-accent">Transparency</h3>
                <p className="text-gray-600">
                  Know exactly where your food comes from and how it was grown.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-accent">Sustainability</h3>
                <p className="text-gray-600">
                  Reduce food miles and support sustainable farming practices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <ol className="space-y-6">
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-accent">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Create Your Account</h3>
                  <p className="text-gray-600">
                    Register as a buyer and tell us about your business needs and preferences.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-accent">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Browse Available Crops</h3>
                  <p className="text-gray-600">
                    Explore listings from farmers in your area filtered by crop type, 
                    growing methods, and availability.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-accent">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Connect With Farmers</h3>
                  <p className="text-gray-600">
                    Message farmers directly to discuss your requirements, pricing, and logistics.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-accent">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Create Contracts</h3>
                  <p className="text-gray-600">
                    Establish clear agreements with farmers for regular supply or one-time purchases.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to Transform Your Sourcing?</h2>
            <Button className="bg-harvest-accent hover:bg-harvest-primary" size="lg" asChild>
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
