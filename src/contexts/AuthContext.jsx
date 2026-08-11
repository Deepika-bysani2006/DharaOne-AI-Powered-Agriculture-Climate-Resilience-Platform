import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "../lib/firebase.js";

const AuthContext = createContext(null);

function getProviderName(user) {
  const providerId = user?.providerData?.[0]?.providerId;
  if (providerId === "google.com") return "Google";
  if (providerId === "password") return "Email";
  return "DharaOne";
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    setPersistence(auth, browserLocalPersistence).finally(() => {
      if (!active) return;
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    await credential.user.reload();
    setCurrentUser(auth.currentUser);
    return credential.user;
  }, []);

  const login = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), []);

  const loginWithGoogle = useCallback(() => signInWithPopup(auth, googleProvider), []);

  const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), []);

  const logout = useCallback(() => signOut(auth), []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      providerName: getProviderName(currentUser),
      signup,
      login,
      loginWithGoogle,
      resetPassword,
      logout,
    }),
    [currentUser, loading, login, loginWithGoogle, logout, resetPassword, signup],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
