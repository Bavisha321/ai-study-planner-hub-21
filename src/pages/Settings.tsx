
import { useState } from "react";
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
  Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
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
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["small", "medium", "large"]),
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;
type StudyTimingFormValues = z.infer<typeof studyTimingFormSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "Student passionate about learning new things.",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
    console.log(data);
  }

  // Notifications form
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      studyReminders: true,
      deadlineAlerts: true,
      achievementNotifications: true,
      weeklyReports: true,
      inactivityReminders: false,
      marketingEmails: false,
    },
  });

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
    console.log(data);
  }

  // Appearance form
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "medium",
    },
  });

  function onAppearanceSubmit(data: AppearanceFormValues) {
    toast({
      title: "Appearance settings saved",
      description: "Your visual preferences have been updated.",
    });
    console.log(data);
  }

  // Security form
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSecuritySubmit(data: SecurityFormValues) {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    console.log(data);
  }

  // Study Timing form
  const studyTimingForm = useForm<StudyTimingFormValues>({
    resolver: zodResolver(studyTimingFormSchema),
    defaultValues: {
      defaultSessionLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
      sessionsBeforeLongBreak: 4,
      autoStartNextSession: false,
    },
  });

  function onStudyTimingSubmit(data: StudyTimingFormValues) {
    toast({
      title: "Study timing settings saved",
      description: "Your study session timing preferences have been updated.",
    });
    console.log(data);
  }

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
            <Tabs
              defaultValue="profile"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
              orientation="vertical"
            >
              <TabsList className="grid w-full grid-cols-1 h-auto">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <UserCog className="h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="timing" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>Study Timing</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <Moon className="h-4 w-4" />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="data" 
                  className="flex items-center justify-start gap-2 px-3 py-2"
                >
                  <Database className="h-4 w-4" />
                  <span>Data</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <TabsContent value="profile" className={activeTab === "profile" ? "block" : "hidden"}>
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
                            <Input placeholder="Tell us about yourself" {...field} />
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
            </TabsContent>
            
            <TabsContent value="account" className={activeTab === "account" ? "block" : "hidden"}>
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
            </TabsContent>
            
            <TabsContent value="notifications" className={activeTab === "notifications" ? "block" : "hidden"}>
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
                    <FormField
                      control={notificationsForm.control}
                      name="studyReminders"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center gap-2">
                              <BellRing className="h-4 w-4" />
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
                    <Button type="submit">Save preferences</Button>
                  </form>
                </Form>
              </div>
            </TabsContent>

            <TabsContent value="timing" className={activeTab === "timing" ? "block" : "hidden"}>
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
            </TabsContent>
            
            <TabsContent value="appearance" className={activeTab === "appearance" ? "block" : "hidden"}>
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
                          <FormLabel>Theme</FormLabel>
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
                          <FormLabel>Font Size</FormLabel>
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
                    <Button type="submit">Save preferences</Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className={activeTab === "security" ? "block" : "hidden"}>
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
            </TabsContent>
            
            <TabsContent value="data" className={activeTab === "data" ? "block" : "hidden"}>
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
            </TabsContent>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
