
import Layout from "@/components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About HarvestHarmony</h1>
          
          <div className="mb-16">
            <div className="relative rounded-lg overflow-hidden mb-8 h-80">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Farm landscape" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-harvest-primary/60 to-transparent flex items-end p-8">
                <h2 className="text-3xl font-bold text-white">Connecting Farms to Tables</h2>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-4">
              HarvestHarmony was founded in 2025 with a simple mission: to create a more sustainable and 
              equitable food system by connecting local farmers directly with buyers.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our platform eliminates unnecessary middlemen, ensuring farmers receive fair prices for their 
              produce while buyers get access to the freshest local ingredients.
            </p>
            <p className="text-lg text-gray-700">
              We believe that by shortening supply chains and facilitating direct relationships between 
              growers and buyers, we can contribute to more resilient local economies and reduce the 
              environmental impact of our food system.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-harvest-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-harvest-primary">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to promoting sustainable agricultural practices and reducing food miles 
                  to minimize environmental impact.
                </p>
              </div>
              <div className="bg-harvest-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-harvest-primary">Transparency</h3>
                <p className="text-gray-700">
                  We believe in complete transparency throughout the food supply chain, from farm practices 
                  to pricing structures.
                </p>
              </div>
              <div className="bg-harvest-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-harvest-primary">Community</h3>
                <p className="text-gray-700">
                  We're building a community that supports local agriculture and strengthens connections 
                  between food producers and consumers.
                </p>
              </div>
            </div>
          </div>
          
          
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-harvest-primary mb-2">100+</p>
                <p className="text-xl">Local Farms Supported</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-harvest-primary mb-2">50+</p>
                <p className="text-xl">Restaurants & Retailers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-harvest-primary mb-2">30%</p>
                <p className="text-xl">Average Increase in Farmer Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
