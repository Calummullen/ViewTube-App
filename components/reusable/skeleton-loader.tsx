import { FC } from "react";

interface Props {
  rowCount: number;
}

const SkeletonLoader: FC<Props> = ({ rowCount }) => {
  const rows = () => {
    const totalRows = [];
    for (let x = 1; x < rowCount; x++) {
      totalRows.push(
        <div className="flex flex-row gap-4">
          <div className="skeleton h-10 w-2/3" />
          <div className="skeleton h-10 w-1/3" />
        </div>
      );
    }
    return <div className="flex flex-col gap-4">{totalRows}</div>;
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="skeleton h-12 w-2/3" />
        <div className="skeleton h-12 w-1/3" />
      </div>
      {<div>{rows()}</div>}
    </div>
  );
};

export default SkeletonLoader;
