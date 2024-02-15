"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Menu,
  Settings,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  useState,
  useContext,
  useRef,
} from "react";
import { User } from "@supabase/supabase-js";
import { logout } from "@/utils/supabase/userHelper";
import Avatar from "./avatar";
import { createClient } from "@/utils/supabase/client";
import { updateProfileAvatar } from "@/app/actions";
import { AppContext, useApp } from "@/utils/context/app.context";
import { useOutsideAlerter } from "@/utils/hooks/useOutsideAlerter";

const externalLinks = [
  {
    name: "Deploy your own",
    href: "https://vercel.com/templates/next.js/platforms-starter-kit",
    icon: (
      <svg
        width={18}
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="py-1 text-black dark:text-white"
      >
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
      </svg>
    ),
  },
];

export const Nav: FC = () => {
  const segments = useSelectedLayoutSegments();
  const { avatar, user, showNavbar, setShowNavbar } = useApp();

  const { id } = useParams() as { id?: string };
  const [siteId, setSiteId] = useState<string | null>();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const tabs = useMemo(() => {
    return [
      {
        name: "Dashboard",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Brainstorm",
        href: "/brainstorm",
        isActive: segments[0] === "brainstorm",
        icon: <Lightbulb width={18} />,
      },
      {
        name: "Trending",
        href: "/trending",
        isActive: segments[0] === "trending",
        icon: <TrendingUp width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowNavbar(false);
  }, [pathname]);

  return (
    <>
      <div className="w-full bg-base-300 fixed flex flex-row justify-end items-end">
        <button
          className={`md:hidden m-4`}
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <Menu width={20} />
        </button>
      </div>
      <div
        className={`transform bg-base-100 ${
          showNavbar ? "w-[75%] translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r transition-all  md:w-80 md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* <Heading /> */}
          <div className="flex flex-row m-2 pb-4 gap-4 items-center border-b-2">
            <Avatar uid={user.id} size={50} />
            <div>
              <p className="font-bold text-lg p-4 break-all text-center">{`${user.user_metadata.firstName} ${user.user_metadata.surname}`}</p>
            </div>
          </div>

          {tabs.map(({ name, href, isActive, icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-4 py-4 px-6 ${
                isActive ? "bg-base-300" : ""
              } last:mt-auto transition-all duration-150 ease-in-out`}
            >
              {/*               } last:mt-auto transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:hover:bg-stone-700 dark:active:bg-stone-800`} */}
              {icon}
              <span className="text-lg font-medium">{name}</span>
            </Link>
          ))}
        </div>
        {/* <div className="m-2">
          <button
            onClick={async () => logout()}
            className="rounded-md bg-red-500 text-white text-lg p-4 w-full"
          >
            Logout
          </button>
        </div> */}
        {/* <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          {children}
        </div> */}
      </div>
    </>
  );
};

export default Nav;
