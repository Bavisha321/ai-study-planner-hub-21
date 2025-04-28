
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TitleSection = () => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Personalized Learning Study Planner</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        A comprehensive report on our AI-driven study planning system
      </p>
      <p className="mt-4 text-muted-foreground">
        Prepared by: Research Team<br />
        Date: April 2025
      </p>
    </motion.div>
  );
};

export default TitleSection;
