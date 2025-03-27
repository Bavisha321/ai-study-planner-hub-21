
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Plus, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CourseCard {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  hours: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  bgColor: string;
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const courses: CourseCard[] = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      category: "Data Science",
      description: "Core concepts and algorithms in machine learning with practical applications.",
      progress: 38,
      hours: "15/40",
      level: "Intermediate",
      bgColor: "bg-blue-50",
    },
    {
      id: "2",
      title: "Advanced Calculus",
      category: "Mathematics",
      description: "In-depth exploration of multivariable calculus and its applications.",
      progress: 40,
      hours: "20/50",
      level: "Advanced",
      bgColor: "bg-purple-50",
    },
    {
      id: "3",
      title: "Web Development Basics",
      category: "Programming",
      description: "Introduction to HTML, CSS, and JavaScript for building websites.",
      progress: 83,
      hours: "25/30",
      level: "Beginner",
      bgColor: "bg-green-50",
    },
    {
      id: "4",
      title: "Introduction to Psychology",
      category: "Social Sciences",
      description: "Exploration of human behavior and mental processes.",
      progress: 23,
      hours: "8/35",
      level: "Beginner",
      bgColor: "bg-yellow-50",
    }
  ];
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Courses</h1>
          <p className="text-muted-foreground">Manage your course catalog</p>
        </div>
        <Button className="mt-4 md:mt-0" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Add Course
        </Button>
      </div>

      <div className="mb-8 max-w-md">
        <Input 
          placeholder="Search courses..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className={`border overflow-hidden ${course.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              
              <Badge variant="outline" className="mb-3 bg-white/80">
                {course.category}
              </Badge>
              
              <p className="text-sm text-muted-foreground mb-6">
                {course.description}
              </p>
              
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.hours} hours</span>
                </div>
                <Badge variant="secondary" className="font-normal">
                  {course.level}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
