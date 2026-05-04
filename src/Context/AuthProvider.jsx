import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

const normalizeRole = (role) => {
  if (role === "artist" || role === "admin") {
    return role;
  }

  if (role === "buyer" || role === "collector") {
    return "customer";
  }

  return "customer";
};

const createFallbackProfile = (currentUser) => ({
  _id: currentUser.uid,
  id: currentUser.uid,
  uid: currentUser.uid,
  name: currentUser.displayName || currentUser.email?.split("@")[0] || "User",
  email: currentUser.email || "",
  role: "customer",
  photoUrl: currentUser.photoURL || "",
  username: currentUser.email?.split("@")[0] || "",
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const fetchUserProfile = async (currentUser) => {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error("Unable to fetch user profile");
    }

    const data = await response.json();
    const users = Array.isArray(data) ? data : [];
    const matchedUser =
      users.find(
        (currentProfile) =>
          currentProfile?.email === currentUser.email ||
          currentProfile?.uid === currentUser.uid ||
          currentProfile?._id === currentUser.uid ||
          currentProfile?.id === currentUser.uid,
      ) || createFallbackProfile(currentUser);

    setProfile(matchedUser);
    setRole(normalizeRole(matchedUser?.role));
  };

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        await fetchUserProfile(currentUser);
      } catch {
        if (!active) return;
        const fallbackProfile = createFallbackProfile(currentUser);
        setProfile(fallbackProfile);
        setRole(fallbackProfile.role);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    user,
    profile,
    role,
    isCustomer: role === "customer",
    isArtist: role === "artist",
    loading,
    signInUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
