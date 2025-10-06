import { ReactNode } from "react";
import clsx from "clsx";

export function Table({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-xl border bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-slate-100/80">
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={clsx(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sticky top-0 bg-slate-100/80 backdrop-blur z-10",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-slate-200 odd:bg-white even:bg-slate-50/50">
      {children}
    </tbody>
  );
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-slate-100/60">{children}</tr>;
}

export function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={clsx("px-4 py-3 text-sm align-middle", className)}>
      {children}
    </td>
  );
}
