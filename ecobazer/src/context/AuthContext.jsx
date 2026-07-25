import { createContext, useEffect, useState, useCallback } from "react";
import { loginUser as loginUserApi } from "../services/authService";
import { getErrorMessage } from "../utils/getErrorMessage";

export const AuthContext = createContext(null);

const TOKEN_KEY = "ecobazer_token";
const USER_KEY = "ecobazer_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);

    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [loading, setLoading] = useState(false);

  // Save token
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  // Save user
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);

    try {
      const { data } = await loginUserApi(credentials);

      console.log("LOGIN RESPONSE:", data);

      const nextUser = {
        id: data.user?.id || data.user?._id || null,

        firstName: data.user?.firstName || "",

        lastName: data.user?.lastName || "",

        email: data.user?.email || "",

        phoneNumber: data.user?.phoneNumber || "",

        profile: data.user?.profile || "",

        role: data.user?.role || "user",
      };

      console.log("SAVE USER:", nextUser);

      setToken(data.token);

      setUser(nextUser);

      return {
        success: true,

        user: nextUser,
      };
    } catch (error) {
      return {
        success: false,

        message: getErrorMessage(error, "Invalid email or password."),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user after profile edit

  const updateUserData = (updatedData) => {
    const newUser = {
      ...user,

      ...updatedData,
    };

    setUser(newUser);
  };

  const logout = useCallback(() => {
    setToken(null);

    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token && user?.id);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        loading,

        login,

        logout,

        isAuthenticated,

        isAdmin,

        setUser,

        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
