import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  AppContext,
  AppContextProvider,
  useApp,
} from "@/utils/context/app.context";
import { useContext, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import cn from "classnames";
import { ToastContainer } from "react-toastify";
import { getUser } from "@/utils/supabase/userHelper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log("user", user);

  // useEffect(() => {
  //   document.body.classList.add("overflow:hidden");
  // }, [showNavbar]);
  return (
    <AppContextProvider avatar={""} user={user || ({} as User)}>
      <html lang="en" data-theme={user?.user_metadata.dataTheme}>
        <head>
          <title>ViewTube - Test</title>
          <meta name="metadataBase" content={defaultUrl} />
        </head>
        {/* <body className="bg-black text-foreground"> */}
        <body className="font-gtwalsheim">
          <main>
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <ToastContainer />
        </body>
      </html>
    </AppContextProvider>
  );
}
