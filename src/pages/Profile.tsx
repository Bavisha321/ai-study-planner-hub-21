
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Lock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  avatar?: string;
  bio?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Simulate loading user profile data
    setTimeout(() => {
      // This would normally come from an API or authentication service
      // For demo purposes, we're creating a mock profile
      const mockProfile: UserProfile = {
        name: "Alex Johnson",
        email: localStorage.getItem('userEmail') || "alex.johnson@example.com",
        role: "Student",
        joinedDate: "April 2025",
        bio: "Computer Science major with a focus on AI and machine learning. Looking to improve my study habits and time management skills."
      };
      
      setUserProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        bio: mockProfile.bio || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          name: formData.name,
          email: formData.email,
          bio: formData.bio
        };
        setUserProfile(updatedProfile);
        setIsEditing(false);
        setIsLoading(false);
        toast.success("Profile updated successfully!");
      }
    }, 1000);
  };

  const handleChangePassword = () => {
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    
    if (!formData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to change password
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setIsLoading(false);
      toast.success("Password changed successfully!");
    }, 1000);
  };

  if (isLoading && !userProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={userProfile?.avatar} alt={userProfile?.name} />
              <AvatarFallback className="text-2xl bg-primary/10">
                {userProfile?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{userProfile?.name}</h1>
              <p className="text-muted-foreground">{userProfile?.role} • Joined {userProfile?.joinedDate}</p>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User size={18} />
                <span>Profile Info</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Settings size={18} />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={18} />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input 
                          id="bio" 
                          name="bio" 
                          value={formData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                          <p>{userProfile?.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p>{userProfile?.email}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                        <p className="mt-1">{userProfile?.bio || "No bio provided."}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">Account Type</h3>
                    <p className="text-muted-foreground">{userProfile?.role}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Member Since</h3>
                    <p className="text-muted-foreground">{userProfile?.joinedDate}</p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword"
                        type="password" 
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type="password" 
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleChangePassword}
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Change Password"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Profile;
