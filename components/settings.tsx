"use client";

import { logout } from "@/utils/supabase/userHelper";
import { FC, ReactNode } from "react";
import cn from "classnames";

const Settings: FC = () => {
  return (
    <div className="flex flex-col md:my-4 md:gap-16 gap-8 lg:mx-16 animate-in">
      <div className="text-4xl">Account Settings</div>
      <div className="flex flex-col gap-8">
        <SettingsSection
          content={{
            title: "Other",
            description: "More content",
            buttonText: "Test",
          }}
          buttonType="success"
          clickHandler={() => {}}
        >
          <div>More content</div>
        </SettingsSection>
        <SettingsSection
          content={{
            title: "Change password",
            description: "More content",
            buttonText: "Change password",
          }}
          buttonType="warning"
          clickHandler={() => {}}
        >
          <div>More content</div>
        </SettingsSection>
        <SettingsSection
          content={{
            title: "Logout",
            description: "Some content",
            buttonText: "Logout",
          }}
          buttonType="warning"
          clickHandler={async () => logout()}
        />
        <SettingsSection
          content={{
            title: "Delete account",
            description:
              "Permanently remove your ViewTube account. This action is not reversible, so please continue with caution.",
            buttonText: "Permanently delete account",
          }}
          buttonType="error"
          clickHandler={async () => {}}
        />
      </div>
    </div>
  );
};

interface SettingsScreenProps {
  content: {
    title: string;
    description: string;
    buttonText: string;
  };
  buttonType: "error" | "success" | "warning" | "info";
  clickHandler: () => void;
  children?: ReactNode;
}

const SettingsSection: FC<SettingsScreenProps> = ({
  content,
  clickHandler,
  buttonType,
  children,
}) => {
  const buttonColour = ButtonColour[buttonType];

  return (
    <div className="flex flex-col gap-4 lg:flex-row justify-between border rounded-lg border-stone-700 p-4 lg:items-center">
      <div className="flex flex-col gap-4]">
        <h3 className="text-xl">{content.title}</h3>
        <p className="text-stone-400">{content.description}</p>
      </div>
      <div>
        {/* <button
        className={`rounded-lg min-w-[200px] border-t ${ButtonColour[buttonType]} text-white text-lg p-4 w-full`}
        onClick={clickHandler}
      >
        {content.buttonText}
      </button> */}
        <button onClick={clickHandler} className={`w-full btn ${buttonColour}`}>
          {content.buttonText}
        </button>
      </div>
    </div>
  );
};

const ButtonColour: Record<string, string> = {
  error: "btn-error",
  success: "btn-success",
  warning: "btn-warning",
  info: "btn-info",
};

export default Settings;
