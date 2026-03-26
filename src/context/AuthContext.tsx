import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "student" | "job-seeker" | "employee" | "other";

type User = {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isProfileComplete: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "lpk_current_user";
const USERS_KEY = "lpk_users";

const getUsers = (): User[] => {
  const saved = localStorage.getItem(USERS_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedCurrentUser) {
      setUser(JSON.parse(savedCurrentUser));
    }
  }, []);

  const saveCurrentUser = (nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
    else localStorage.removeItem(CURRENT_USER_KEY);
  };

  const signUp = (email: string, password: string) => {
    const users = getUsers();
    const existing = users.find((u) => u.email === email);

    if (existing) {
      saveCurrentUser(existing);
      return;
    }

    const newUser: User = { email, password };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    saveCurrentUser(newUser);
  };

  const signIn = (email: string, password: string) => {
    const users = getUsers();
    const existing = users.find((u) => u.email === email && u.password === password);

    if (!existing) return false;

    saveCurrentUser(existing);
    return true;
  };

  const signOut = () => {
    saveCurrentUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };

    const users = getUsers().map((u) =>
      u.email === user.email ? updatedUser : u
    );

    saveUsers(users);
    saveCurrentUser(updatedUser);
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isProfileComplete: !!(user?.firstName && user?.lastName && user?.role),
      signUp,
      signIn,
      signOut,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};