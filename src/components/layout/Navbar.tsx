
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Function to check active route
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-harvest-primary">
              <span className="text-white font-bold text-sm">HH</span>
            </div>
            <span className="font-bold text-xl text-harvest-dark hidden md:inline-block">
              Harvest<span className="text-harvest-primary">Harmony</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/') ? 'text-harvest-primary' : ''
                )}
              >
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/how-it-works') ? 'text-harvest-primary' : ''
                )}
              >
                <Link to="/how-it-works">How It Works</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                isActive('/farmers') || isActive('/buyers') ? 'text-harvest-primary' : ''
              )}>
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/farmers" 
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive('/farmers') ? 'bg-accent text-accent-foreground' : ''
                        )}
                      >
                        <div className="text-sm font-medium leading-none">For Farmers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          List your crops and connect with buyers
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/buyers" 
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive('/buyers') ? 'bg-accent text-accent-foreground' : ''
                        )}
                      >
                        <div className="text-sm font-medium leading-none">For Buyers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find and purchase crops directly from farmers
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/about') ? 'text-harvest-primary' : ''
                )}
              >
                <Link to="/about">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/contact') ? 'text-harvest-primary' : ''
                )}
              >
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-1">
              <LogIn className="h-4 w-4 mr-1" /> Login
            </Link>
          </Button>
          <Button className="bg-harvest-primary hover:bg-harvest-accent" size="sm" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu - Fixed positioning and improved z-index */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[100] bg-background pt-16 px-4",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-4 p-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/how-it-works') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            How It Works
          </Link>
          <Link
            to="/farmers"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/farmers') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            For Farmers
          </Link>
          <Link
            to="/buyers"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/buyers') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            For Buyers
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/about') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "py-2 text-lg font-medium",
              isActive('/contact') ? "text-harvest-primary" : "hover:text-harvest-primary"
            )}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" asChild onClick={() => setMobileMenuOpen(false)}>
              <Link to="/login" className="w-full justify-center">
                <LogIn className="h-4 w-4 mr-1" /> Login
              </Link>
            </Button>
            <Button className="bg-harvest-primary hover:bg-harvest-accent" asChild onClick={() => setMobileMenuOpen(false)}>
              <Link to="/register" className="w-full justify-center">
                Register
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
