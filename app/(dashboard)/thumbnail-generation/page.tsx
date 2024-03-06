import Settings from "@/components/settings";
import ThumbnailGeneration from "@/components/thumbnail-generation";
import { getUser } from "@/utils/supabase/userHelper";
import { Suspense } from "react";

const ThumbnailGenerationPage = async () => {
  return (
    <Suspense>
      <ThumbnailGeneration />
    </Suspense>
  );
};

export default ThumbnailGenerationPage;
