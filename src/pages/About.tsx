
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Separator } from "@/components/ui/separator";

const About = () => {
  const features = [
    {
      title: "AI-Powered Learning",
      description: "Our platform utilizes advanced artificial intelligence to analyze your learning patterns and preferences, creating truly personalized study plans."
    },
    {
      title: "Adaptive Scheduling",
      description: "The system adapts to your pace, adjusting schedules based on your progress, comprehension level, and available study time."
    },
    {
      title: "Diverse Learning Resources",
      description: "Access a wide range of carefully curated resources including articles, videos, interactive exercises, and quizzes tailored to your learning style."
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with detailed analytics and insights, helping you stay motivated and on track to achieve your learning goals."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      text: "This platform revolutionized my study routine. The personalized schedules and adaptive content helped me improve my exam scores by 20%."
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      text: "As someone learning new programming languages constantly, this platform has been invaluable. It identifies my knowledge gaps and provides targeted resources."
    },
    {
      name: "Emma Rodriguez",
      role: "Language Learner",
      text: "The AI recommendations are spot-on! It's like having a personal tutor who knows exactly what I need to practice next."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Platform</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing education through personalized, AI-driven learning experiences.
            </p>
          </motion.div>

          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              We believe that education should be personalized because every individual has a unique learning style and pace. Our mission is to democratize access to high-quality, personalized education through innovative technology.
            </p>
            <p className="text-lg leading-relaxed">
              By harnessing the power of artificial intelligence, we create dynamic learning experiences that adapt to each student's needs, helping them achieve their goals efficiently and effectively.
            </p>
          </motion.div>

          <Separator className="my-16" />

          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border border-border/50 rounded-lg neo-morphism">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <Separator className="my-16" />

          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 border border-border/50 rounded-lg neo-morphism">
                  <p className="italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of learners who have already enhanced their educational journey with our platform.
            </p>
            <a 
              href="/register" 
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
