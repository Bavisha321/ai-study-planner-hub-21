
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled || !isLanding ? 
          "glass-morphism shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="font-bold text-xl tracking-tight transition-all hover:opacity-80"
        >
          StudyPlanner
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home">Home</NavLink>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2" 
                onClick={handleProfileClick}
                aria-label="Profile"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </>
          )}
          <NavLink to="/about">About</NavLink>
        </div>
        
        <button className="md:hidden text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 rounded-md transition-all font-medium",
        isActive 
          ? "bg-secondary text-foreground" 
          : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
      )}
    >
      {children}
    </Link>
  );
};

export default NavigationBar;
