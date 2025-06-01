import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import * as jose from "jose";
import { useNavigate } from "react-router-dom";
import { ApiConfig } from "../api/ApiConfig";
import { TOKEN_KEY } from "../constants/textConstants";
const AuthContext = createContext();

// Helper function to decode and validate a token
export const decodeToken = (token) => {
  try {
    const decoded = jose.decodeJwt(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("Token expired.");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAuth(null);
    if (window.location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const login = (token) => {
    const decoded = decodeToken(token);
    if (decoded) {
      localStorage.setItem(TOKEN_KEY, token);
      const user = {
        ...decoded,
        role: decoded.role || null,
      };
      setAuth({ token, user });
    } else {
      logout();
    }
  };

  // Check token on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        ApiConfig.validateToken(storedToken)
          .then((response) => {
            const user = response.user || decodeToken(storedToken);
            if (user) {
              setAuth({ token: storedToken, user });
            } else {
              logout();
            }
          })
          .catch(() => {
            logout();
          });
      }
    }
  }, [logout]);

  // Auto-logout when token expires
  useEffect(() => {
    if (auth?.user?.exp) {
      const expirationTime = auth.user.exp * 1000 - Date.now();
      const timer = setTimeout(() => {
        console.warn("Token expired automatically.");
        logout();
      }, expirationTime);

      return () => clearTimeout(timer);
    }
  }, [auth, logout]);

  const isAuthenticated = !!auth;

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      isAuthenticated,
    }),
    [auth, login, logout] // Recreate the value only when any of these dependencies change
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
