
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}

const ReportSection = ({ title, icon: Icon, children, delay = 0 }: ReportSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-12"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportSection;
