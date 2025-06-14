// FastAPI Backend Integration Utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// API Response Types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
  };
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// HTTP Client with token handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Authentication API
export const authAPI = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", {
      username: email, // FastAPI typically uses 'username' field
      password: password,
    });
  },

  async logout(): Promise<void> {
    return apiClient.post<void>("/auth/logout");
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/me");
  },

  async refreshToken(): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/refresh");
  },
};

// Users API
export const usersAPI = {
  async getUsers(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    return apiClient.get<{ users: User[]; total: number }>(`/users?page=${page}&limit=${limit}`);
  },

  async getUserById(id: number): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  },

  async createUser(userData: Partial<User>): Promise<User> {
    return apiClient.post<User>("/users", userData);
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, userData);
  },

  async deleteUser(id: number): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`);
  },
};

// Analytics API
export const analyticsAPI = {
  async getDashboardStats(): Promise<{
    total_users: number;
    active_users: number;
    total_sessions: number;
    growth_rate: number;
  }> {
    return apiClient.get("/analytics/dashboard-stats");
  },

  async getUserGrowth(period: string = "30d"): Promise<{
    labels: string[];
    data: number[];
  }> {
    return apiClient.get(`/analytics/user-growth?period=${period}`);
  },
};

// Reports API
export const reportsAPI = {
  async getReports(): Promise<any[]> {
    return apiClient.get("/reports");
  },

  async generateReport(type: string, filters: any): Promise<any> {
    return apiClient.post("/reports/generate", { type, filters });
  },
};

// Settings API
export const settingsAPI = {
  async getSettings(): Promise<any> {
    return apiClient.get("/settings");
  },

  async updateSettings(settings: any): Promise<any> {
    return apiClient.put("/settings", settings);
  },
};

// Export the main API client for custom requests
export { apiClient };

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

// Utility function to get user role
export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};
