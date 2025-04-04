
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { 
  Bell, 
  Database, 
  Lock, 
  Moon, 
  User, 
  UserCog, 
  Clock,
  BellRing,
  TimerReset,
  Key,
  Calendar as CalendarIcon,
  Palette,
  Type,
  Settings as SettingsIcon,
  Bookmark,
  FileText,
  MessageSquare,
  PenTool,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  displayName: z.string().max(50, {
    message: "Display name must not be longer than 50 characters."
  }).optional(),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email("This is not a valid email"),
  bio: z.string().max(160).optional(),
});

const notificationsFormSchema = z.object({
  studyReminders: z.boolean().default(true),
  deadlineAlerts: z.boolean().default(true),
  achievementNotifications: z.boolean().default(true),
  weeklyReports: z.boolean().default(true),
  inactivityReminders: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  scheduleChanges: z.boolean().default(true),
  lessonUpdates: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  desktopNotifications: z.boolean().default(true),
  reminderTiming: z.enum(["30min", "1hour", "3hours", "1day"]).default("1hour"),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["small", "medium", "large"]),
  fontFamily: z.enum(["default", "serif", "mono", "rounded", "display"]),
  fontWeight: z.enum(["light", "regular", "medium", "bold"]).default("regular"),
  lineHeight: z.enum(["tight", "normal", "relaxed"]).default("normal"),
  letterSpacing: z.enum(["tighter", "normal", "wider"]).default("normal"),
  background: z.enum(["default", "gradient", "pattern"]),
  interfaceDensity: z.enum(["compact", "comfortable", "spacious"]).default("comfortable"),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const studyTimingFormSchema = z.object({
  defaultSessionLength: z.number().min(5).max(120),
  shortBreakLength: z.number().min(1).max(30),
  longBreakLength: z.number().min(5).max(60),
  sessionsBeforeLongBreak: z.number().min(1).max(10),
  autoStartNextSession: z.boolean().default(false),
  preparationTime: z.number().min(1).max(60),
  scheduledStart: z.string().optional(),
  dailyGoal: z.number().min(1).max(12).default(4), // Hours
  reminderFrequency: z.enum(["never", "hourly", "sessions", "daily"]).default("sessions"),
});

const examCalendarFormSchema = z.object({
  examDate: z.date().optional(),
  examTitle: z.string().min(1, "Exam title is required").optional(),
  examType: z.enum(["quiz", "midterm", "final", "test", "other"]).default("test"),
  examPriority: z.enum(["low", "medium", "high"]).default("medium"),
  examLocation: z.string().optional(),
  examDuration: z.number().min(15).max(240).default(60), // minutes
});

const projectNameFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(50),
  projectDescription: z.string().max(200).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;
type StudyTimingFormValues = z.infer<typeof studyTimingFormSchema>;
type ExamCalendarFormValues = z.infer<typeof examCalendarFormSchema>;
type ProjectNameFormValues = z.infer<typeof projectNameFormSchema>;

export default function Settings() {
  const { toast: hookToast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [savedUsername, setSavedUsername] = useState("johndoe");
  const [savedDisplayName, setSavedDisplayName] = useState("John Doe");
  const [savedProjectName, setSavedProjectName] = useState("StudyPlanner");
  const [markedExamDays, setMarkedExamDays] = useState<{date: Date, title: string, type: string}[]>([]);
  const [selectedExamDate, setSelectedExamDate] = useState<Date | undefined>();
  const [examTitle, setExamTitle] = useState("");
  const [currentTheme, setCurrentTheme] = useState<string>("system");
  const [currentFontSize, setCurrentFontSize] = useState<string>("medium");
  const [currentFontFamily, setCurrentFontFamily] = useState<string>("default");
  const [currentFontWeight, setCurrentFontWeight] = useState<string>("regular");
  const [currentLineHeight, setCurrentLineHeight] = useState<string>("normal");
  const [currentLetterSpacing, setCurrentLetterSpacing] = useState<string>("normal");
  const [currentBackground, setCurrentBackground] = useState<string>("default");
  const [currentInterfaceDensity, setCurrentInterfaceDensity] = useState<string>("comfortable");

  // Load saved preferences
  useEffect(() => {
    // Load username and display name
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setSavedUsername(storedUsername);
      profileForm.setValue('username', storedUsername);
    }
    
    const storedDisplayName = localStorage.getItem('displayName');
    if (storedDisplayName) {
      setSavedDisplayName(storedDisplayName);
      profileForm.setValue('displayName', storedDisplayName);
    }
    
    // Load project name
    const storedProjectName = localStorage.getItem('projectName');
    if (storedProjectName) {
      setSavedProjectName(storedProjectName);
      projectNameForm.setValue('projectName', storedProjectName);
    }

    // Load appearance settings
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setCurrentTheme(storedTheme);
      appearanceForm.setValue('theme', storedTheme as any);
    }

    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
      setCurrentFontSize(storedFontSize);
      appearanceForm.setValue('fontSize', storedFontSize as any);
      document.documentElement.style.fontSize = 
        storedFontSize === 'small' ? '14px' : 
        storedFontSize === 'large' ? '18px' : '16px';
    }

    const storedFontFamily = localStorage.getItem('fontFamily');
    if (storedFontFamily) {
      setCurrentFontFamily(storedFontFamily);
      appearanceForm.setValue('fontFamily', storedFontFamily as any);
      
      const fontFamilyMap: Record<string, string> = {
        'serif': 'Georgia, serif',
        'mono': 'monospace',
        'rounded': 'var(--font-rounded, "Nunito", system-ui, sans-serif)',
        'display': 'var(--font-display, "Playfair Display", Georgia, serif)',
        'default': 'system-ui, sans-serif'
      };
      
      document.documentElement.style.fontFamily = fontFamilyMap[storedFontFamily] || 'system-ui, sans-serif';
    }
    
    // Load font weight, line height and letter spacing if available
    const storedFontWeight = localStorage.getItem('fontWeight');
    if (storedFontWeight) {
      setCurrentFontWeight(storedFontWeight);
      appearanceForm.setValue('fontWeight', storedFontWeight as any);
      
      const fontWeightMap: Record<string, string> = {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'bold': '700'
      };
      
      document.documentElement.style.fontWeight = fontWeightMap[storedFontWeight] || '400';
    }
    
    const storedLineHeight = localStorage.getItem('lineHeight');
    if (storedLineHeight) {
      setCurrentLineHeight(storedLineHeight);
      appearanceForm.setValue('lineHeight', storedLineHeight as any);
      
      const lineHeightMap: Record<string, string> = {
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.8'
      };
      
      document.documentElement.style.lineHeight = lineHeightMap[storedLineHeight] || '1.5';
    }
    
    const storedLetterSpacing = localStorage.getItem('letterSpacing');
    if (storedLetterSpacing) {
      setCurrentLetterSpacing(storedLetterSpacing);
      appearanceForm.setValue('letterSpacing', storedLetterSpacing as any);
      
      const letterSpacingMap: Record<string, string> = {
        'tighter': '-0.05em',
        'normal': '0',
        'wider': '0.05em'
      };
      
      document.documentElement.style.letterSpacing = letterSpacingMap[storedLetterSpacing] || '0';
    }
    
    const storedInterfaceDensity = localStorage.getItem('interfaceDensity');
    if (storedInterfaceDensity) {
      setCurrentInterfaceDensity(storedInterfaceDensity);
      appearanceForm.setValue('interfaceDensity', storedInterfaceDensity as any);
    }

    const storedBackground = localStorage.getItem('background');
    if (storedBackground) {
      setCurrentBackground(storedBackground);
      appearanceForm.setValue('background', storedBackground as any);
      
      if (storedBackground === 'gradient') {
        document.body.className = 'bg-gradient-to-br from-background to-secondary/30';
      } else if (storedBackground === 'pattern') {
        document.body.className = 'bg-background bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23999999\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")]';
      } else {
        document.body.className = 'bg-background';
      }
    }

    // Load saved exam dates
    const storedExamDays = localStorage.getItem('examDays');
    if (storedExamDays) {
      try {
        const parsedExamDays = JSON.parse(storedExamDays).map((exam: any) => ({
          ...exam,
          date: new Date(exam.date)
        }));
        setMarkedExamDays(parsedExamDays);
      } catch (error) {
        console.error("Error parsing exam days:", error);
      }
    }
    
    // Load notification settings
    const storedNotifications = localStorage.getItem('notificationSettings');
    if (storedNotifications) {
      try {
        const settings = JSON.parse(storedNotifications);
        notificationsForm.reset(settings);
      } catch (error) {
        console.error("Error parsing notification settings:", error);
      }
    }
    
    // Load study timing settings
    const storedTimingSettings = localStorage.getItem('studyTiming');
    if (storedTimingSettings) {
      try {
        const settings = JSON.parse(storedTimingSettings);
        studyTimingForm.reset(settings);
      } catch (error) {
        console.error("Error parsing study timing settings:", error);
      }
    }
    
  }, []);

  // Demo notification effect
  useEffect(() => {
    if (Notification.permission === "granted" && notificationsForm.getValues().studyReminders) {
      const demoTimer = setTimeout(() => {
        toast("Study Reminder", {
          description: "Remember to complete your daily study goals! 📚",
          duration: 5000,
        });
      }, 5000);

      return () => clearTimeout(demoTimer);
    }
  }, []);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: savedUsername,
      displayName: savedDisplayName,
      email: "john.doe@example.com",
      bio: "Student passionate about learning new things.",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    localStorage.setItem('username', data.username);
    setSavedUsername(data.username);
    
    if (data.displayName) {
      localStorage.setItem('displayName', data.displayName);
      setSavedDisplayName(data.displayName);
    }
    
    hookToast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
    console.log(data);
  }
  
  const projectNameForm = useForm<ProjectNameFormValues>({
    resolver: zodResolver(projectNameFormSchema),
    defaultValues: {
      projectName: savedProjectName,
      projectDescription: "A study planner application to help students organize their learning."
    },
  });
  
  function onProjectNameSubmit(data: ProjectNameFormValues) {
    localStorage.setItem('projectName', data.projectName);
    setSavedProjectName(data.projectName);
    
    if (data.projectDescription) {
      localStorage.setItem('projectDescription', data.projectDescription);
    }
    
    hookToast({
      title: "Project settings updated",
      description: "Your project information has been updated.",
    });
    console.log(data);
  }

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      studyReminders: true,
      deadlineAlerts: true,
      achievementNotifications: true,
      weeklyReports: true,
      inactivityReminders: false,
      marketingEmails: false,
      scheduleChanges: true,
      lessonUpdates: true,
      emailNotifications: true,
      desktopNotifications: true,
      reminderTiming: "1hour",
    },
  });

  function onNotificationsSubmit(data: NotificationsFormValues) {
    // Save notification preferences to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(data));
    
    if (data.studyReminders && Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          toast("Notifications enabled", {
            description: "You will now receive study reminders!",
          });
        }
      });
    }
    
    hookToast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
    console.log(data);
    
    if (data.studyReminders) {
      setTimeout(() => {
        toast("Study Reminder", {
          description: "Time to study! Your scheduled session is starting soon.",
        });
      }, 2000);
    }
  }

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system" as any,
      fontSize: "medium" as any,
      fontFamily: "default" as any,
      fontWeight: "regular" as any,
      lineHeight: "normal" as any,
      letterSpacing: "normal" as any,
      background: "default" as any,
      interfaceDensity: "comfortable" as any,
    },
  });

  function onAppearanceSubmit(data: AppearanceFormValues) {
    // Save theme preference
    localStorage.setItem('theme', data.theme);
    setCurrentTheme(data.theme);
    
    // Apply font size
    localStorage.setItem('fontSize', data.fontSize);
    setCurrentFontSize(data.fontSize);
    document.documentElement.style.fontSize = 
      data.fontSize === 'small' ? '14px' : 
      data.fontSize === 'large' ? '18px' : '16px';
    
    // Apply font family
    localStorage.setItem('fontFamily', data.fontFamily);
    setCurrentFontFamily(data.fontFamily);
    
    const fontFamilyMap: Record<string, string> = {
      'serif': 'Georgia, serif',
      'mono': 'monospace',
      'rounded': 'var(--font-rounded, "Nunito", system-ui, sans-serif)',
      'display': 'var(--font-display, "Playfair Display", Georgia, serif)',
      'default': 'system-ui, sans-serif'
    };
    
    document.documentElement.style.fontFamily = fontFamilyMap[data.fontFamily] || 'system-ui, sans-serif';
    
    // Apply font weight
    localStorage.setItem('fontWeight', data.fontWeight);
    setCurrentFontWeight(data.fontWeight);
    
    const fontWeightMap: Record<string, string> = {
      'light': '300',
      'regular': '400',
      'medium': '500',
      'bold': '700'
    };
    
    document.documentElement.style.fontWeight = fontWeightMap[data.fontWeight] || '400';
    
    // Apply line height
    localStorage.setItem('lineHeight', data.lineHeight);
    setCurrentLineHeight(data.lineHeight);
    
    const lineHeightMap: Record<string, string> = {
      'tight': '1.2',
      'normal': '1.5',
      'relaxed': '1.8'
    };
    
    document.documentElement.style.lineHeight = lineHeightMap[data.lineHeight] || '1.5';
    
    // Apply letter spacing
    localStorage.setItem('letterSpacing', data.letterSpacing);
    setCurrentLetterSpacing(data.letterSpacing);
    
    const letterSpacingMap: Record<string, string> = {
      'tighter': '-0.05em',
      'normal': '0',
      'wider': '0.05em'
    };
    
    document.documentElement.style.letterSpacing = letterSpacingMap[data.letterSpacing] || '0';
    
    // Apply interface density
    localStorage.setItem('interfaceDensity', data.interfaceDensity);
    setCurrentInterfaceDensity(data.interfaceDensity);
    
    // Apply padding and spacing based on density
    const densityClass = 
      data.interfaceDensity === 'compact' ? 'space-y-2 p-2' :
      data.interfaceDensity === 'spacious' ? 'space-y-6 p-6' :
      'space-y-4 p-4';
    
    document.querySelectorAll('.density-adaptive').forEach((el) => {
      el.className = el.className.replace(/space-y-\d p-\d/g, '');
      el.classList.add(densityClass);
    });
    
    // Apply background
    localStorage.setItem('background', data.background);
    setCurrentBackground(data.background);
    
    if (data.background === 'gradient') {
      document.body.className = 'bg-gradient-to-br from-background to-secondary/30';
    } else if (data.background === 'pattern') {
      document.body.className = 'bg-background bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23999999\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")]';
    } else {
      document.body.className = 'bg-background';
    }
    
    // Add Google Fonts if needed based on selection
    if (data.fontFamily === 'rounded' || data.fontFamily === 'display') {
      // Check if we already added the fonts
      const existingLink = document.getElementById('google-fonts-link');
      if (!existingLink) {
        const link = document.createElement('link');
        link.id = 'google-fonts-link';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&family=Playfair+Display:wght@400;500;700&display=swap';
        document.head.appendChild(link);
      }
    }
    
    hookToast({
      title: "Appearance settings saved",
      description: "Your visual preferences have been updated.",
    });
  }

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSecuritySubmit(data: SecurityFormValues) {
    hookToast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    console.log(data);
  }

  const studyTimingForm = useForm<StudyTimingFormValues>({
    resolver: zodResolver(studyTimingFormSchema),
    defaultValues: {
      defaultSessionLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
      sessionsBeforeLongBreak: 4,
      autoStartNextSession: false,
      preparationTime: 10,
      scheduledStart: "",
      dailyGoal: 4,
      reminderFrequency: "sessions",
    },
  });

  function onStudyTimingSubmit(data: StudyTimingFormValues) {
    // Save study timing preferences
    localStorage.setItem('studyTiming', JSON.stringify(data));
    
    // Set up notifications based on settings
    if (data.reminderFrequency !== "never" && Notification.permission === "granted") {
      // Schedule notifications based on frequency
      let notificationMessage = "Time to start your study session!";
      let scheduleTime = 3000; // Just for demo
      
      toast("Notification scheduled", {
        description: `You'll be reminded of your study sessions based on your settings.`,
      });
      
      setTimeout(() => {
        toast("Study Time", {
          description: notificationMessage,
        });
      }, scheduleTime);
    }
    
    hookToast({
      title: "Study timing settings saved",
      description: "Your study session timing preferences have been updated.",
    });
    console.log(data);
  }

  const examCalendarForm = useForm<ExamCalendarFormValues>({
    resolver: zodResolver(examCalendarFormSchema),
    defaultValues: {
      examTitle: "",
      examType: "test",
      examPriority: "medium",
      examLocation: "",
      examDuration: 60,
    },
  });

  function onExamCalendarSubmit(data: ExamCalendarFormValues) {
    if (data.examDate && data.examTitle) {
      const newExamDays = [
        ...markedExamDays, 
        { 
          date: data.examDate, 
          title: data.examTitle,
          type: data.examType 
        }
      ];
      
      setMarkedExamDays(newExamDays);
      
      // Save to localStorage
      localStorage.setItem('examDays', JSON.stringify(newExamDays));
      
      examCalendarForm.reset({
        examDate: undefined,
        examTitle: "",
        examType: "test",
        examPriority: "medium",
        examLocation: "",
        examDuration: 60,
      });
      
      setSelectedExamDate(undefined);
      setExamTitle("");
      
      hookToast({
        title: "Exam added to calendar",
        description: `${data.examTitle} scheduled for ${format(data.examDate, "PPP")}`,
      });
      
      // If notifications enabled, schedule a reminder for this exam
      if (notificationsForm.getValues().deadlineAlerts) {
        // For demo purposes, show immediate notification
        setTimeout(() => {
          toast("New Exam Scheduled", {
            description: `Don't forget to prepare for ${data.examTitle} on ${format(data.examDate, "PP")}!`,
          });
        }, 2000);
      }
    }
  }

  const isExamDay = (date: Date) => {
    return markedExamDays.some(exam => 
      exam.date.getDate() === date.getDate() && 
      exam.date.getMonth() === date.getMonth() && 
      exam.date.getFullYear() === date.getFullYear()
    );
  };
  
  const getExamType = (date: Date) => {
    const exam = markedExamDays.find(exam => 
      exam.date.getDate() === date.getDate() && 
      exam.date.getMonth() === date.getMonth() && 
      exam.date.getFullYear() === date.getFullYear()
    );
    return exam?.type || "test";
  };
  
  const getExamBadgeColor = (type: string) => {
    switch(type) {
      case "quiz": return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      case "midterm": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";
      case "final": return "bg-red-500/20 text-red-700 dark:text-red-300";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <div className="space-y-1">
              <Button 
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button 
                variant={activeTab === "project" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("project")}
              >
                <FileText className="h-4 w-4" />
                <span>Project</span>
              </Button>
              <Button 
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("account")}
              >
                <UserCog className="h-4 w-4" />
                <span>Account</span>
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Button>
              <Button 
                variant={activeTab === "timing" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("timing")}
              >
                <Clock className="h-4 w-4" />
                <span>Study Timing</span>
              </Button>
              <Button 
                variant={activeTab === "calendar" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("calendar")}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Exam Calendar</span>
              </Button>
              <Button 
                variant={activeTab === "appearance" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("appearance")}
              >
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </Button>
              <Button 
                variant={activeTab === "security" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("security")}
              >
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </Button>
              <Button 
                variant={activeTab === "data" ? "secondary" : "ghost"}
                className="flex items-center justify-start w-full gap-2 px-3"
                onClick={() => setActiveTab("data")}
              >
                <Database className="h-4 w-4" />
                <span>Data</span>
              </Button>
            </div>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the platform.
                  </p>
                </div>
                <Separator />
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is how your name will be displayed to others.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your email address for communications.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about yourself" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description about yourself.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save changes</Button>
                  </form>
                </Form>
              </div>
            )}
            
            {activeTab === "project" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Project Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your project name and description.
                  </p>
                </div>
                <Separator />
                <Form {...projectNameForm}>
                  <form onSubmit={projectNameForm.handleSubmit(onProjectNameSubmit)} className="space-y-8">
                    <FormField
                      control={projectNameForm.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name of your project.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={projectNameForm.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            A brief description of your project.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Project Settings</Button>
                  </form>
                </Form>
              </div>
            )}
            
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your account settings and linked services.
                  </p>
                </div>
                <Separator />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Display Name</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Update Display Name</label>
                        <div className="flex gap-2">
                          <Input placeholder="New display name" className="flex-1" />
                          <Button>Update</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Connected Accounts</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Google</div>
                          <div className="text-xs text-muted-foreground">
                            Not connected
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Apple</div>
                          <div className="text-xs text-muted-foreground">
                            Not connected
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications.
                  </p>
                </div>
                <Separator />
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Notification Channels
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 h-full">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationsForm.control}
                          name="desktopNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 h-full">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Browser Notifications
                                </FormLabel>
                                <FormDescription>
                                  Show notifications in your browser
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    if (checked && Notification.permission !== "granted") {
                                      Notification.requestPermission();
                                    }
                                    field.onChange(checked);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <BellRing className="h-4 w-4" />
                        Study Notifications
                      </h4>
                      
                      <FormField
                        control={notificationsForm.control}
                        name="reminderTiming"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reminder Timing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select when to be reminded" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="30min">30 minutes before</SelectItem>
                                <SelectItem value="1hour">1 hour before</SelectItem>
                                <SelectItem value="3hours">3 hours before</SelectItem>
                                <SelectItem value="1day">1 day before</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How far in advance should we remind you about scheduled study sessions
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    
                      <FormField
                        control={notificationsForm.control}
                        name="studyReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Study Reminders
                              </FormLabel>
                              <FormDescription>
                                Receive notifications about your study schedule.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="deadlineAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Deadline Alerts
                              </FormLabel>
                              <FormDescription>
                                Get reminders about upcoming deadlines.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Other Notifications</h4>
                      
                      <FormField
                        control={notificationsForm.control}
                        name="scheduleChanges"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Schedule Changes
                              </FormLabel>
                              <FormDescription>
                                Be notified when your study schedule changes.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="lessonUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Lesson Updates
                              </FormLabel>
                              <FormDescription>
                                Receive notifications when lesson content is updated.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    
                      <FormField
                        control={notificationsForm.control}
                        name="achievementNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Achievement Notifications
                              </FormLabel>
                              <FormDescription>
                                Be notified when you reach study milestones.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="weeklyReports"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Weekly Study Reports
                              </FormLabel>
                              <FormDescription>
                                Receive weekly email summaries of your study progress.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="inactivityReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Inactivity Reminders
                              </FormLabel>
                              <FormDescription>
                                Get reminders when you haven't studied for a while.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Marketing Emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about new features and updates.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save preferences</Button>
                  </form>
                </Form>
              </div>
            )}

            {activeTab === "calendar" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Exam Calendar</h3>
                  <p className="text-sm text-muted-foreground">
                    Mark your important exam dates on the calendar.
                  </p>
                </div>
                <Separator />
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Form {...examCalendarForm}>
                      <form onSubmit={examCalendarForm.handleSubmit(onExamCalendarSubmit)} className="space-y-4">
                        <FormField
                          control={examCalendarForm.control}
                          name="examTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exam Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Math Final" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setExamTitle(e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={examCalendarForm.control}
                            name="examType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Exam Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                    <SelectItem value="midterm">Midterm</SelectItem>
                                    <SelectItem value="final">Final</SelectItem>
                                    <SelectItem value="test">Test</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={examCalendarForm.control}
                            name="examPriority"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={examCalendarForm.control}
                            name="examDuration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min={15}
                                    max={240}
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 60)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={examCalendarForm.control}
                            name="examLocation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Room 301" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={examCalendarForm.control}
                          name="examDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Exam Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      if (date) {
                                        field.onChange(date);
                                        setSelectedExamDate(date);
                                      }
                                    }}
                                    initialFocus
                                    className="pointer-events-auto"
                                    modifiers={{ 
                                      highlighted: markedExamDays.map(exam => exam.date) 
                                    }}
                                    modifiersStyles={{
                                      highlighted: { 
                                        backgroundColor: "rgba(220, 50, 50, 0.2)",
                                        fontWeight: "bold"
                                      }
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={!examTitle || !selectedExamDate}
                        >
                          Add Exam
                        </Button>
                      </form>
                    </Form>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="font-medium">Upcoming Exams</div>
                    <div className="rounded-lg border p-4 min-h-[200px] max-h-[300px] overflow-auto">
                      {markedExamDays.length > 0 ? (
                        <div className="space-y-2">
                          {markedExamDays
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map((exam, index) => (
                              <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                <div>
                                  <div className="font-medium flex items-center gap-2">
                                    {exam.title}
                                    <Badge className={cn("text-xs", getExamBadgeColor(exam.type))}>
                                      {exam.type}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {format(exam.date, "PPP")}
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const newExamDays = [...markedExamDays];
                                    newExamDays.splice(index, 1);
                                    setMarkedExamDays(newExamDays);
                                    localStorage.setItem('examDays', JSON.stringify(newExamDays));
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          No exams scheduled yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "timing" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Study Timing</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your study session timing preferences.
                  </p>
                </div>
                <Separator />
                <Form {...studyTimingForm}>
                  <form onSubmit={studyTimingForm.handleSubmit(onStudyTimingSubmit)} className="space-y-8">
                    <FormField
                      control={studyTimingForm.control}
                      name="defaultSessionLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Study Session Length (minutes)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={5}
                                max={120}
                                step={5}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">{field.value}</span>
                          </div>
                          <FormDescription>
                            The length of your standard study session in minutes.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="preparationTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preparation Time (minutes)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={1}
                                max={60}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">{field.value}</span>
                          </div>
                          <FormDescription>
                            Time allocated for preparation before starting a study session.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="shortBreakLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Break Length (minutes)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={1}
                                max={30}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">{field.value}</span>
                          </div>
                          <FormDescription>
                            Length of short breaks between study sessions.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="longBreakLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Long Break Length (minutes)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={5}
                                max={60}
                                step={5}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">{field.value}</span>
                          </div>
                          <FormDescription>
                            Length of long breaks after multiple study sessions.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="sessionsBeforeLongBreak"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sessions Before Long Break</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={1}
                                max={10}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">{field.value}</span>
                          </div>
                          <FormDescription>
                            Number of study sessions to complete before a long break.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={studyTimingForm.control}
                        name="scheduledStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Start Time</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Your preferred daily start time for study sessions
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={studyTimingForm.control}
                        name="dailyGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Study Goal (hours)</FormLabel>
                            <div className="flex items-center gap-4">
                              <FormControl>
                                <Slider
                                  min={1}
                                  max={12}
                                  step={0.5}
                                  defaultValue={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="flex-1"
                                />
                              </FormControl>
                              <span className="w-12 text-center font-medium">{field.value}</span>
                            </div>
                            <FormDescription>
                              Your daily study time goal in hours
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="reminderFrequency"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Reminder Frequency</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="never" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Never remind me
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="hourly" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Hourly reminders during study time
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="sessions" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Only at the start of sessions
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="daily" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Once daily reminder
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={studyTimingForm.control}
                      name="autoStartNextSession"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center gap-2">
                              <TimerReset className="h-4 w-4" />
                              Auto-start Next Session
                            </FormLabel>
                            <FormDescription>
                              Automatically start the next study session after a break.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Timing Settings</Button>
                  </form>
                </Form>
              </div>
            )}
            
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the look and feel of the application.
                  </p>
                </div>
                <Separator />
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Theme
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a theme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the theme for the application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="fontSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            Font Size
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a font size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Adjust the font size for better readability.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={appearanceForm.control}
                        name="fontFamily"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Type className="h-4 w-4" />
                              Font Family
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a font family" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="default">System Default</SelectItem>
                                <SelectItem value="serif">Serif</SelectItem>
                                <SelectItem value="mono">Monospace</SelectItem>
                                <SelectItem value="rounded">Rounded</SelectItem>
                                <SelectItem value="display">Display</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose a font family for the interface.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={appearanceForm.control}
                        name="fontWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Type className="h-4 w-4" />
                              Font Weight
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a font weight" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="regular">Regular</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="bold">Bold</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Set the weight (thickness) of the text.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={appearanceForm.control}
                        name="lineHeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Type className="h-4 w-4" />
                              Line Height
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select line height" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tight">Tight</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="relaxed">Relaxed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Adjust the spacing between lines of text.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={appearanceForm.control}
                        name="letterSpacing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Type className="h-4 w-4" />
                              Letter Spacing
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select letter spacing" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tighter">Tighter</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="wider">Wider</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Adjust the spacing between characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={appearanceForm.control}
                        name="background"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Palette className="h-4 w-4" />
                              Background Style
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a background style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="default">Solid Color</SelectItem>
                                <SelectItem value="gradient">Gradient</SelectItem>
                                <SelectItem value="pattern">Subtle Pattern</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose a background style for the application.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={appearanceForm.control}
                        name="interfaceDensity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4" />
                              Interface Density
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select interface density" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="compact">Compact</SelectItem>
                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                <SelectItem value="spacious">Spacious</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Adjust the spacing and density of interface elements.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <div className="text-sm font-medium mb-2">Preview</div>
                      <div className={cn(
                        "rounded-lg border p-6 text-center",
                        currentBackground === 'gradient' ? 'bg-gradient-to-br from-background to-secondary/30' :
                        currentBackground === 'pattern' ? 'bg-background bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23999999\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")]' :
                        'bg-background'
                      )}>
                        <div className={cn(
                          "text-foreground",
                          currentFontFamily === 'serif' ? 'font-serif' : 
                          currentFontFamily === 'mono' ? 'font-mono' : 
                          currentFontFamily === 'rounded' ? 'font-["Nunito",_sans-serif]' :
                          currentFontFamily === 'display' ? 'font-["Playfair_Display",_serif]' :
                          'font-sans',
                          
                          currentFontSize === 'small' ? 'text-sm' : 
                          currentFontSize === 'large' ? 'text-lg' : 
                          'text-base',
                          
                          currentFontWeight === 'light' ? 'font-light' :
                          currentFontWeight === 'medium' ? 'font-medium' :
                          currentFontWeight === 'bold' ? 'font-bold' :
                          'font-normal',
                          
                          currentLineHeight === 'tight' ? 'leading-tight' :
                          currentLineHeight === 'relaxed' ? 'leading-relaxed' :
                          'leading-normal',
                          
                          currentLetterSpacing === 'tighter' ? 'tracking-tighter' :
                          currentLetterSpacing === 'wider' ? 'tracking-wider' :
                          'tracking-normal'
                        )}>
                          <p className="mb-4">This is how your text will appear</p>
                          <p className="text-xs text-muted-foreground mb-4">Font: {currentFontFamily}, Size: {currentFontSize}, Weight: {currentFontWeight}</p>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                          <Button size="sm" variant="default">Primary</Button>
                          <Button size="sm" variant="outline">Secondary</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit">Save appearance settings</Button>
                  </form>
                </Form>
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your security settings.
                  </p>
                </div>
                <Separator />
                <div className="space-y-6">
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Change Password
                        </h4>
                        
                        <FormField
                          control={securityForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormDescription>
                                Must be at least 8 characters long.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit">Update Password</Button>
                    </form>
                  </Form>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="outline">Set up 2FA</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Login Sessions</h4>
                    <p className="text-xs text-muted-foreground">
                      Manage your active login sessions.
                    </p>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Current Session</div>
                          <div className="text-xs text-muted-foreground">
                            Started: Today at 12:30 PM • Chrome on Windows
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">Current</div>
                      </div>
                      <Button variant="outline" className="w-full">Sign out of all devices</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "data" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Data & Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your data and privacy settings.
                  </p>
                </div>
                <Separator />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Study Data</h4>
                    <p className="text-xs text-muted-foreground">
                      Manage your study data and usage statistics.
                    </p>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Data Storage</div>
                          <div className="text-xs text-muted-foreground">
                            Your study data is stored locally on your device.
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Clear Data</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Export Data</h4>
                    <p className="text-xs text-muted-foreground">
                      Download a copy of your data from StudyPlanner.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline">Export All Data</Button>
                      <Button variant="outline">Export Study History</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Delete Account</h4>
                    <p className="text-xs text-muted-foreground">
                      This will permanently delete your account and all associated data.
                    </p>
                    <Button variant="destructive" className="mt-4">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
