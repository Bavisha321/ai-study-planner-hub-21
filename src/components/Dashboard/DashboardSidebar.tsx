
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BarChart2, BookOpen, Calendar, Home, Settings } from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/home',
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700",
      iconBg: "bg-blue-100"
    },
    { 
      icon: BookOpen, 
      label: 'Courses', 
      path: '/courses',
      gradient: "from-purple-500 to-violet-600",
      hoverGradient: "from-purple-600 to-violet-700",
      iconBg: "bg-purple-100"
    },
    { 
      icon: BarChart2, 
      label: 'Analytics', 
      path: '/analytics',
      gradient: "from-green-500 to-emerald-600",
      hoverGradient: "from-green-600 to-emerald-700",
      iconBg: "bg-green-100"
    },
    { 
      icon: Calendar, 
      label: 'Study Planner', 
      path: '/study-planner',
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "from-amber-600 to-orange-700",
      iconBg: "bg-amber-100"
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      gradient: "from-slate-500 to-slate-600",
      hoverGradient: "from-slate-600 to-slate-700",
      iconBg: "bg-slate-100"
    },
  ];
  
  return (
    <div className="hidden md:flex flex-col w-60 h-screen fixed left-0 top-0 pt-20 bg-gradient-to-b from-gray-50 to-white shadow-lg z-40">
      <div className="p-4 border-b border-border/40">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">StudyPlanner</h2>
      </div>
      
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-none bg-pattern-grid">
        <ul className="space-y-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="card-hover-effect">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                      : `text-slate-700 hover:bg-gradient-to-r hover:${item.hoverGradient} hover:text-white`
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center p-2 rounded-md",
                    isActive ? "bg-white/20" : item.iconBg
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : `text-${item.gradient.split('-')[1].split(' ')[0]}`
                    )} />
                  </span>
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="ml-auto mr-1 h-2 w-2 rounded-full bg-white animate-pulse-soft"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <p className="text-xs text-blue-700 font-medium text-center">AI Study Assistant</p>
          <p className="text-xs text-blue-600/80 mt-1 text-center">Here to help you learn better!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
