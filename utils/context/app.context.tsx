"use client";

import {
  createContext,
  useCallback,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";
import { createClient } from "@/utils/supabase/client";
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
};

export const AppContext = createContext<Context>({} as Context);

export const AppContextProvider: FC<{
  children: React.ReactNode;
  avatar: string;
  user: User;
}> = ({ children, avatar: userAvatar, user: userData }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-theme") || "light"
  );
  const [avatar, setAvatar] = useState<string>(userAvatar);
  const [user, setUser] = useState<User>(userData);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("data-theme", theme);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        updateTheme,
        avatar,
        setAvatar,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
