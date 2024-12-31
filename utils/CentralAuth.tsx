import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// children --> Represents the actual htmx code that's used
// React.ReactNode --> Set's the type of the component to a react element
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => { 
    // checks if there's currently a user logged at the current instance this variable is called
    const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      if(auth.currentUser === null) {
        router.push("/");
        return;
      }
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user); 
        setLoading(false); 
      });
      
      return () => unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
