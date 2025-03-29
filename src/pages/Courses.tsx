import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Plus, 
  MoreHorizontal, 
  BookOpen, 
  CheckCircle2, 
  SortAsc, 
  SortDesc, 
  Filter, 
  Calendar, 
  BookMarked, 
  BarChart, 
  AlarmClock,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CourseCard {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  hours: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  bgColor: string;
  chapters?: Chapter[];
  instructor?: string;
  lastAccessed?: string;
}

interface Chapter {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

type SortOption = "title-asc" | "title-desc" | "progress-asc" | "progress-desc";
type ViewMode = "grid" | "table";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("title-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCourse, setSelectedCourse] = useState<CourseCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const coursesPerPage = 6;
  
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
      instructor: "Dr. Alex Smith",
      lastAccessed: "Yesterday",
      chapters: [
        { id: "1-1", title: "Introduction to ML", duration: "1.5 hours", completed: true },
        { id: "1-2", title: "Linear Regression", duration: "2 hours", completed: true },
        { id: "1-3", title: "Decision Trees", duration: "2.5 hours", completed: false },
        { id: "1-4", title: "Neural Networks", duration: "3 hours", completed: false }
      ]
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
      instructor: "Prof. Maria Johnson",
      lastAccessed: "3 days ago",
      chapters: [
        { id: "2-1", title: "Limits and Continuity", duration: "2 hours", completed: true },
        { id: "2-2", title: "Differentiation", duration: "3 hours", completed: true },
        { id: "2-3", title: "Integration", duration: "3 hours", completed: false },
        { id: "2-4", title: "Applications", duration: "2 hours", completed: false }
      ]
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
      chapters: [
        { id: "3-1", title: "HTML Basics", duration: "1 hour", completed: true },
        { id: "3-2", title: "CSS Styling", duration: "2 hours", completed: true },
        { id: "3-3", title: "JavaScript Fundamentals", duration: "3 hours", completed: false }
      ]
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
      chapters: [
        { id: "4-1", title: "Introduction to Psychology", duration: "2 hours", completed: true },
        { id: "4-2", title: "Personality Theories", duration: "3 hours", completed: false }
      ]
    },
    {
      id: "5",
      title: "Data Structures and Algorithms",
      category: "Programming",
      description: "Fundamental data structures and algorithms used in computer science.",
      progress: 62,
      hours: "31/50",
      level: "Intermediate",
      bgColor: "bg-green-50",
      chapters: [
        { id: "5-1", title: "Arrays and Lists", duration: "1 hour", completed: true },
        { id: "5-2", title: "Linked Lists", duration: "2 hours", completed: true },
        { id: "5-3", title: "Trees and Graphs", duration: "3 hours", completed: false }
      ]
    },
    {
      id: "6",
      title: "Statistical Methods",
      category: "Mathematics",
      description: "Essential statistical techniques for data analysis and interpretation.",
      progress: 15,
      hours: "7/45",
      level: "Intermediate",
      bgColor: "bg-purple-50",
      chapters: [
        { id: "6-1", title: "Descriptive Statistics", duration: "1 hour", completed: true },
        { id: "6-2", title: "Inferential Statistics", duration: "2 hours", completed: true },
        { id: "6-3", title: "Regression Analysis", duration: "3 hours", completed: false }
      ]
    },
    {
      id: "7",
      title: "Artificial Intelligence Ethics",
      category: "Data Science",
      description: "Ethical considerations and implications of AI technologies.",
      progress: 90,
      hours: "27/30",
      level: "Advanced",
      bgColor: "bg-blue-50",
      chapters: [
        { id: "7-1", title: "AI Ethics Overview", duration: "1 hour", completed: true },
        { id: "7-2", title: "Bias and Fairness", duration: "2 hours", completed: true },
        { id: "7-3", title: "AI in Healthcare", duration: "3 hours", completed: false }
      ]
    }
  ];
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(courses.map(course => course.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [courses]);
  
  const filteredCourses = useMemo(() => {
    let filtered = courses;
    
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => 
        course.category === selectedCategory
      );
    }
    
    filtered = [...filtered].sort((a, b) => {
      if (sortOption === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "title-desc") {
        return b.title.localeCompare(a.title);
      } else if (sortOption === "progress-asc") {
        return a.progress - b.progress;
      } else {
        return b.progress - a.progress;
      }
    });
    
    return filtered;
  }, [courses, searchQuery, selectedCategory, sortOption]);
  
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleCourseClick = (course: CourseCard) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };
  
  const handleContinueCourse = (e: React.MouseEvent, course: CourseCard) => {
    e.stopPropagation();
    toast.success(`Continuing ${course.title}`);
  };

  const handleStartChapter = (e: React.MouseEvent, chapterId: string, chapterTitle: string) => {
    e.stopPropagation();
    
    navigate('/study-planner');
    
    toast.success(`Starting chapter: ${chapterTitle}`);
  };
  
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

      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <Input 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-1 justify-end">
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOption("title-asc")}>
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("title-desc")}>
                  Title (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("progress-asc")}>
                  Progress (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("progress-desc")}>
                  Progress (High to Low)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <BookOpen className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "table" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <Card 
              key={course.id} 
              className={`border overflow-hidden ${course.bgColor} hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => handleCourseClick(course)}
            >
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
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCourses.map((course) => (
                <TableRow 
                  key={course.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCourseClick(course)}
                >
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="h-2 w-24" />
                      <span className="text-sm">{course.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{course.hours}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleContinueCourse(e, course)}
                    >
                      Continue
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              
              if (
                pageNumber === 1 || 
                pageNumber === totalPages || 
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              if (
                (pageNumber === 2 && currentPage > 3) || 
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      <div className="mt-4 text-center text-muted-foreground text-sm">
        Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} courses
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{selectedCourse?.title}</span>
              <Badge variant="outline" className="font-normal">
                {selectedCourse?.level}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <BookMarked className="h-4 w-4 mr-1" />
                  {selectedCourse?.category}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedCourse?.hours} hours
                </span>
                {selectedCourse?.instructor && (
                  <span className="flex items-center">
                    <span className="font-medium mr-1">Instructor:</span> {selectedCourse.instructor}
                  </span>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <p className="mb-6">{selectedCourse?.description}</p>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Your Progress</h3>
                <span>{selectedCourse?.progress}%</span>
              </div>
              <Progress value={selectedCourse?.progress} className="h-3" />
              {selectedCourse?.lastAccessed && (
                <p className="text-sm text-muted-foreground mt-2">
                  Last accessed: {selectedCourse.lastAccessed}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Course Content</h3>
              <div className="rounded-md border overflow-hidden">
                {selectedCourse?.chapters?.map((chapter, index) => (
                  <div 
                    key={chapter.id} 
                    className={`flex items-center justify-between p-3 ${
                      index % 2 === 0 ? 'bg-muted/50' : ''
                    } ${
                      chapter.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="bg-primary/10 text-primary w-7 h-7 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                    {chapter.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => handleStartChapter(e, chapter.id, chapter.title)}
                      >
                        <AlarmClock className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => navigate('/study-planner')}>
                Continue Learning
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
