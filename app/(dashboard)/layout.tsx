import { Nav } from "@/components/nav";
import { getUser } from "@/utils/supabase/userHelper";
import { redirect } from "next/navigation";
import { FC, ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Nav user={user}>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:ml-80 flex flex-col">
        <div className="sm:hidden flex">{/* <Heading /> */}</div>
        <div className="p-4">{children}</div>
      </div>
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
