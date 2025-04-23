
import { CheckCircle, FileText, Handshake, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-harvest-dark mb-4">
            How Harvest Harmony Works
          </h2>
          <p className="text-gray-600">
            Our platform simplifies the contract farming process, creating trust and transparency between farmers and buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-harvest-light rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-harvest-primary rounded-full text-white mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-harvest-dark">Create Profile</h3>
            <p className="text-gray-600">
              Sign up as a farmer or buyer and complete your verification process to build trust.
            </p>
            <div className="mt-4 text-harvest-primary font-medium">Step 1</div>
          </div>

          <div className="bg-harvest-light rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-harvest-primary rounded-full text-white mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-harvest-dark">List or Browse</h3>
            <p className="text-gray-600">
              Farmers list crops or buyers post requirements with detailed specifications.
            </p>
            <div className="mt-4 text-harvest-primary font-medium">Step 2</div>
          </div>

          <div className="bg-harvest-light rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-harvest-primary rounded-full text-white mb-4">
              <Handshake className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-harvest-dark">Negotiate & Contract</h3>
            <p className="text-gray-600">
              Communicate directly and create secure, transparent farming contracts.
            </p>
            <div className="mt-4 text-harvest-primary font-medium">Step 3</div>
          </div>

          <div className="bg-harvest-light rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-harvest-primary rounded-full text-white mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-harvest-dark">Fulfill & Grow</h3>
            <p className="text-gray-600">
              Track progress, make secure payments, and build lasting business relationships.
            </p>
            <div className="mt-4 text-harvest-primary font-medium">Step 4</div>
          </div>
        </div>
      </div>
    </section>
  );
}
