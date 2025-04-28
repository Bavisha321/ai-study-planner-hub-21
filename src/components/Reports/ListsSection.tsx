
import { motion } from 'framer-motion';
import { ListOrdered } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListsSection = () => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <ListOrdered className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">List of Figures</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <ul className="list-decimal pl-5 space-y-1">
              <li>Figure 1: AI-Powered Study Planner Model Diagram</li>
              <li>Figure 2: System Architecture</li>
              <li>Figure 3: Machine Learning Workflow</li>
              <li>Figure 4: User Interface Screenshots</li>
              <li>Figure 5: Performance Metrics Visualization</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mb-12"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <ListOrdered className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">List of Tables</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <ul className="list-decimal pl-5 space-y-1">
              <li>Table 1: Comparison of Existing Systems</li>
              <li>Table 2: Hardware Requirements</li>
              <li>Table 3: Software Requirements</li>
              <li>Table 4: Performance Metrics</li>
              <li>Table 5: User Satisfaction Survey Results</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ListsSection;
