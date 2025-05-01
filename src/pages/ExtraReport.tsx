
import PageTransition from '@/components/PageTransition';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Brain, 
  ChartPie, 
  FileSearch,
  FileText,
  Settings,
} from 'lucide-react';

import ReportSection from '@/components/Reports/ReportSection';
import TitleSection from '@/components/Reports/TitleSection';

const ExtraReport = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <TitleSection 
            title="Supplementary Project Report"
            subtitle="Additional technical documentation and analysis" 
            preparedBy="Technical Team"
            date="May 2025"
          />
          
          <Separator className="my-12" />
          
          <ReportSection title="Executive Summary" icon={FileText} delay={0.4}>
            <p>
              This supplementary report extends the primary documentation with additional technical details,
              performance metrics, and implementation insights. It provides an in-depth examination of the
              system architecture, optimization strategies, and future development roadmap that builds upon
              the foundation established in the main project report.
            </p>
            <p className="mt-4">
              The findings presented here represent the culmination of extensive research, testing, and 
              practical application across various deployment scenarios. These insights are intended to
              guide further development efforts and ensure the long-term sustainability and scalability
              of the system.
            </p>
          </ReportSection>
          
          <ReportSection title="Technical Architecture Overview" icon={Settings} delay={0.45}>
            <h3 className="text-xl font-semibold mb-4">System Components</h3>
            <p>
              The system architecture employs a modular design approach with the following key components:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Frontend React application with Tailwind CSS for responsive UI</li>
              <li>RESTful API services for data access and manipulation</li>
              <li>Machine learning pipeline for personalized recommendations</li>
              <li>PostgreSQL database for structured data storage</li>
              <li>Redis cache for high-performance data retrieval</li>
              <li>Authentication and authorization services</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Component Interaction</h3>
            <p>
              Components interact through well-defined interfaces, allowing for independent scaling and updates:
            </p>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-border w-full mt-4">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-2 text-left">Component</th>
                    <th className="border border-border p-2 text-left">Dependencies</th>
                    <th className="border border-border p-2 text-left">Communication Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">User Interface</td>
                    <td className="border border-border p-2">API Services</td>
                    <td className="border border-border p-2">REST/GraphQL</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">API Services</td>
                    <td className="border border-border p-2">Database, ML Services</td>
                    <td className="border border-border p-2">Direct calls, Message Queue</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">ML Pipeline</td>
                    <td className="border border-border p-2">Database</td>
                    <td className="border border-border p-2">Batch processing, Streaming</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Authentication</td>
                    <td className="border border-border p-2">Database, External IdPs</td>
                    <td className="border border-border p-2">OAuth, JWT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ReportSection>
          
          <ReportSection title="Performance Optimization Strategies" icon={ChartPie} delay={0.5}>
            <h3 className="text-xl font-semibold mb-4">Frontend Optimizations</h3>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Code splitting and lazy loading of components</li>
              <li>Memoization of expensive calculations</li>
              <li>Virtual scrolling for large data sets</li>
              <li>Optimized image loading and caching strategies</li>
              <li>Service worker implementation for offline capabilities</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Backend Optimizations</h3>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Database query optimization and indexing</li>
              <li>Caching layer for frequent queries</li>
              <li>Horizontal scaling of stateless services</li>
              <li>Asynchronous processing for non-critical operations</li>
              <li>Data partitioning for improved query performance</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-border w-full mt-4">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-2 text-left">Metric</th>
                    <th className="border border-border p-2 text-left">Before Optimization</th>
                    <th className="border border-border p-2 text-left">After Optimization</th>
                    <th className="border border-border p-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">Initial Page Load</td>
                    <td className="border border-border p-2">3.2s</td>
                    <td className="border border-border p-2">1.1s</td>
                    <td className="border border-border p-2">65.6%</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Time to Interactive</td>
                    <td className="border border-border p-2">4.5s</td>
                    <td className="border border-border p-2">1.8s</td>
                    <td className="border border-border p-2">60.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">Database Query Avg.</td>
                    <td className="border border-border p-2">350ms</td>
                    <td className="border border-border p-2">85ms</td>
                    <td className="border border-border p-2">75.7%</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">API Response Time</td>
                    <td className="border border-border p-2">520ms</td>
                    <td className="border border-border p-2">120ms</td>
                    <td className="border border-border p-2">76.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ReportSection>
          
          <ReportSection title="Security Measures" icon={FileSearch} delay={0.55}>
            <h3 className="text-xl font-semibold mb-4">Authentication & Authorization</h3>
            <p>
              The system implements a comprehensive security model that includes:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>JWT-based authentication with short expiry times</li>
              <li>Role-based access control for all system resources</li>
              <li>OAuth 2.0 integration for third-party authentication</li>
              <li>Multi-factor authentication for sensitive operations</li>
              <li>Session management with automatic timeout</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Data Protection</h3>
            <p>
              Data security is ensured through multiple layers of protection:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>End-to-end encryption for all data in transit</li>
              <li>AES-256 encryption for sensitive data at rest</li>
              <li>Data anonymization for analytics processing</li>
              <li>Regular security audits and penetration testing</li>
              <li>Compliance with GDPR, HIPAA, and other regulatory requirements</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Threat Mitigation</h3>
            <p>
              Proactive measures are implemented to prevent and address potential threats:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Rate limiting to prevent brute force attacks</li>
              <li>Input validation and sanitization to prevent injection attacks</li>
              <li>WAF (Web Application Firewall) for detecting and blocking malicious traffic</li>
              <li>Regular dependency scanning for vulnerabilities</li>
              <li>Automated security testing in the CI/CD pipeline</li>
            </ul>
          </ReportSection>
          
          <ReportSection title="Deployment Strategy" icon={BookOpen} delay={0.6}>
            <h3 className="text-xl font-semibold mb-4">Infrastructure</h3>
            <p>
              The system is deployed across multiple environments with automated promotion:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Development environment for active development and testing</li>
              <li>Staging environment that mirrors production configuration</li>
              <li>Production environment with high availability and redundancy</li>
              <li>Disaster recovery environment with regular data synchronization</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">CI/CD Pipeline</h3>
            <p>
              Continuous Integration and Deployment ensures reliable and consistent updates:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Automated testing for all code changes</li>
              <li>Static code analysis for quality and security</li>
              <li>Container-based deployment for consistency across environments</li>
              <li>Blue-green deployment for zero-downtime updates</li>
              <li>Automated rollback capabilities for failed deployments</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Monitoring & Observability</h3>
            <p>
              Comprehensive monitoring ensures system health and performance:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Real-time application performance monitoring</li>
              <li>Distributed tracing for request flow analysis</li>
              <li>Centralized logging with structured data format</li>
              <li>Alerting system with escalation policies</li>
              <li>User experience monitoring and analytics</li>
            </ul>
          </ReportSection>
          
          <ReportSection title="Future Development Roadmap" icon={Brain} delay={0.65}>
            <h3 className="text-xl font-semibold mb-4">Short-term Objectives (Q3-Q4 2025)</h3>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Implement advanced analytics dashboard with customizable visualizations</li>
              <li>Expand mobile application capabilities with offline mode</li>
              <li>Integrate natural language processing for content summarization</li>
              <li>Optimize recommendation algorithm with reinforcement learning</li>
              <li>Add support for additional third-party integrations</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Medium-term Goals (2026)</h3>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Implement AR/VR interfaces for immersive learning experiences</li>
              <li>Develop adaptive content generation based on user proficiency</li>
              <li>Expand internationalization and localization support</li>
              <li>Build collaborative learning features for group study</li>
              <li>Integrate with smart devices for learning environment optimization</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Long-term Vision (2027+)</h3>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>Develop emotional intelligence capabilities to detect and respond to learner state</li>
              <li>Create immersive simulation environments for practical skill development</li>
              <li>Implement predictive analytics for early intervention in learning challenges</li>
              <li>Develop personalized certification pathways based on career objectives</li>
              <li>Establish an open ecosystem for third-party educational content providers</li>
            </ul>
          </ReportSection>
          
          <ReportSection title="Conclusion" icon={FileText} delay={0.7}>
            <p>
              This supplementary report has provided detailed insights into the technical implementation,
              performance optimization, security measures, deployment strategies, and future development plans
              for the AI-powered personalized learning study planner.
            </p>
            <p className="mt-4">
              The system represents a significant advancement in educational technology, leveraging artificial
              intelligence and machine learning to create truly personalized learning experiences. The modular
              architecture ensures scalability and maintainability, while the comprehensive security measures
              protect sensitive user data.
            </p>
            <p className="mt-4">
              Performance optimizations have significantly improved system responsiveness, enhancing the user
              experience and enabling efficient operation even under high load. The automated deployment
              pipeline ensures reliable and consistent updates, minimizing downtime and reducing the risk of
              issues in production.
            </p>
            <p className="mt-4">
              Looking ahead, the development roadmap outlines an ambitious but achievable path toward an
              increasingly intelligent and adaptive learning platform. By continuing to incorporate cutting-edge
              technologies and responding to user needs, the system will remain at the forefront of
              educational innovation.
            </p>
          </ReportSection>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExtraReport;
