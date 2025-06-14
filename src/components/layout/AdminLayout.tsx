
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield,
  LogOut,
  Bell,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard", roles: ["admin", "user"] },
  { id: "users", label: "Users", icon: Users, path: "/users", roles: ["admin"] },
  { id: "user-update", label: "User Profile", icon: UserCog, path: "/user-update", roles: ["admin", "user"] },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics", roles: ["admin", "manager"] },
  { id: "reports", label: "Reports", icon: FileText, path: "/reports", roles: ["admin", "manager"] },
  { id: "permissions", label: "Permissions", icon: Shield, path: "/permissions", roles: ["admin"] },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings", roles: ["admin", "user"] },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock user data - replace with actual user context
  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "/placeholder.svg"
  };

  const handleLogout = () => {
    // Add logout logic here - clear tokens, redirect to login
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(currentUser.role)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <div className={cn(
        "bg-blue-500 text-white transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-blue-400">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-bold text-lg">Admin Portal</h1>
                  <p className="text-blue-100 text-xs">Management System</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive 
                          ? "bg-blue-400 text-white" 
                          : "text-blue-50 hover:bg-blue-400 hover:text-white"
                      )}
                    >
                      <Icon size={20} />
                      {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-blue-400">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full bg-blue-300"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentUser.name}</p>
                  <p className="text-blue-100 text-sm truncate">{currentUser.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-3">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full bg-blue-300"
                />
              </div>
            )}
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-blue-50 hover:bg-blue-400 hover:text-white"
            >
              <LogOut size={16} />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
