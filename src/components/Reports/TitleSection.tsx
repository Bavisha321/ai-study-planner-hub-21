
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface TitleSectionProps {
  title?: string;
  subtitle?: string;
  preparedBy?: string;
  date?: string;
  icon?: React.ReactNode;
}

const TitleSection = ({ 
  title = "AI-Powered Personalized Learning Study Planner", 
  subtitle = "A comprehensive report on our AI-driven study planning system",
  preparedBy = "Research Team",
  date = "April 2025",
  icon = <FileText className="h-10 w-10 text-primary mx-auto mb-4" />
}: TitleSectionProps) => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        {subtitle}
      </p>
      <p className="mt-4 text-muted-foreground">
        Prepared by: {preparedBy}<br />
        Date: {date}
      </p>
    </motion.div>
  );
};

export default TitleSection;
