import Settings from "@/components/settings";
import { getUser } from "@/utils/supabase/userHelper";
import { Suspense } from "react";

const SettingsPage = async () => {
  // TODO add global context
  const user = await getUser();

  if (!user) {
    throw new Error("Unable to find user.");
  }

  // const theme = localStorage.getItem("data-theme") || "light";

  return (
    <Suspense>
      <Settings user={user} />
    </Suspense>
  );
};

export default SettingsPage;
