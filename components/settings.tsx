"use client";

import { logout } from "@/utils/supabase/userHelper";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <div>
      <button
        onClick={async () => logout()}
        className="rounded-lg bg-red-500 text-white text-lg p-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
