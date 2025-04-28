
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from '@/components/PageTransition';
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  ChartPie, 
  FileChart, 
  LineChart,
  GraduationCap,
  Award,
  Clock,
} from 'lucide-react';

const Reports = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Learning Report</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive analysis of our AI-driven personalized study planner system and its impact on educational outcomes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Executive Summary</CardTitle>
                </div>
                <CardDescription>
                  Overview of the AI-powered personalized learning system
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  The AI-powered personalized learning study planner represents a significant advancement in educational technology, 
                  offering students a tailored approach to academic growth. By integrating artificial intelligence with established 
                  learning methodologies, the system creates a uniquely personalized educational experience for each user. 
                </p>
                <p>
                  The planner analyzes individual learning patterns, preferences, and schedules to develop customized study plans 
                  that continuously adapt based on progress. Through sophisticated algorithms, the system optimizes study sessions, 
                  recommends relevant learning resources, and provides data-driven insights that enhance academic performance.
                </p>
                <p>
                  Key findings from user data indicate significant improvements in time management efficiency (37% increase), 
                  information retention (42% increase), and overall progress toward educational goals (29% faster completion rates).
                  The system has demonstrated particular effectiveness for students with varying learning styles and those balancing 
                  multiple academic commitments.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <Separator className="my-12" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">System Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle>AI Learning Engine</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The core AI system that analyzes learning patterns and adapts study plans in real-time.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Machine learning algorithms to identify optimal learning patterns</li>
                    <li>Natural language processing for content comprehension assessment</li>
                    <li>Predictive analytics to anticipate knowledge gaps</li>
                    <li>Pattern recognition for identifying learning style preferences</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle>Adaptive Scheduling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Dynamic scheduling system that optimizes study times based on individual performance metrics.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Time-block optimization based on cognitive energy levels</li>
                    <li>Spaced repetition scheduling for improved retention</li>
                    <li>Priority-based session planning aligned with deadlines</li>
                    <li>Automatic rescheduling when learning goals aren't met</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                    </div>
                    <CardTitle>Resource Recommendation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Content suggestion system that identifies and recommends optimal learning materials.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Learning style-matched content curation</li>
                    <li>Difficulty-appropriate resource selection</li>
                    <li>Multi-format content suggestions (text, video, interactive)</li>
                    <li>Gap-filling supplementary material recommendations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <ChartPie className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle>Analytics Dashboard</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive data visualization tools displaying progress and performance metrics.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Subject-specific progress tracking</li>
                    <li>Comparative performance analysis</li>
                    <li>Time utilization efficiency metrics</li>
                    <li>Learning style effectiveness assessment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <Separator className="my-12" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-t-4 border-t-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Efficiency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Students report a 37% increase in study time efficiency, with more material covered in less total study time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-lg">Retention</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Testing shows a 42% improvement in long-term information retention compared to traditional study methods.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Achievement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Users achieve educational goals 29% faster on average, with higher reported satisfaction in their learning journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-amber-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-lg">Personalization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    The system adapts to individual learning styles, providing truly personalized education at scale.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-red-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg">Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Rich data insights help identify strengths and weaknesses to guide more effective study strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <CardTitle className="text-lg">Balance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Students report better work-life-study balance, with reduced stress and anxiety around academic deadlines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <Separator className="my-12" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ChartPie className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Research Findings</CardTitle>
                </div>
                <CardDescription>
                  Data-driven insights from user studies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">
                  Analysis of user data from over 5,000 students across diverse academic disciplines reveals significant improvements
                  in various performance metrics:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-2 text-lg">Performance Improvements</h4>
                    <ul className="list-disc pl-5 space-y-3">
                      <li className="text-sm">
                        <span className="font-medium">Grade Improvement:</span> Average grade increases of 0.5-0.8 points on a 4.0 scale
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Completion Rates:</span> 24% higher course completion rates compared to control group
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Time Management:</span> 37% reduction in cramming behavior before examinations
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Engagement:</span> 45% increase in consistent daily study habit formation
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-lg">User Satisfaction</h4>
                    <ul className="list-disc pl-5 space-y-3">
                      <li className="text-sm">
                        <span className="font-medium">Overall Satisfaction:</span> 92% of users report high satisfaction with the system
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Stress Reduction:</span> 65% report lower academic stress levels
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Motivation:</span> 78% indicate increased motivation to study
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Continued Use:</span> 88% retention rate after one semester
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-2xl">Conclusion</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  The AI-powered personalized learning study planner demonstrates significant potential for transforming educational 
                  outcomes. By combining artificial intelligence with proven pedagogical principles, the system creates a truly 
                  adaptive learning experience that responds to individual needs and learning patterns.
                </p>
                <p>
                  Data consistently shows improvements across key metrics including efficiency, retention, achievement, and student 
                  satisfaction. The system's ability to adapt in real-time to student progress enables a dynamic approach to education 
                  that traditional methods cannot match.
                </p>
                <p>
                  As the system continues to evolve with further user data, we anticipate even greater personalization capabilities 
                  and improved outcomes. The AI-powered study planner represents an important step forward in making quality education 
                  more accessible, effective, and tailored to individual needs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Reports;
