
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarClock, Brain, ListTodo, TrendingUp, Plus, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const newSessionSchema = z.object({
  subject: z.string().min(1, { message: "Please select a subject" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
});

type NewSessionFormValues = z.infer<typeof newSessionSchema>;

// Create a type for study sessions
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

// Create a local storage key for study sessions
const STORAGE_KEY = 'study_sessions';

// Get stored sessions from localStorage
const getStoredSessions = (): StudySession[] => {
  const storedSessions = localStorage.getItem(STORAGE_KEY);
  return storedSessions ? JSON.parse(storedSessions) : [];
};

// Save sessions to localStorage
const saveSessionsToStorage = (sessions: StudySession[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

const StudyPlanner = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("plan");
  const [studySessions, setStudySessions] = useState<StudySession[]>(getStoredSessions());

  // Load sessions from localStorage on component mount
  useEffect(() => {
    setStudySessions(getStoredSessions());
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    saveSessionsToStorage(studySessions);
  }, [studySessions]);

  // Form for adding new study sessions
  const form = useForm<NewSessionFormValues>({
    resolver: zodResolver(newSessionSchema),
    defaultValues: {
      subject: "",
      topic: "",
      duration: "60",
      date: "",
      time: "",
      priority: "Medium",
    },
  });

  function onSubmit(data: NewSessionFormValues) {
    // Create a new session with a unique ID
    const newSession: StudySession = {
      id: Date.now(), // Using timestamp as a simple unique ID
      subject: data.subject,
      topic: data.topic,
      duration: data.duration,
      date: data.date,
      time: data.time,
      priority: data.priority
    };

    // Add the new session to the existing sessions
    const updatedSessions = [...studySessions, newSession];
    setStudySessions(updatedSessions);

    // Show a success toast
    toast({
      title: "Study session added",
      description: `Added ${data.subject} - ${data.topic} to your study plan.`,
    });

    // Reset the form
    form.reset();

    // Update localStorage
    saveSessionsToStorage(updatedSessions);
  }

  const handleViewDashboard = () => {
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
            <p className="text-muted-foreground">
              Plan, organize, and track your study sessions efficiently.
            </p>
          </div>
          <Button onClick={handleViewDashboard}>View Dashboard</Button>
        </div>
        <Separator />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Plan</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              <span>Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Study Session */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Study Session
                  </CardTitle>
                  <CardDescription>
                    Create a new study session for your calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                                  <SelectItem value="Physics">Physics</SelectItem>
                                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                                  <SelectItem value="Biology">Biology</SelectItem>
                                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                                  <SelectItem value="History">History</SelectItem>
                                  <SelectItem value="Geography">Geography</SelectItem>
                                  <SelectItem value="Literature">Literature</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Topic</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Calculus, Genetics" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (minutes)</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="30">30 minutes</SelectItem>
                                  <SelectItem value="45">45 minutes</SelectItem>
                                  <SelectItem value="60">1 hour</SelectItem>
                                  <SelectItem value="90">1.5 hours</SelectItem>
                                  <SelectItem value="120">2 hours</SelectItem>
                                  <SelectItem value="180">3 hours</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="priority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Add Session</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Your Weekly Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Your Weekly Overview
                  </CardTitle>
                  <CardDescription>
                    Summary of your planned study hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mathematics</span>
                      <span className="font-medium">4 hours</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full w-[40%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Physics</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full w-[30%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Computer Science</span>
                      <span className="font-medium">2 hours</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-[20%]"></div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">Total Study Time</h4>
                        <p className="text-muted-foreground">This week</p>
                      </div>
                      <div className="text-2xl font-bold">9 hours</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleViewDashboard}>View Dashboard</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* AI Recommendations Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Study Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized study suggestions based on your performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/40">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Focus on Calculus</h4>
                        <p className="text-sm text-muted-foreground">
                          Your recent quiz scores indicate that you could benefit from reviewing derivatives
                          and integrals. Consider scheduling 3 hours this week.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/40">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Physics Review Needed</h4>
                        <p className="text-sm text-muted-foreground">
                          You're excelling in theoretical concepts but could improve on problem-solving.
                          Try working through practice examples for 2 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/40">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimal Study Times</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on your activity patterns, you seem most productive between 9AM-11AM
                          and 3PM-5PM. Schedule important topics during these times.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate New Recommendations</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Upcoming Study Sessions</h3>
                <Button size="sm" onClick={() => setActiveTab("plan")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Session
                </Button>
              </div>
              
              <div className="space-y-3">
                {studySessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No study sessions planned yet. Add your first session!
                  </div>
                ) : (
                  studySessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-12 rounded-full ${
                          session.priority === "High" ? "bg-red-500" :
                          session.priority === "Medium" ? "bg-amber-500" : "bg-green-500"
                        }`}></div>
                        <div>
                          <h4 className="font-medium">{session.subject}</h4>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          {new Date(session.date).toLocaleDateString('en-US', {
                            weekday: 'short', month: 'short', day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {session.time} · {session.duration} min
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9/12 hours</div>
                  <p className="text-xs text-muted-foreground">+3 hours from last week</p>
                  <div className="mt-4 w-full bg-secondary h-3 rounded-full">
                    <div className="bg-primary h-3 rounded-full w-[75%]"></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Consistency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                  <div className="mt-4 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`h-6 rounded-sm ${
                          i < 6 ? "bg-primary" : "bg-secondary"
                        }`}
                      ></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.4/10</div>
                  <p className="text-xs text-muted-foreground">+0.6 from last session</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs">Poor</div>
                      <div className="h-2 w-12 bg-red-200 rounded-full"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs">Good</div>
                      <div className="h-2 w-12 bg-amber-200 rounded-full"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs">Great</div>
                      <div className="h-2 w-12 bg-green-200 rounded-full">
                        <div className="h-2 w-8 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Subject Performance
                </CardTitle>
                <CardDescription>
                  Your performance across different subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Mathematics</span>
                      </div>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Physics</span>
                      </div>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full w-[78%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Computer Science</span>
                      </div>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default StudyPlanner;
