import UpdatePassword from "@/components/update-password";
import { FC, Suspense } from "react";

const UpdatePasswordPage: FC = () => {
  return (
    <Suspense>
      <UpdatePassword />
    </Suspense>
  );
};

export default UpdatePasswordPage;
