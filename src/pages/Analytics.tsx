
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import { analyticsAPI } from "@/utils/api";
import { toast } from "@/hooks/use-toast";

export const Analytics = () => {
  const [period, setPeriod] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsAPI.getUserGrowth(period);
      setChartData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
      console.error("Analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Monitor your application's performance and growth</p>
        </div>
        <div className="flex space-x-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">12,543</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">8,421</p>
                <p className="text-sm text-green-600">+8.2% from last month</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.24%</p>
                <p className="text-sm text-red-600">-2.1% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
                <p className="text-2xl font-bold text-gray-900">4m 32s</p>
                <p className="text-sm text-green-600">+15.3% from last month</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart will be rendered here</p>
                  <p className="text-sm text-gray-400">
                    Data points: {chartData.data.length}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Direct</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="w-16 h-2 bg-blue-600 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">67%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Search Engines</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="w-8 h-2 bg-green-600 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">33%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Media</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="w-12 h-2 bg-purple-600 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">50%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
