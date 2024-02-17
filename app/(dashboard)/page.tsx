import { Dashboard } from "@/components/dashboard";
import { FC, Suspense } from "react";

const DashboardPage: FC = async () => {
  return (
    <Suspense>
      {/* <div className="sm:hidden flex">
      <Heading />
    </div> */}
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
