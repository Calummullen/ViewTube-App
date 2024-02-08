"use client";

import { createContext, FC, useState } from "react";

type Context = {
  theme: string;
  updateTheme: (theme: string) => void;
};

export const AppContext = createContext<Context>({} as Context);

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-theme") || "light"
  );

  const updateTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("data-theme", theme);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        updateTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
