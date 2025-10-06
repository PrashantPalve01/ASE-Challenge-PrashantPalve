import clsx from "clsx";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-700/30",
        className
      )}
    />
  );
}


