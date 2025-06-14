
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText, BarChart3 } from "lucide-react";

export const Reports = () => {
  const [reportType, setReportType] = useState("users");
  const [dateRange, setDateRange] = useState("30d");

  const reports = [
    {
      id: 1,
      name: "User Activity Report",
      type: "Users",
      date: "2024-01-15",
      status: "completed",
      size: "2.5 MB"
    },
    {
      id: 2,
      name: "Revenue Analysis",
      type: "Finance",
      date: "2024-01-14",
      status: "processing",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "System Performance",
      type: "Technical",
      date: "2024-01-13",
      status: "completed",
      size: "3.2 MB"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download system reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">User Report</SelectItem>
                  <SelectItem value="analytics">Analytics Report</SelectItem>
                  <SelectItem value="finance">Financial Report</SelectItem>
                  <SelectItem value="system">System Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">{report.type}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {report.date}
                      </div>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(report.status)}
                  {report.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
