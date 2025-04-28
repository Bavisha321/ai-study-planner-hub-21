import { motion } from 'framer-motion';
import { ListOrdered } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TableOfContents = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ListOrdered className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">List of Contents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Introduction
              <ol className="list-decimal pl-5 space-y-1">
                <li>Purpose</li>
                <li>Scope</li>
                <li>Model Diagram</li>
              </ol>
            </li>
            <li>Literature Survey
              <ol className="list-decimal pl-5 space-y-1">
                <li>Technologies Used
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Python</li>
                    <li>Machine Learning</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>System Analysis
              <ol className="list-decimal pl-5 space-y-1">
                <li>Existing System
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Disadvantages</li>
                  </ol>
                </li>
                <li>Problem Statement</li>
                <li>Proposed System
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Advantages</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>System Requirements Specification
              <ol className="list-decimal pl-5 space-y-1">
                <li>Functional Requirements</li>
                <li>Non-Functional Requirements</li>
                <li>Hardware Requirements</li>
                <li>Software Requirements</li>
              </ol>
            </li>
            <li>Implementation
              <ol className="list-decimal pl-5 space-y-1">
                <li>Implementation Steps</li>
                <li>Algorithms</li>
                <li>Sample Code</li>
              </ol>
            </li>
            <li>Discussion of Results</li>
            <li>Conclusion and Future Enhancements
              <ol className="list-decimal pl-5 space-y-1">
                <li>Conclusion</li>
                <li>Future Enhancement</li>
              </ol>
            </li>
            <li>References</li>
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TableOfContents;
