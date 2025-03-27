
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      title: "AI-Powered Scheduling",
      description: "Intelligent algorithms create optimized study schedules based on your learning style, availability, and goals.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C14.5 19.5 16 16 16 12C16 8 14.5 4.5 12 2M12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2M2 12C2 6.47715 6.47715 2 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Personalized Content",
      description: "Receive study materials and exercises tailored to your specific learning needs and progress.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6L18.5 8.5M18.5 8.5L21 11M18.5 8.5L16 11M18.5 8.5L21 6M12 11H4M12 16H4M15 22H9C6.17157 22 4.75736 22 3.87868 21.1213C3 20.2426 3 18.8284 3 16V8C3 5.17157 3 3.75736 3.87868 2.87868C4.75736 2 6.17157 2 9 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Progress Analytics",
      description: "Visualize your progress with detailed analytics and insights that help you stay on track.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14L12 9L17 14M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Smart Reminders",
      description: "Never miss a study session with intelligent reminders that adapt to your schedule.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 14.2V9.8C9 9.51997 9 9.37996 9.0545 9.27181C9.10243 9.17564 9.17564 9.10243 9.27181 9.0545C9.37996 9 9.51997 9 9.8 9H14.2C14.48 9 14.62 9 14.7282 9.0545C14.8244 9.10243 14.8976 9.17564 14.9455 9.27181C15 9.37996 15 9.51997 15 9.8V14.2C15 14.48 15 14.62 14.9455 14.7282C14.8976 14.8244 14.8244 14.8976 14.7282 14.9455C14.62 15 14.48 15 14.2 15H9.8C9.51997 15 9.37996 15 9.27181 14.9455C9.17564 14.8976 9.10243 14.8244 9.0545 14.7282C9 14.62 9 14.48 9 14.2ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Your Study Hub</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start creating your personalized study plan and take control of your learning journey.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden border border-border/50 neo-morphism">
                <CardHeader className="pb-2">
                  <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-secondary text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md"
              onClick={() => setIsLoading(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create Your Study Plan"
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
