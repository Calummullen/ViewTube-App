import LoadingSpinner from "@/components/loading-spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-lg h-full"></span>
    </div>
  );
}
