import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { redirect } from "next/navigation";
import { getUser } from "./utils/supabase/userHelper";

// const getValidSubdomain = (host?: string | null) => {
//   let subdomain: string | null = null;
//   if (!host && typeof window !== "undefined") {
//     // On client side, get the host from window
//     host = window.location.host;
//   }
//   if (host && host.includes(".")) {
//     const candidate = host.split(".")[0];
//     if (candidate && !candidate.includes("localhost")) {
//       // Valid candidate
//       subdomain = candidate;
//     }
//   }
//   return subdomain;
// };

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // const isUserLoggedIn = await getUser();
  // const url = req.nextUrl.clone();
  // if (isUserLoggedIn && (url.pathname === "/" || url.pathname === "/login")) {
  //   url.pathname = "/dashboard";
  // } else if (!isUserLoggedIn && url.pathname === "/") {
  //   url.pathname = "/login";
  // }
  // return NextResponse.redirect(url);
  // // Clone the URL
  // const url = req.nextUrl.clone();
  // // Skip public files
  // if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;
  // const host = req.headers.get("host");
  // const subdomain = getValidSubdomain(host);
  // console.log("subdomain", subdomain, host);
  // if (subdomain) {
  //   // Subdomain available, rewriting
  //   console.log(
  //     `>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`
  //   );
  //   url.pathname = `/${subdomain}${url.pathname}`;
  // }
  // // if (!isUserLoggedIn) {
  // //   redirect("/login");
  // // }
  // return NextResponse.rewrite(url);
  // try {
  //   // This `try/catch` block is only here for the interactive tutorial.
  //   // Feel free to remove once you have Supabase connected.
  //   const { supabase, response } = createClient(req);
  //   // Refresh session if expired - required for Server Components
  //   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  //   await supabase.auth.getSession();
  //   return response;
  // } catch (e) {
  //   // If you are here, a Supabase client could not be created!
  //   // This is likely because you have not set up environment variables.
  //   // Check out http://localhost:3001 for Next Steps.
  //   return NextResponse.next({
  //     request: {
  //       headers: req.headers,
  //     },
  //   });
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
