"use client";

import { updateProfileAvatar } from "@/app/actions";
import { Themes } from "@/app/entities/settings/themes.types";
import { logout } from "@/utils/supabase/userHelper";
import { FC, ReactNode, useEffect, useState, useContext } from "react";
import { User } from "@supabase/gotrue-js/src/lib/types";
import { createClient } from "@/utils/supabase/client";
import { AppContext, useApp } from "@/utils/context/app.context";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading-spinner";
import { Upload } from "lucide-react";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  user: User;
}

const Settings: FC<Props> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme, updateTheme, setAvatar } = useApp();
  const toggleTheme = (inputTheme: string) => {
    updateTheme(theme === inputTheme ? "light" : inputTheme);
  };

  useEffect(() => {
    if (!theme) return;
    document.querySelector("html")?.setAttribute("data-theme", theme);
    updateTheme(theme);
  }, [theme]);

  return (
    <div
      className={cn(
        "flex flex-col md:my-4 md:gap-16 gap-8 lg:mx-16 animate-in",
        {
          "opacity-25 pointer-events-none": isLoading,
        }
      )}
    >
      {isLoading && <LoadingSpinner />}
      <div className="text-4xl">Account Settings</div>
      <div className="flex flex-col gap-8">
        <SettingsSection
          content={{
            title: "Update profile picture",
            description: "Add or update a new profile photo.",
            buttonText: "",
          }}
          buttonType="toggle"
          clickHandler={() => {}}
          alternativeButton={
            <label className="flex flex-row lg:max-w-[200px]">
              <span className="btn btn-info rounded-r-none">
                <Upload width={20} />
              </span>

              <input
                type="file"
                className="file-input flex-grow file-input-bordered [&.file-input:focus]:outline-none [&::file-selector-button]:hidden p-3 rounded-l-none"
                onChange={async (e) => {
                  try {
                    setIsLoading(true);
                    const files = e.target.files;
                    if (!files) {
                      throw new Error("Invalid image selection.");
                    }
                    const fileExt = files[0].name.split(".").pop();
                    const filePath = `${user.id}-${Math.random()}.${fileExt}`;
                    const client = createClient();

                    await client.storage
                      .from("avatars")
                      .upload(filePath, files[0]);
                    const { data, error } = await updateProfileAvatar(
                      user.id,
                      filePath
                    );

                    setAvatar(filePath);
                    toast(`Successfully updated avatar.`, {
                      type: "success",
                    });
                  } catch (error) {
                    console.log("error123", error);
                    toast(`Error uploading avatar. Please try again.`, {
                      type: "error",
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />
            </label>
          }
        />
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
          clickHandler={async () => await logout()}
        />
        <SettingsSection
          content={{
            title: "Toggle Theme",
            description: "Toggle between Light and Dark themes.",

            buttonText: "",
          }}
          buttonType="toggle"
          alternativeButton={
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="dark"
                defaultChecked={theme === "dark"}
                className="toggle"
                onClick={(e) =>
                  toggleTheme((e.target as any).checked ? "dark" : "light")
                }
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          }
          clickHandler={async () => {}}
        />
        <SettingsSection
          content={{
            title: "Additional Themes",
            description:
              "Select from a range of additional themes. Please note, the 'Toggle Theme' button will not factor in the newly selected theme.",
            buttonText: "",
          }}
          buttonType="toggle"
          alternativeButton={
            <details className="dropdown">
              <summary className="w-full btn btn-info min-w-[200px]">
                Select theme
              </summary>
              <ul className="shadow dropdown-content z-[1] cursor-pointer w-full">
                {Themes.map((theme) => (
                  <li
                    key={theme}
                    value={theme}
                    data-theme={theme}
                    className="first-letter:capitalize px-6 py-3 shadow-lg"
                    onClick={() => toggleTheme(theme)}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </details>
          }
          clickHandler={async () => logout()}
        />
        <SettingsSection
          content={{
            title: "Cancel subscription",
            description:
              "To cancel your subscription, just click the button to the right. Don't worry, we won't hassle you to stay, and your subscription will remain active until the final billing period of X date",
            buttonText: "Cancel subscription",
          }}
          buttonType="error"
          clickHandler={async () => {}}
        />
        <SettingsSection
          content={{
            title: "Delete account",
            description:
              "Permanently remove your ViewTube account. This action is not reversible, so please continue with caution.",
            buttonText: "Delete account",
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
  buttonType: "error" | "success" | "warning" | "info" | "toggle";
  alternativeButton?: JSX.Element;
  clickHandler: any;
  children?: ReactNode;
}

const SettingsSection: FC<SettingsScreenProps> = ({
  content,
  clickHandler,
  buttonType,
  children,
  alternativeButton,
}) => {
  const buttonColour = ButtonColour[buttonType];

  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:gap-24 lg:flex-row justify-between border rounded-lg border-stone-700 p-4 lg:items-center",
        {
          "border-error": buttonType === "error",
        }
      )}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-xl">{content.title}</h3>
        <p className="">{content.description}</p>
      </div>
      <div>
        {/* <button
        className={`rounded-lg min-w-[200px] border-t ${ButtonColour[buttonType]} text-white text-lg p-4 w-full`}
        onClick={clickHandler}
      >
        {content.buttonText}
      </button> */}
        {alternativeButton ? (
          alternativeButton
        ) : (
          <button
            onClick={clickHandler}
            className={`w-full btn min-w-[200px] ${buttonColour}`}
          >
            {content.buttonText}
          </button>
        )}
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
