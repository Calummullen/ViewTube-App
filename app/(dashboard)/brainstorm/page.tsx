import Brainstorm from "@/components/brainstorm";
import { FC, Suspense } from "react";

const BrainstormPage: FC = () => {
  return (
    <Suspense>
      <Brainstorm />
    </Suspense>
  );
};

export default BrainstormPage;
