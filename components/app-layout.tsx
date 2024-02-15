"use client";

import Loading from "@/app/(dashboard)/loading";
import { FC, ReactNode, Suspense } from "react";
import Nav from "./nav";
import { useApp } from "@/utils/context/app.context";
import cn from "classnames";

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  const { showNavbar } = useApp();

  return (
    <div>
      <Nav />
      <Suspense fallback={<Loading />}>
        <div className={cn("min-h-screen md:ml-80 flex flex-col", {})}>
          <div
            className={cn("p-4 mt-12 md:mt-0", {
              "blur-md pointer-events-none": showNavbar,
            })}
          >
            {children}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default AppLayout;
