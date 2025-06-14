
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TrendingUp, DollarSign } from "lucide-react";
import { analyticsAPI } from "@/utils/api";
import { toast } from "@/hooks/use-toast";

interface DashboardStats {
  total_users: number;
  active_users: number;
  total_sessions: number;
  growth_rate: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    active_users: 0,
    total_sessions: 0,
    growth_rate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await analyticsAPI.getDashboardStats();
      setStats(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: stats.active_users.toLocaleString(),
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Sessions",
      value: stats.total_sessions.toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Growth Rate",
      value: `${stats.growth_rate.toFixed(1)}%`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-blue-100">
          Monitor your application's performance and manage users effectively.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New user registered</span>
                <span className="text-xs text-gray-500 ml-auto">2 mins ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">System backup completed</span>
                <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Server maintenance scheduled</span>
                <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-gray-500">Add or edit users</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <Activity className="w-6 h-6 text-green-600 mb-2" />
                <div className="font-medium">View Analytics</div>
                <div className="text-sm text-gray-500">Check performance</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
