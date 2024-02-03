import { Dashboard } from "@/components/dashboard";
import { FC, Suspense } from "react";

const DashboardPage: FC = async () => (
  <Suspense>
    <Dashboard />
  </Suspense>
);

export default DashboardPage;
