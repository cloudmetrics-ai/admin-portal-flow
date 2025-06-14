
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Save, Database, Mail, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Admin Portal",
    siteDescription: "Management System for your organization",
    emailNotifications: true,
    securityAlerts: true,
    maintenanceMode: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    backupFrequency: "daily",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "admin@example.com",
    smtpPassword: "",
  });

  const handleSave = () => {
    // Here you would call the settings API
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your application settings</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Select 
                value={settings.sessionTimeout} 
                onValueChange={(value) => handleInputChange("sessionTimeout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange("siteDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Security Alerts</Label>
                <p className="text-sm text-gray-500">Get notified about security-related events</p>
              </div>
              <Switch 
                checked={settings.securityAlerts}
                onCheckedChange={(checked) => handleInputChange("securityAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Enable maintenance mode for system updates</p>
              </div>
              <Switch 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Select 
                value={settings.maxLoginAttempts} 
                onValueChange={(value) => handleInputChange("maxLoginAttempts", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select 
                value={settings.backupFrequency} 
                onValueChange={(value) => handleInputChange("backupFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={settings.smtpHost}
                onChange={(e) => handleInputChange("smtpHost", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={settings.smtpPort}
                onChange={(e) => handleInputChange("smtpPort", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={settings.smtpUsername}
                onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Application</h4>
              <div className="text-sm text-gray-600">
                <p>Version: 1.0.0</p>
                <p>Environment: Production</p>
                <p>Last Updated: 2024-01-15</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Database</h4>
              <div className="text-sm text-gray-600">
                <p>Status: Connected</p>
                <p>Version: PostgreSQL 14.0</p>
                <p>Last Backup: 2024-01-15 02:00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
