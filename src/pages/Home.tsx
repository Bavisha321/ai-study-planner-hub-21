
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const studyPlans = [
    {
      title: "Final Exam Preparation",
      description: "Intensive study plan to prepare for upcoming final exams",
      duration: "27/3/2025 - 26/4/2025",
      sessions: 4,
      courses: ["Machine Learning Fundamentals", "Advanced Calculus", "Web Development Basics"]
    },
    {
      title: "Summer Learning Project",
      description: "Self-paced learning plan for the summer break",
      duration: "11/5/2025 - 25/6/2025",
      sessions: 0,
      courses: ["Machine Learning Fundamentals", "Web Development Basics"]
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
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Study Planner</h1>
              <p className="text-muted-foreground mt-1">Create and manage your study plans</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <span className="hidden sm:inline">AI Planner</span>
              </Button>
              <Button className="flex items-center gap-2">
                Create Plan
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {studyPlans.map((plan, index) => (
              <Card key={index} className="overflow-hidden border border-border/50">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Sessions</p>
                      <p className="font-medium">{plan.sessions}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Courses</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.courses.map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="font-normal">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    View Schedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              className="px-8 py-6 bg-primary text-primary-foreground rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md"
              onClick={() => setIsLoading(true)}
              disabled={isLoading}
              size="lg"
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
                "Create New Plan"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
