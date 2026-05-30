import { useState, useEffect, useCallback, createContext, useContext } from "react";

export const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("vg_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.ok && data.user) {
          setUser(data.user);
        } else {
          // Token invalid — clear it
          localStorage.removeItem("vg_token");
        }
      } catch (err) {
        // Backend not reachable — try local session fallback
        console.log("Backend not reachable, checking local session...");
        try {
          const session = localStorage.getItem("vg_session");
          if (session) setUser(JSON.parse(session));
        } catch {}
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

    const register = useCallback(async ({ name, email, password, role }) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: role || 'Farmer' })
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                localStorage.setItem('vg_token', data.token);
                localStorage.setItem('vg_session', JSON.stringify(data.user));
                setUser(data.user);
                return { ok: true };
            }
            return { ok: false, error: data.error || 'Registration failed.' };
        } catch (err) {
            console.error('Register error:', err);
            return { ok: false, error: 'An unexpected error occurred.' };
        }
    }, []);

    const login = useCallback(async ({ email, password }) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                localStorage.setItem('vg_token', data.token);
                localStorage.setItem('vg_session', JSON.stringify(data.user));
                setUser(data.user);
                return { ok: true };
            }
            return { ok: false, error: data.error || 'Incorrect email or password.' };
        } catch (err) {
            console.error('Login error:', err);
            return { ok: false, error: 'An unexpected error occurred.' };
        }
    }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("vg_token");
    localStorage.removeItem("vg_session");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
