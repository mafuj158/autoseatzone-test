import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Set token in state and localStorage
  const updateToken = useCallback((newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, []);

  // Fetch user data when token changes
  const { refetch: refetchUser, isLoading: isUserLoading} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      try {
        const response = await axiosSecure.get("/me");
        setUser(response.data);
        return response.data;
      } catch (error) {
        updateToken(null);
        return null;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosPublic.post("/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      updateToken(data.token);
      toast.success("Login successful!");
      return data; // Return data for component to handle navigation
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
      throw error; // Re-throw error for component to handle
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axiosPublic.post("/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Welcome ${data.name}! Please verify your email.`);
      return data; // Return data for component to handle navigation
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error; // Re-throw error for component to handle
    },
  });

  // Logout function
  const logout = useCallback(() => {
    updateToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    return true; // Return success status
  }, [updateToken]);

  // Sync token across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "accessToken") {
        setToken(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Auto-logout on 401 errors
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [axiosSecure, logout]);

  const value = {
    user,
    isUserLoading,
    token,
    isAuthenticated: !!token,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
