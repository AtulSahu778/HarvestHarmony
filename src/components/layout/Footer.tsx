
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-harvest-dark text-white">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-harvest-primary">
                <span className="text-white font-bold text-sm">HH</span>
              </div>
              <span className="font-bold text-xl">
                Harvest<span className="text-harvest-secondary">Harmony</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting farmers and buyers through secure, transparent contract farming.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-harvest-secondary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-harvest-secondary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-harvest-secondary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-harvest-secondary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-harvest-secondary mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/farmers" className="text-gray-300 hover:text-white">For Farmers</Link>
              </li>
              <li>
                <Link to="/buyers" className="text-gray-300 hover:text-white">For Buyers</Link>
              </li>
              <li>
                <Link to="/contract-management" className="text-gray-300 hover:text-white">Contract Management</Link>
              </li>
              <li>
                <Link to="/secure-payments" className="text-gray-300 hover:text-white">Secure Payments</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-harvest-secondary mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-300 hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white">Community</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-harvest-secondary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-300 hover:text-white">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/dispute-resolution" className="text-gray-300 hover:text-white">Dispute Resolution</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {currentYear} Harvest Harmony Connect. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
