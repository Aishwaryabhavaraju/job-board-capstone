import { createContext, useState, useEffect, useContext } from "react";
import { notifyError } from "../utils/toast";

const AuthContext = createContext(null);

export const BASE_URL = "http://localhost:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(true);

  // Set auth state helper
  const saveAuth = (accessToken, refreshToken, userData) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);
    setUser(userData);
  };

  // Clear auth state helper
  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setUser(null);
  };

  // Fetch current user details
  const fetchCurrentUser = async (accessToken) => {
    try {
      const res = await fetch(`${BASE_URL}/api/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Try refresh
        await handleTokenRefresh();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  // Refresh JWT Token
  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      clearAuth();
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        const access = data.access;
        localStorage.setItem("access_token", access);
        setToken(access);
        // Retry fetching user with new token
        const userRes = await fetch(`${BASE_URL}/api/me/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        } else {
          clearAuth();
        }
      } else {
        clearAuth();
      }
    } catch (err) {
      console.error("Refresh error:", err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  // Initialize Auth state from localStorage
  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Invalid email or password.");
      }

      saveAuth(data.access, data.refresh, data.user);
      return { success: true, user: data.user };
    } catch (err) {
      notifyError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Register handler
  const register = async (username, email, password, role) => {
    try {
      // Map candidate -> job_seeker to align with backend choices
      const backendRole = role === "candidate" ? "job_seeker" : "employer";
      const res = await fetch(`${BASE_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: password, // DRF serializer expects confirm_password
          role: backendRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        let errorMsg = "Registration failed.";
        if (data && typeof data === "object") {
          const firstKey = Object.keys(data)[0];
          if (firstKey) {
            const val = data[firstKey];
            if (Array.isArray(val)) {
              errorMsg = `${firstKey}: ${val[0]}`;
            } else if (typeof val === "string") {
              errorMsg = `${firstKey}: ${val}`;
            } else {
              errorMsg = JSON.stringify(val);
            }
          }
        }
        throw new Error(errorMsg);
      }

      return { success: true };
    } catch (err) {
      notifyError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout handler
  const logout = () => {
    clearAuth();
  };

  const authenticatedFetch = async (url, options = {}) => {
    let currentToken = localStorage.getItem("access_token");
    if (!currentToken) {
      throw new Error("No access token found");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${currentToken}`,
    };

    let res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      // Token might be expired, try refreshing
      await handleTokenRefresh();
      currentToken = localStorage.getItem("access_token");
      if (currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
        res = await fetch(url, { ...options, headers });
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        authenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
