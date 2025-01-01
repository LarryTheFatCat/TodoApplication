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
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const app = initializeApp(firebaseConfig); // init firebase instance, using configuration provided
    const auth = getAuth(app); // checks if there's currently a user logged at the current instance this variable is called
    // checks for page name
    if(router.pathname === "/reset" || router.pathname === "/register") {
      return;
    }
      // // whilst there's no current active user / no logged user (null), return back to login page
      // if (auth.currentUser === null) {
      //   router.push("/");
      //   return;
      // }
    // listener for any changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    // AuthContext.Provider --> crovides the context for the user and loading state
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// useAuth --> custom hook that returns the context of the user and loading state
export const useAuth = () => useContext(AuthContext);
