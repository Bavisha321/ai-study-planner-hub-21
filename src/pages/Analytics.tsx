
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  BarChart2, 
  Clock, 
  Award,
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format, parseISO } from "date-fns";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7days");
  
  // New mock data for the daily study hours chart using ISO date strings
  const dailyData = [
    { date: '2024-04-15', hours: 2.5 },
    { date: '2024-04-16', hours: 3.0 },
    { date: '2024-04-17', hours: 1.5 },
    { date: '2024-04-18', hours: 4.0 },
    { date: '2024-04-19', hours: 2.0 },
    { date: '2024-04-20', hours: 1.0 },
    { date: '2024-04-21', hours: 2.0 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your study progress and patterns</p>
      </div>
      
      <div className="flex justify-end mb-6">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-background border rounded-md px-4 py-2 text-sm"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Study Time */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>Total Study Time</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">16h 25m</span>
                <span className="text-sm text-muted-foreground">Across 9 sessions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Activity className="h-4 w-4 mr-1" />
                <span>Completion Rate</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-3xl font-bold">67%</span>
                <Progress value={67} className="h-2 bg-secondary/50" />
                <span className="text-sm text-muted-foreground">6 of 9 sessions completed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Streak */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Award className="h-4 w-4 mr-1" />
                <span>Study Streak</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">7 days</span>
                <span className="text-sm text-muted-foreground">Your current streak</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subjects */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <BarChart2 className="h-4 w-4 mr-1" />
                <span>Active Subjects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">4</span>
                <span className="text-sm text-muted-foreground">Subjects you're studying</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Study Overview</TabsTrigger>
          <TabsTrigger value="distribution">Subject Distribution</TabsTrigger>
          <TabsTrigger value="analysis">Session Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Daily Study Hours</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(dateStr) => format(parseISO(dateStr), "MMM d")} 
                      label={{ value: 'Date', position: 'insideBottom', offset: -8 }}
                    />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Bar dataKey="hours" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution">
          <Card>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Subject distribution visualization will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Session analysis data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

