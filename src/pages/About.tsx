import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, Calendar, Clock, LineChart, BookOpen, CheckCircle, Star, FileChart } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "AI-Powered Learning",
      description: "Our platform utilizes advanced artificial intelligence to analyze your learning patterns and preferences, creating truly personalized study plans.",
      icon: <Star className="h-10 w-10 text-primary" />,
    },
    {
      title: "Adaptive Scheduling",
      description: "The system adapts to your pace, adjusting schedules based on your progress, comprehension level, and available study time.",
      icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
      title: "Diverse Learning Resources",
      description: "Access a wide range of carefully curated resources including articles, videos, interactive exercises, and quizzes tailored to your learning style.",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with detailed analytics and insights, helping you stay motivated and on track to achieve your learning goals.",
      icon: <LineChart className="h-10 w-10 text-primary" />,
    }
  ];

  const howToUse = [
    {
      step: 1,
      title: "Create Your Study Plan",
      description: "Select your subjects, topics, and set your learning goals to receive a personalized study plan.",
      icon: <Bookmark className="h-8 w-8 text-primary" />,
    },
    {
      step: 2,
      title: "Schedule Study Sessions",
      description: "Allocate time for each topic based on your availability and learning priorities.",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      step: 3,
      title: "Track Your Progress",
      description: "Complete sessions and mark topics as understood to update your progress.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
    {
      step: 4,
      title: "Review and Adjust",
      description: "The system will adapt your plan based on your progress and feedback.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
    }
  ];

  const handleContinue = () => {
    // Mark that the user has seen the about page
    localStorage.setItem('hasSeenAbout', 'true');
    navigate('/home');
  };

  const handleViewReport = () => {
    navigate('/reports');
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Your Study Planner</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our innovative study planner combines artificial intelligence with proven learning methodologies to create a personalized educational experience. By analyzing your learning patterns, preferences, and schedule, the system develops tailored study plans that adapt in real-time to your progress. Through intelligent algorithms, it optimizes your study sessions, suggests effective learning resources, and provides data-driven insights to enhance your academic performance. This comprehensive approach ensures efficient time management, improved retention, and measurable progress towards your educational goals.
            </p>
          </motion.div>

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">How to Use Your Study Planner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howToUse.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 border border-border/50 rounded-lg neo-morphism relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="my-16" />

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 border border-border/50 rounded-lg neo-morphism flex items-start gap-4"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Your personalized study journey awaits. Click below to continue to your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleContinue}
                size="lg" 
                className="px-8 py-6 text-lg group"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                onClick={handleViewReport}
                variant="outline"
                size="lg" 
                className="px-8 py-6 text-lg group"
              >
                <FileChart className="mr-2 h-5 w-5" />
                View Research Report
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
