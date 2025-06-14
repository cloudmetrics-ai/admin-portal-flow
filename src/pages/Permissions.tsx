
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Key } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export const Permissions = () => {
  const [roles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access",
      userCount: 3,
      permissions: ["users.read", "users.write", "analytics.read", "reports.read", "settings.write"]
    },
    {
      id: "manager",
      name: "Manager",
      description: "Limited management access",
      userCount: 8,
      permissions: ["users.read", "analytics.read", "reports.read"]
    },
    {
      id: "user",
      name: "User",
      description: "Basic user access",
      userCount: 45,
      permissions: ["analytics.read"]
    }
  ]);

  const [permissions] = useState<Permission[]>([
    { id: "users.read", name: "View Users", description: "View user list and details", category: "Users" },
    { id: "users.write", name: "Manage Users", description: "Create, edit, and delete users", category: "Users" },
    { id: "analytics.read", name: "View Analytics", description: "Access analytics dashboard", category: "Analytics" },
    { id: "reports.read", name: "View Reports", description: "Access and download reports", category: "Reports" },
    { id: "settings.write", name: "Manage Settings", description: "Modify system settings", category: "Settings" },
  ]);

  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "administrator": return "bg-red-100 text-red-800";
      case "manager": return "bg-orange-100 text-orange-800";
      case "user": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissions & Roles</h1>
          <p className="text-gray-600">Manage user roles and system permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Shield className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <Badge className={getRoleColor(role.name)}>{role.name}</Badge>
              </div>
              <h3 className="font-bold text-lg mb-2">{role.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {role.userCount} users
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Permission Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center py-3 px-4 font-medium text-gray-700">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr key={permission.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{permission.name}</div>
                        <div className="text-sm text-gray-500">{permission.description}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {permission.category}
                        </Badge>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={`${permission.id}-${role.id}`} className="py-3 px-4 text-center">
                        <Switch 
                          checked={role.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            // Handle permission toggle
                            console.log(`Toggle ${permission.id} for ${role.name}: ${checked}`);
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-gray-500">{role.permissions.length} permissions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{role.userCount}</p>
                    <p className="text-sm text-gray-500">users</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Admin role updated with new permissions</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>New Manager role created</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>User permissions modified</span>
                <span className="text-gray-500 ml-auto">3d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
