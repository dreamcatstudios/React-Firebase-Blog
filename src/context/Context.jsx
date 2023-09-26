import React, { createContext, useEffect, useState } from "react";
import { auth, provider } from "../config/Firestore"; // Assuming you have these functions in your Firestore module
// import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { redirect } from "react-router-dom";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [postLists, setPostList] = useState([]);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuthState = () => {
    const isAuthString = localStorage.getItem("isAuth");
    const isAuth = isAuthString === "true"; // Convert the stored string to a boolean
    return isAuth;
  };

  useEffect(() => {
    // Check the authentication state when the component mounts
    const authState = checkAuthState();
    setIsAuth(authState);
  }, [setIsAuth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("isAuth", false);
      setIsAuth(false);
      setPostList([]);
      redirect("/");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        signInWithGoogle,
        signOut: handleSignOut,
        isAuth,
        setIsAuth,
        postLists,
        setPostList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
