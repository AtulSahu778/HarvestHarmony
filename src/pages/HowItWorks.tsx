
import Layout from "@/components/layout/Layout";

export default function HowItWorks() {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">How It Works</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-harvest-primary">For Farmers</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-primary">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Register</h3>
                  <p className="text-gray-600 text-center">Create your account as a farmer and set up your profile.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-primary">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">List Crops</h3>
                  <p className="text-gray-600 text-center">Add your available produce with details and pricing.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-primary/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-primary">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Connect with Buyers</h3>
                  <p className="text-gray-600 text-center">Negotiate contracts and build direct relationships.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-harvest-accent">For Buyers</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-accent">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Register</h3>
                  <p className="text-gray-600 text-center">Create your account as a buyer and set your preferences.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-accent">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Browse Listings</h3>
                  <p className="text-gray-600 text-center">Find local produce that meets your needs and standards.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-harvest-accent/10 flex items-center justify-center">
                      <span className="font-bold text-harvest-accent">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Make Contracts</h3>
                  <p className="text-gray-600 text-center">Establish direct relationships with local farmers.</p>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Platform Features</h2>
              <ul className="space-y-4 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span>Direct communication between farmers and buyers</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span>Secure contract creation and management</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span>Transparent pricing and quality standards</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span>Logistics coordination and delivery tracking</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
