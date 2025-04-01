/* 
  psy21d 
  Apche 2.0 licensed
*/
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { firebaseAuth } from "@/lib/firebase/config";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const publicPaths = ["/", "/login", "/signup"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();
  const pathname = usePathname();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(userCredential.user);
      push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(userCredential.user);
      push("/");
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(firebaseAuth);
      setUser(null);
      push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(firebaseAuth, provider);

    setUser(userCredential?.user);
    push("/");
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    const userCredential = await signInWithPopup(firebaseAuth, provider);

    setUser(userCredential?.user);
    push("/");
  };

  // useEffect(() => {
  //   // @FIXME: move logic to middleware
  //   const isPublicPath = publicPaths.includes(pathname);

  //   if (!isLoading) {
  //     if (!user && !isPublicPath) {
  //       push("/login");
  //     } else if (user && isPublicPath) {
  //       push("/");
  //     }
  //   }
  // }, [user, isLoading, pathname, push]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        setUser(firebaseUser);
        localStorage.setItem("user-uid", JSON.stringify(firebaseUser?.uid));
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    signInWithGoogle,
    signInWithApple,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
