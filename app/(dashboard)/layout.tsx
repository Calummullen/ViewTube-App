import { Nav } from "@/components/nav";
import { getUser } from "@/utils/supabase/userHelper";
import { redirect } from "next/navigation";
import { FC, ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  const isUserLoggedIn = await getUser();

  if (!isUserLoggedIn) {
    redirect("/login");
  }

  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:ml-60 p-4">{children}</div>
    </div>
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
