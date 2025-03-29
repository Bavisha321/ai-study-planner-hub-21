
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';

const Index = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in - this is a simple check
    // In a real app, this would be handled by an auth system
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setIsUserLoggedIn(userLoggedIn);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const handleGetStarted = () => {
    if (isUserLoggedIn) {
      navigate('/home');
    } else {
      // Check if user has already visited before
      const hasVisited = localStorage.getItem('hasVisited') === 'true';
      if (hasVisited) {
        navigate('/login');
      } else {
        localStorage.setItem('hasVisited', 'true');
        navigate('/register');
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background -z-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm md:text-base tracking-widest uppercase text-muted-foreground mb-4">
              Elevate Your Learning Experience
            </h2>
          </motion.div>
          
          <motion.h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            AI POWERED <br />
            <span className="text-gradient">PERSONALIZED LEARNING</span> <br />
            STUDY PLANNER
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Optimize your learning journey with personalized study plans, adaptive schedules, and intelligent recommendations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-4"
          >
            <Button 
              onClick={handleGetStarted}
              className="px-8 py-6 bg-primary text-primary-foreground rounded-md font-medium text-lg transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md"
            >
              Get Started
            </Button>
            
            <div className="text-sm text-muted-foreground mt-2">
              {isUserLoggedIn 
                ? "Continue your learning journey" 
                : "New here? Create an account or log in to get started"}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="animate-bounce">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path 
                d="M12 5V19M12 19L19 12M12 19L5 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
