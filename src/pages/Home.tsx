
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Plus, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Type definition for study sessions
type StudySession = {
  id: number;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  priority: string;
  completed?: boolean;
};

// Get stored sessions from localStorage
const getStoredSessions = (): StudySession[] => {
  const storedSessions = localStorage.getItem('study_sessions');
  return storedSessions ? JSON.parse(storedSessions) : [];
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const navigate = useNavigate();

  // Load study sessions from localStorage
  useEffect(() => {
    setStudySessions(getStoredSessions());
    
    // Add event listener to update sessions when localStorage changes
    const handleStorageChange = () => {
      setStudySessions(getStoredSessions());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Group sessions by subject to calculate hours
  const sessionsBySubject = studySessions.reduce((acc, session) => {
    const subject = session.subject;
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(session);
    return acc;
  }, {} as Record<string, StudySession[]>);

  // Calculate total study hours by subject
  const subjectHours = Object.entries(sessionsBySubject).map(([subject, sessions]) => {
    const totalMinutes = sessions.reduce((sum, session) => sum + parseInt(session.duration), 0);
    return {
      subject,
      hours: Math.round(totalMinutes / 60 * 10) / 10, // Round to 1 decimal place
      sessions: sessions.length
    };
  });

  // Calculate total study hours
  const totalHours = subjectHours.reduce((sum, subject) => sum + subject.hours, 0);

  // Mock data for study plans
  const studyPlans = [
    {
      title: "Final Exam Preparation",
      description: "Intensive study plan to prepare for upcoming final exams",
      duration: "27/3/2025 - 26/4/2025",
      sessions: 4,
      courses: ["Machine Learning Fundamentals", "Advanced Calculus", "Web Development Basics"]
    },
    {
      title: "Summer Learning Project",
      description: "Self-paced learning plan for the summer break",
      duration: "11/5/2025 - 25/6/2025",
      sessions: 0,
      courses: ["Machine Learning Fundamentals", "Web Development Basics"]
    }
  ];

  const handleCreatePlan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/study-planner');
    }, 1000);
  };

  const handleAddSession = () => {
    navigate('/study-planner');
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Study Dashboard</h1>
              <p className="text-muted-foreground mt-1">View and manage your study plans and sessions</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleAddSession}>
                <Plus className="h-4 w-4" />
                <span>Add Session</span>
              </Button>
              <Button className="flex items-center gap-2" onClick={handleCreatePlan}>
                Create Plan
              </Button>
            </div>
          </motion.div>

          {/* Upcoming Study Sessions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Study Sessions</h2>
              <Button variant="outline" size="sm" onClick={handleAddSession}>
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </div>
            
            {studySessions.length === 0 ? (
              <Card>
                <CardContent className="py-10">
                  <div className="text-center">
                    <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Study Sessions Planned</h3>
                    <p className="text-muted-foreground mb-6">Start planning your study sessions to track your progress</p>
                    <Button onClick={handleAddSession}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {studySessions.slice(0, 4).map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <div className="flex">
                      <div 
                        className={`w-2 ${
                          session.priority === "High" ? "bg-red-500" :
                          session.priority === "Medium" ? "bg-amber-500" : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>{session.subject}</CardTitle>
                            <Badge variant={
                              session.priority === "High" ? "destructive" :
                              session.priority === "Medium" ? "default" : "secondary"
                            }>
                              {session.priority}
                            </Badge>
                          </div>
                          <CardDescription>{session.topic}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Date & Time</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(session.date).toLocaleDateString('en-US', {
                                  weekday: 'short', month: 'short', day: 'numeric'
                                })} at {session.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Duration</p>
                              <p className="text-sm text-muted-foreground">
                                {session.duration} minutes
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {studySessions.length > 4 && (
              <div className="text-center mt-4">
                <Button variant="outline" onClick={() => navigate('/study-planner')}>
                  View All Sessions
                </Button>
              </div>
            )}
          </motion.div>

          <Separator className="my-8" />

          {/* Study Summary Section */}
          {studySessions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-xl font-bold mb-4">Study Summary</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Total Study Time</h3>
                      <div className="text-3xl font-bold">{totalHours} hours</div>
                      <p className="text-sm text-muted-foreground">Across all subjects</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Total Sessions</h3>
                      <div className="text-3xl font-bold">{studySessions.length}</div>
                      <p className="text-sm text-muted-foreground">Planned study sessions</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Subjects</h3>
                      <div className="text-3xl font-bold">{Object.keys(sessionsBySubject).length}</div>
                      <p className="text-sm text-muted-foreground">Different subjects to study</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Hours by Subject</h3>
                  <div className="space-y-4">
                    {subjectHours.map(({ subject, hours, sessions }) => (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{subject}</span>
                          <span className="font-medium">{hours} hours ({sessions} sessions)</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min((hours / totalHours) * 100, 100)}%`,
                              backgroundColor: subject === 'Mathematics' ? 'rgb(59, 130, 246)' : 
                                              subject === 'Physics' ? 'rgb(168, 85, 247)' : 
                                              subject === 'Computer Science' ? 'rgb(34, 197, 94)' : 
                                              'rgb(249, 115, 22)'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Separator className="my-8" />

          {/* Study Plans Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {studyPlans.map((plan, index) => (
              <Card key={index} className="overflow-hidden border border-border/50">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Sessions</p>
                      <p className="font-medium">{plan.sessions}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Courses</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.courses.map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="font-normal">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    View Schedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              className="px-8 py-6 bg-primary text-primary-foreground rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-md"
              onClick={handleCreatePlan}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create New Plan"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
