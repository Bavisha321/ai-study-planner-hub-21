
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BarChart2, BookOpen, Calendar, Home, Settings, Clock } from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/home' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Calendar, label: 'Study Planner', path: '/study-planner' },
    { icon: Clock, label: 'Study Timer', path: '/timer' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div className="hidden md:flex flex-col w-60 border-r border-border/40 h-screen fixed left-0 top-0 pt-20 bg-background z-40">
      <div className="p-4 border-b border-border/40">
        <h2 className="text-xl font-bold text-primary">StudyPlanner</h2>
      </div>
      
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
