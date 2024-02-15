import LoadingSpinner from "@/components/loading-spinner";
import { Nav } from "@/components/nav";
import { AppContextProvider, CustomBlob } from "@/utils/context/app.context";
import { getUser, getUserAvatar, test } from "@/utils/supabase/userHelper";
import { redirect } from "next/navigation";
import { FC, ReactNode, Suspense } from "react";
import Loading from "./loading";
import AppLayout from "@/components/app-layout";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const avatar = await getUserAvatar(user.id);

  return (
    <AppContextProvider avatar={avatar} user={user}>
      <AppLayout>{children}</AppLayout>
    </AppContextProvider>
  );
};

export default DashboardLayout;

// import { GeistSans } from "geist/font/sans";
// import "./globals.css";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3001";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={GeistSans.className}>
//       <body className="bg-black text-foreground">
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }
