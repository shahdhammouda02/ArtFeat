import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  AuthState,
  LoginCredentials,
  SignUpCredentials,
  ArtistSignUpCredentials,
  StoredUser,
} from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  artistSignUp: (credentials: ArtistSignUpCredentials) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updatedData: Partial<StoredUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const users: StoredUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const storedUser = users.find(
      (u: StoredUser) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (storedUser) {
      const { ...userWithoutPassword } = storedUser;
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    const users: StoredUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    if (users.find((u: StoredUser) => u.email === credentials.email)) {
      throw new Error("User already exists");
    }

    const newStoredUser: StoredUser = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      type: "user",
      joinDate: new Date().toISOString(),
      password: credentials.password,
    };

    users.push(newStoredUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { ...userWithoutPassword } = newStoredUser;
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      isLoading: false,
    });
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  };

  const artistSignUp = async (credentials: ArtistSignUpCredentials) => {
    const users: StoredUser[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    if (users.find((u: StoredUser) => u.email === credentials.email)) {
      throw new Error("User already exists");
    }

    const newStoredUser: StoredUser = {
      id: Date.now().toString(),
      email: credentials.email,
      name: `${credentials.name}`,
      type: "artist",
      joinDate: new Date().toISOString(),
      password: credentials.password,
      storename: credentials.storename,
      country: credentials.country,
      city: credentials.city,
      businessRegistered: credentials.businessRegistered,
      portfolio: credentials.portfolio,
      bio: credentials.bio,
      specialties: credentials.specialties,
    };

    users.push(newStoredUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { ...userWithoutPassword } = newStoredUser;
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      isLoading: false,
    });
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem("currentUser");
  };

  
  const updateUserProfile = (updatedData: Partial<StoredUser>) => {
  if (!authState.user) return;

  const updatedUser = { ...authState.user, ...updatedData };
  
  setAuthState(prev => ({
    ...prev,
    user: updatedUser
  }));

  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  const users: StoredUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  const updatedUsers = users.map((u: StoredUser) => 
    u.id === updatedUser.id ? { ...u, ...updatedData } : u
  );
  
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

  return (
    <AuthContext.Provider
      value={{ ...authState, login, signUp, artistSignUp, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const Auth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
