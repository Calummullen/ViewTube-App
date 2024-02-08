import { Nav } from "@/components/nav";
import { AppContextProvider } from "@/utils/context/app.context";
import { getUser } from "@/utils/supabase/userHelper";
import { redirect } from "next/navigation";
import { FC, ReactNode, Suspense, useContext } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }
  console.log("rerender");

  return (
    <AppContextProvider>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav user={user} />
        </Suspense>
        <div className="min-h-screen md:ml-80 flex flex-col">
          <div className="p-4 mt-12 md:mt-0 ">{children}</div>
        </div>
      </div>
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
