import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setAuthenticated(true))
      .catch((error) => {
        // 401 is expected when user is not logged in - silently handle it
        if (error.response?.status !== 401) {
          console.error("Auth check failed:", error);
        }
        setAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
