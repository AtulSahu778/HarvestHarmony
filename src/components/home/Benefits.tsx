
import { CircleDollarSign, Shield, BarChart4, MessageSquare, CalendarClock, Award } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-16 bg-harvest-light">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-harvest-dark mb-4">Benefits for Everyone</h2>
          <p className="text-gray-600">
            Our platform creates value for both farmers and buyers, enabling sustainable agricultural partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* For Farmers */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <CircleDollarSign className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Guaranteed Income</h3>
            </div>
            <p className="text-gray-600">
              Secure pre-agreed prices for your crops before planting season begins, reducing market uncertainties.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <Shield className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Protected Agreements</h3>
            </div>
            <p className="text-gray-600">
              Legally-binding digital contracts protect your interests and ensure buyers fulfill their commitments.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <BarChart4 className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Market Access</h3>
            </div>
            <p className="text-gray-600">
              Connect directly with commercial buyers from across the region, expanding your market reach.
            </p>
          </div>

          {/* For Buyers */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <CalendarClock className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Supply Reliability</h3>
            </div>
            <p className="text-gray-600">
              Ensure consistent supply of quality produce with predetermined quantities and delivery schedules.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Direct Communication</h3>
            </div>
            <p className="text-gray-600">
              Bypass middlemen and communicate directly with farmers about quality specifications and requirements.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-harvest-muted p-3 rounded-full">
                <Award className="h-6 w-6 text-harvest-primary" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-harvest-dark">Quality Assurance</h3>
            </div>
            <p className="text-gray-600">
              Set quality standards upfront and verify through our transparent tracking and reporting system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
