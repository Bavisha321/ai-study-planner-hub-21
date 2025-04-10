
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, BookOpen, Brain, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div 
    className="relative p-6 rounded-xl backdrop-blur-md bg-background/40 border border-primary/10 shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
    <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const Index = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
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

  const features = [
    {
      icon: Brain,
      title: "AI Learning Paths",
      description: "Personalized study plans that adapt to your learning style and pace"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimized study sessions that fit your availability and energy levels"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Tracking",
      description: "Monitor progress across subjects with detailed analytics"
    },
    {
      icon: Sparkles,
      title: "Adaptive Recommendations",
      description: "Get resource suggestions tailored to your learning goals"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-start overflow-hidden">
        {/* Hero section with improved background */}
        <div className="w-full relative h-[85vh] flex flex-col items-center justify-center px-6 md:px-12">
          {/* Enhanced animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-background to-blue-50 -z-10" />
          
          {/* Decorative background patterns */}
          <div className="absolute inset-0 bg-pattern-grid opacity-40 -z-5" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl animate-pulse-soft -z-5" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-100 rounded-full blur-3xl -z-5" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full blur-2xl animate-float -z-5" />
          
          {/* Additional animated elements */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-blue-200 opacity-40 top-1/4 left-1/5"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-purple-200 opacity-30 bottom-1/4 right-1/3"
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="max-w-4xl mx-auto text-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-sm tracking-wider mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Learning Assistant</span>
              </div>
            </motion.div>
            
            <motion.h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400">
                AI POWERED PERSONALIZED LEARNING STUDY PLANNER
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Accelerate your academic success with personalized study plans, intelligent scheduling, 
              and AI recommendations tailored to your unique learning style.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium text-lg transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md flex items-center gap-2 btn-pulse"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/about')}
                className="px-8 py-6 rounded-full font-medium text-lg border-primary/20 hover:bg-primary/5 backdrop-blur-sm glass-morphism"
              >
                Learn More
              </Button>
              
              <div className="hidden sm:block absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary/60"
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features section */}
        <div className="w-full bg-gradient-to-b from-background to-secondary/20 py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Why Choose Our <span className="text-gradient">Study Planner</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                Our AI-powered platform is designed to optimize your learning experience with features 
                that adapt to your unique needs and goals.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>

            <motion.div 
              className={cn(
                "mt-16 text-center",
                "flex flex-col items-center justify-center gap-2"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground mb-4">Ready to transform your learning experience?</p>
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="px-8 py-6 bg-primary text-primary-foreground rounded-full font-medium text-lg"
              >
                Start Your Journey
              </Button>
              
              <div className="text-sm text-muted-foreground mt-2">
                {isUserLoggedIn 
                  ? "Continue your learning journey" 
                  : "New here? Create an account or log in to get started"}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
