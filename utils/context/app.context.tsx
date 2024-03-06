"use client";

import { createContext, FC, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export interface CustomBlob {
  size: number;
  type: string;
}

type Context = {
  theme: string;
  updateTheme: (theme: string) => void;
  avatar: string;
  setAvatar: (url: string) => void;
  user: User;
  setUser: (user: User) => void;
  showNavbar: boolean;
  setShowNavbar: (flag: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const AppContext = createContext<Context>({} as Context);

export const AppContextProvider: FC<{
  children: React.ReactNode;
  avatar: string;
  user: User;
}> = ({ children, avatar: userAvatar, user: userData }) => {
  // const [theme, setTheme] = useState<string>(
  //   typeof window !== "undefined"
  //     ? localStorage.getItem("data-theme") || "pog"
  //     : "pig"
  // );
  const [theme, setTheme] = useState<string>(
    userData?.user_metadata?.dataTheme || "light"
  );
  // useEffect(() => {
  //   document.querySelector("html")?.setAttribute("data-theme", theme);
  // }, []);

  console.log("context", theme);

  const [avatar, setAvatar] = useState<string>(userAvatar);
  const [user, setUser] = useState<User>(userData);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    showNavbar
      ? document.body.classList.add("disable-overflow")
      : document.body.classList.remove("disable-overflow");
  }, [showNavbar]);

  const updateTheme = (theme: string) => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
    setTheme(theme);
  };

  // useEffect(() => {
  //   const test = localStorage.getItem("data-theme");
  //   console.log("hwerwe123", test);
  //   setTheme(localStorage.getItem("data-theme") || "light");
  // }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        updateTheme,
        avatar,
        setAvatar,
        user,
        setUser,
        showNavbar,
        setShowNavbar,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
