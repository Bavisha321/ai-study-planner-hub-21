
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CertificateSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Certificate</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none text-center">
          <p>
            This is to certify that the report entitled "AI-Powered Personalized Learning Study Planner" 
            represents original research conducted by our team. All sources used have been properly cited 
            and acknowledged.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificateSection;
