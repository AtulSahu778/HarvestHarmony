
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FarmersPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">For Farmers</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-harvest-primary">Grow Your Business</h2>
              <p className="text-gray-700 mb-6">
                HarvestHarmony connects small to medium-sized farms directly with buyers, 
                eliminating middlemen and increasing your profits. Our platform helps you 
                expand your customer base while maintaining control over your pricing and production.
              </p>
              <Button className="bg-harvest-primary hover:bg-harvest-accent" size="lg" asChild>
                <Link to="/register">Join as a Farmer</Link>
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Farmer in field" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Key Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-primary">Higher Profits</h3>
                <p className="text-gray-600">
                  Sell directly to buyers and keep more of your earnings by eliminating intermediaries.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-primary">Reliable Contracts</h3>
                <p className="text-gray-600">
                  Create secure contracts with buyers for consistent sales and stable income.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-3 text-harvest-primary">Market Insights</h3>
                <p className="text-gray-600">
                  Access data about market trends and buyer preferences to make informed decisions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <ol className="space-y-6">
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-primary">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Create Your Account</h3>
                  <p className="text-gray-600">
                    Register as a farmer and build your profile with your farm details, 
                    growing practices, and certifications.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-primary">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">List Your Crops</h3>
                  <p className="text-gray-600">
                    Add your available produce with details about quantity, quality, 
                    pricing, and harvest times.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-primary">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Receive Inquiries</h3>
                  <p className="text-gray-600">
                    Buyers interested in your produce will reach out through our 
                    messaging system to discuss details.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                    <span className="font-bold text-harvest-primary">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Create Contracts</h3>
                  <p className="text-gray-600">
                    Establish terms with buyers through our secure contract system, 
                    ensuring clear expectations for both parties.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to Transform Your Farm Business?</h2>
            <Button className="bg-harvest-primary hover:bg-harvest-accent" size="lg" asChild>
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
