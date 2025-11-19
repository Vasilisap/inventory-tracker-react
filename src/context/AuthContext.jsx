import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCurrentUser,
  onAuthStateChange,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { user } = await fetchCurrentUser();
      setUser(user);
      setInitialLoading(false);
    }

    init();

    const unsubscribe = onAuthStateChange((nextUser) => {
      setUser(nextUser);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(email, password) {
    const { data, error } = await signInWithEmail(email, password);
    return { data, error };
  }

  async function signUp(email, password) {
    const { data, error } = await signUpWithEmail(email, password);

    return { data, error };
  }

  async function signOut() {
    const { error } = await signOutUser();
    return { error };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: initialLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
